
import React, { useContext, useEffect, useRef, useState } from 'react'
import {useNavigate} from 'react-router-dom';
import noteContext from "../context/Notes/NoteContext"
import Noteitem from './Noteitem';
import Addnote from './Addnote';

const Notes = (props) => {
  let navigate = useNavigate();
  const {showAlert}=props;
  const context = useContext(noteContext);
  const { notes, getnote,editnote } = context;//destructuring
  useEffect(() => {
    if(localStorage.getItem('token')){
      getnote();
    }
    else{
      navigate("/login")
    }
    
    // eslint-disable-next-line
  }, [])

  const [note,setNote]=useState({id:"",etitle:"",edescription:"",etag:""});
  const ref = useRef(null);

    const onChange=(e)=>{
        //jo bhi values is note ke andar hain rahen,,but change karne pe change hote rahen
        //...note is a spread operator
        setNote({...note,[e.target.name]:e.target.value})
    }
    const handleClick=(e)=>{
      editnote(note.id,note.etitle,note.edescription,note.etag)
        e.preventDefault();
        props.showAlert("Note updated succesfully","success")
    }


  const updateNote = (currentnote) => {
    ref.current.click();
    setNote({id:currentnote._id,etitle:currentnote.title,edescription:currentnote.description,etag:currentnote.tag})
  }
  return (
    <>
      <Addnote showAlert={showAlert}/>
      {/* we have to hide this button */}
      <button type="button" ref={ref} className="btn btn-primary d-none" data-bs-toggle="modal" data-bs-target="#exampleModal">
        Launch demo modal
      </button>
      <div className="modal fade" id="exampleModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h1 className="modal-title fs-5" id="exampleModalLabel">Edit Note</h1>
              <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div className="modal-body">
              {/* form  */}
            <form className='my-3'>
                <div className="mb-3 my-3">
                    <label htmlFor="title" className="form-label">Title</label>
                    <input type="text" className="form-control" id="etitle" name="etitle" value={note.etitle} onChange={onChange}/>
                </div>
                <div className="mb-3">
                    <label htmlFor="description" className="form-label">Description</label>
                    <input type="text" className="form-control" id="edescription" name="edescription" value={note.edescription} onChange={onChange}/>
                </div>
                <div className="mb-3 my-3">
                    <label htmlFor="tag" className="form-label">Tag</label>
                    <input type="text" className="form-control" id="etag" name="etag" value={note.etag} onChange={onChange}/>
                </div>
            </form>

            </div>
            <div className="modal-footer">
              <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
              <button type="button" className="btn btn-primary" onClick={handleClick} data-bs-dismiss="modal">Save changes</button>
            </div>
          </div>
        </div>
      </div>

      <div className='container my-3'>
        <h2 className='my-3'>Your Notes</h2>
        <div className="row">
          {notes.map((note) => {
            return <Noteitem key={note._id} updateNote={updateNote} showAlert={showAlert} note={note} />;
          })}
        </div>
      </div>
    </>
  )
}

export default Notes;
