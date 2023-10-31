import React from 'react'
import {useState, useEffect} from 'react';
import axios from 'axios';
import Sharewith from './sharewith';
import UpdateTodo from './updateTodo';
import DataTable from 'react-data-table-component';
import { BsSearch,BsTrash } from 'react-icons/bs';




export default function Todo(props) {

    const [title, settitle] = useState('');
    const [content, setcontent] = useState('');

    const [listItems, setListItems] = useState([]);
    const [mobile, setMobile] = useState([]);
    const [name, setName] = useState([]);


  //add new todo item to database
  const addItem = async (e) => {
    e.preventDefault();
    try{
      const res = await axios.post('http://localhost:4000/todo/create', {email:props.email,title,content,mark:"false",name,mobile})
      setListItems(prev => [...prev, res.data]);
      settitle('');
      setcontent('');
      console.log(listItems)

    }catch(err){
      console.log(err);
    }
  }


  const handleDelete = async (id) => {
    try{
      const res = await axios.delete('http://localhost:4000/todo/delete/'+id)
      console.log(res)
      const newListItems = listItems.filter(item=> item._id !== id);
      console.log("__newListItems")
      console.log(newListItems)
      setListItems(newListItems);
    }catch(err){
      console.log(err);
    }
  };

  const handleToggleDone = async (itemId) => {
    const updatedListItems = listItems.map((item) => {
      if (item._id === itemId) {
        return {
          ...item,
          mark: !item.mark,
        };
      }
      return item;
    });
  
    setListItems(updatedListItems); // Update the state with the updated array
  
    const updatedItem = updatedListItems.find((item) => item._id === itemId);
    const res = await axios.put('http://localhost:4000/todo/update/' + itemId, updatedItem);
    console.log(res);
  };
  
  
      //Create function to fetch all todo items from database -- we will use useEffect hook
  useEffect(()=>{
    const getItemsList = async () => {
      try{
        const res = await axios.get('http://localhost:4000/todo/alldata/'+localStorage.getItem('email'))
        setListItems(res.data);
        console.log(res.data)
      }catch(err){
        console.log(err);
      }
    }
    getItemsList()
  },[]);

  const logout=()=>{
    localStorage.removeItem('token');
    localStorage.removeItem('expirationTime');
window.location.reload();
  }


  return (
    <>

    <div className="navbar navbar-expand-lg navbar-light bg-light">
      
  <a className="navbar-brand" href='/'><b>Student Mentorship app</b></a>
  <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
    <span className="navbar-toggler-icon"></span>
  </button>

  <div className="collapse navbar-collapse" id="navbarSupportedContent">
    <ul className="navbar-nav mr-auto">
      <li className="nav-item">
        <a className="nav-link" href='/'><b>Welcome,</b>{localStorage.getItem('email')}</a>
      </li>

    </ul>
    <form className="form-inline my-2 my-lg-0">
    <span className="btn btn-danger" onClick={logout}>logout</span>
    </form>
  </div>
</div>
  <br></br>
<section>
  <div className="container h-100">
    <div className="row d-flex justify-content-center align-items-center h-100">
      <div className="col col-lg-9 col-xl-7">
        <div className="card rounded-3">
          <div className="card-body p-4">
            <form className="row row-cols-lg-auto g-3 justify-content-center align-items-center mb-4 pb-2" onSubmit={addItem}>
              <div className="col-12">
                <div className="form-outline">
                <label className="form-label" for="form1">Student Registration No</label>
                  <input type="text"  className="form-control"   onChange={e => settitle(e.target.value)}
                value={title} required/>
                <label className="form-label" for="form1">Student Name</label>
                  <input type="text"  className="form-control"   onChange={e => setName(e.target.value)}
                value={name} required/>
                <label className="form-label" for="form1">Student Mobile</label>
                  <input type="text"  className="form-control"   onChange={e => setMobile(e.target.value)}
                value={mobile} required/>

                  <label className="form-label" for="form1">Mentorship Details</label>
                  <textarea type="text"  className="form-control"   onChange={e => setcontent(e.target.value)}
                value={content} required/>
                </div>
              </div>

              <div className="col-12">
                <button type="submit" className="btn btn-primary">ADD STUDENT</button>
              </div>

            </form>

            <div className="tableContainer">
  <DataTable
    title="Student Details"
    data={listItems}
    columns={[
      {
        name: 'Sr No.',
        selector: (_, index) => index + 1,
        sortable: true,
      },
      {
        name: 'Name',
        selector: 'name',
        sortable: true,
        width:400
      },
      {
        name: 'Registration No',
        selector: 'title',
        sortable: true,
        width:"200px"
      },
      {
        name: 'Mentorship Details',
        selector: 'content',
        sortable: true,
        width:"300px"
      },
      {
        name: 'Mobile No',
        selector: 'mobile',
        sortable: true,
        width:"200px"

      },
      {
        name: 'Status',
        cell: (row) => (
          <input
            type="checkbox"
            checked={JSON.parse(row.mark)}
            onChange={() => handleToggleDone(row._id)}
          />
        ),
      },
      {
        name: 'Actions',
        cell: (row) => (
          <>
      
<UpdateTodo key={row._id+row.title} id={row._id} title={row.title} content={row.content} />

          <button
          type="button"
          className="btn btn-danger  ml-2"
          onClick={() => handleDelete(row._id)}
        >
          <BsTrash />
        </button>
</>
        
        ),
      },
      {
        name: 'Sharewith',
        cell: (row) => {
          if (row.email) {
            const shareWithEmails = Array.isArray(row.shareWith)
              ? row.shareWith
              : [row.shareWith];

            const shareWithEmailElements = shareWithEmails.map(
              (email, index) => (
                <div
                  key={index}
                  className="alert alert-secondary"
                  role="alert"
                >
                  {email}
                </div>
              )
            );

            return <Sharewith key={row._id} id={row._id} email={row.email} Sharewith={shareWithEmailElements} />;
          }
          return null;
        },
      },
    ]}
    pagination
    highlightOnHover
    responsive
    defaultSortField="title"
    searchable
    searchPlaceholder="Search tasks"
    searchIcon={<BsSearch />}
    noDataComponent={<div>No tasks found.</div>}
  />
</div>

          </div>
        </div>
      </div>
    </div>
  </div>
</section>        
</>
  )
}
