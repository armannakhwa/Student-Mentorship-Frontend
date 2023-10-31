import './App.css';
import { auth, provider } from './config';
import { signInWithPopup } from "firebase/auth";
import { useState, useEffect } from 'react';
import Todo from './todo';



function App() {
  
  const [email, setEmail] = useState(localStorage.getItem('email'));
  
  const [expirationTime, setExpirationTime] = useState(localStorage.getItem('expirationTime'));

  const login = async () => {
    try {
      const { user } = await signInWithPopup(auth, provider);


      console.log(user);
      localStorage.setItem('email', user.email);
      setEmail(user.email);

      // Check if the user is logged in
      if (user) {
        // Get the ID token for the user
        const idToken = await user.getIdToken();
 

        // Set the expiration time to 24 hours from the current time
        const expirationTime = new Date().getTime() + 24 * 60 * 60 * 1000; // 24 hours in milliseconds

        // Store the ID token and expiration time in localStorage or a state management solution
        localStorage.setItem('token', idToken);
        localStorage.setItem('expirationTime', expirationTime);
        setExpirationTime(expirationTime);
      }
    } catch (error) {
      // Handle login error
      console.error(error);
    }
  };


  useEffect(() => {
    const currentTime = new Date().getTime();
    if (expirationTime && currentTime > expirationTime) {
      // Token has expired, clear localStorage and set expirationTime to null
      localStorage.removeItem('token');
      localStorage.removeItem('expirationTime');
      setExpirationTime(null);
    }
  }, [expirationTime]);

  useEffect(() => {
     // eslint-disable-next-line react-hooks/exhaustive-deps
    const currentTime = new Date().getTime();
    if (localStorage.getItem('expirationTime') && currentTime < expirationTime) 
    {
         // Set the expiration time to 24 hours from the current time
         const expirationTime = new Date().getTime() + 24 * 60 * 60 * 1000; // 24 hours in milliseconds
      
         localStorage.setItem('expirationTime', expirationTime);
         setExpirationTime(expirationTime);
    }
     // eslint-disable-next-line react-hooks/exhaustive-deps
  },[]);

  return (
    <>
      {expirationTime ? (
        <Todo email={email} />
      ) : (
        <div className="container">
            <h1 className='text-center'>Student Mentorship App Teacher LOGIN</h1>
          <div className="d-flex justify-content-center align-items-center vh-100">
            <button type="button" className="login-with-google-btn" onClick={login}>Sign in with Google</button>
          </div>
        </div>
      )}
    </>
  );
}

export default App;
