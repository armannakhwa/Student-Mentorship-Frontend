import React, { useState,useEffect } from 'react';
import axios from 'axios';
import { BsPencil } from 'react-icons/bs';

export default function UpdateTodo(props) {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');


  useEffect(() => {
    setTitle(props.title);
    setContent(props.content);
  }, [props.title, props.content]);


  const handleTitleChange = (e) => {
    setTitle(e.target.value);
  };

  const handleContentChange = (e) => {
    setContent(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const updatedItem = {
      title: title,
      content: content,
    };

    const res = await axios.put(
      `http://localhost:4000/todo/update/${props.id}`,
      updatedItem
    );
    console.log(res);
    alert('Form is updated');
    window.location.reload();
    setTitle('');
    setContent('');
  };

  const modalId = `exampleModal${props.id}`;

  return (
    <>
      <button
        type="button"
        className="btn btn-primary"
        data-toggle="modal"
        data-target={`#${modalId}`}
      >
        <BsPencil />
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
                Update
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
                  <label htmlFor="titleInput">Reg.no</label>
                  <input
                    type="text"
                    className="form-control"
                    id="titleInput"
                    value={title}
                    onChange={handleTitleChange}
                    placeholder="Enter Reg.no"
                    required
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="contentInput">Mentorship Details</label>
                  <input
                    type="text"
                    className="form-control"
                    id="contentInput"
                    value={content}
                    onChange={handleContentChange}
                    placeholder="Enter Content"
                    required
                  />
                </div>

                <button type="submit" className="btn btn-primary">
                  Update
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
