
import React,{useContext} from 'react'
import noteContext from "../context/Notes/NoteContext"
import Noteitem from './Noteitem';

const Notes = () => {
    const context =useContext(noteContext);
    const {notes,setNotes}=context;//destructuring
  return (
    <div className='container my-3'>
        <h2 className='my-3'>Your Notes</h2>
        <div className="row">
        {notes.map((note)=>{
                return <Noteitem note={note}/>;
            })}
        </div>
    </div>
  )
}

export default Notes;
