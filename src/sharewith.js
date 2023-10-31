import React, { useState } from 'react';
import axios from 'axios';
import { BsShare  } from 'react-icons/bs';

export default function Sharewith(props) {
  const [email, setEmail] = useState('');

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const res = await axios.put(
      `http://localhost:4000/todo/update/${props.id}/sharewith/${email}`
    );
    console.log(res);
      <div >{email}</div>
      alert('Form is shared with '+email);
      window.location.reload();
    setEmail('');
  };

  const modalId = `exampleModal${props.key}`;

  return (
    <>
      <button
        type="button"
        className="btn btn-primary"
        data-toggle="modal"
        data-target={`#${modalId}`}
      >
              <BsShare />

      </button>

      <div
        className="modal fade"
        id={modalId}
        tabIndex="-1"
        role="dialog"
        aria-labelledby="exampleModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog" role="document">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="exampleModalLabel">
                Share
              </h5>
              <button
                type="button"
                className="close"
                data-dismiss="modal"
                aria-label="Close"
              >
                <span aria-hidden="true">&times;</span>
              </button>
            </div>
            <div className="modal-body">
              <form onSubmit={handleSubmit}>
                <div className="form-group">
                  <label htmlFor="emailInput">Email</label>
                  <input
                    type="email"
                    className="form-control"
                    id="emailInput"
                    value={email}
                    onChange={handleEmailChange}
                    placeholder="Enter email"
                    required
                  />
                </div>
     <br></br>
                <button type="submit" className="btn btn-primary">
                  Share
                </button>
              </form>
<b>Shared</b>
                {props.Sharewith}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
