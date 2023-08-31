
import React,{useContext, useEffect} from 'react'
import noteContext from "../context/Notes/NoteContext"
import Noteitem from './Noteitem';
import Addnote from './Addnote';

const Notes = () => {
    const context =useContext(noteContext);
    const {notes,getnote}=context;//destructuring
    useEffect(()=>{
      getnote();
    },[])

  return (
    <>
    <Addnote/>
    <div className='container my-3'>
        <h2 className='my-3'>Your Notes</h2>
        <div className="row">
        {notes.map((note)=>{
                return <Noteitem key={note._id}note={note}/>;
            })}
        </div>
    </div>
    </>
  )
}

export default Notes;
