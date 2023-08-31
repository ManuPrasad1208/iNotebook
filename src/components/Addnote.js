import React,{useContext,useState} from 'react'
import noteContext from "../context/Notes/NoteContext"

const Addnote = () => {
    const context =useContext(noteContext);
    const {addnote}=context;//destructuring

    const [note,setNote]=useState({title:"",description:"",tag:""});

    const onChange=(e)=>{
        //jo bhi values is note ke andar hain rahen,,but change karne pe change hote rahen
        //...note is a spread operator
        setNote({...note,[e.target.name]:e.target.value})
    }
    const handleClick=(e)=>{
        e.preventDefault();
        addnote(note.title,note.description,note.tag);
    }
  return (
    <div>
      <h2 className='my-3'>Add a Note</h2>
            <form className='my-3'>
                <div className="mb-3 my-3">
                    <label htmlFor="title" className="form-label">Title</label>
                    <input type="text" className="form-control" id="title" name="title" aria-describedby="emailHelp" onChange={onChange}/>
                </div>
                <div className="mb-3">
                    <label htmlFor="description" className="form-label">Description</label>
                    <input type="text" className="form-control" id="description" name="description" onChange={onChange}/>
                </div>
                <div className="mb-3 my-3">
                    <label htmlFor="tag" className="form-label">Tag</label>
                    <input type="text" className="form-control" id="tag" name="tag" onChange={onChange}/>
                </div>
                <button type="submit" className="btn btn-primary" onClick={handleClick}>Add Note</button>
            </form>
    </div>
  )
}

export default Addnote
