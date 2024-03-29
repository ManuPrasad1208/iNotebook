import React ,{useContext}from 'react'
import noteContext from "../context/Notes/NoteContext"
const Noteitem = (props) => {

    const {note,updateNote}=props;
    const context =useContext(noteContext);
    const {deletenote}=context;//destructuring

    const trashclick=()=>{
      deletenote(note._id);
      props.showAlert("Note deleted successfully","success")
    }

    return (
    <div className='col-md-3 my-2'>
        <div className="card">
            <div className="card-body">
            <h5 className="card-title">{note.title}</h5>
            <p className="card-text">{note.description}</p>
            <i className="fa-solid fa-trash mx-2" onClick={trashclick}></i>
            <i className="fa-solid fa-pen-to-square mx-2" onClick={()=>{updateNote(note)}}></i>
            </div>
        </div>
    </div>
  )
}

export default Noteitem
