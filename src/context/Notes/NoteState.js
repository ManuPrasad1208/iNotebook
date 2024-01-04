import NoteContext from "./NoteContext";

import React,{ useState } from "react";
const NoteState = (props) => {
  const host="http://localhost:5000";
  const initialnotes=[];
const [notes,setNotes]=useState(initialnotes);//initialnotes


//get all notes
const getnote= async ()=>{
  //api call
  const response= await fetch(`${host}/api/notes/fetchallnotes`,{
    method:'GET',
    headers:{
      "auth-token":localStorage.getItem('token'),
      "Content-Type":"application/json"
    }
  })
  const json=await response.json();
  console.log(json)
  setNotes(json);
}


//Add a note
const addnote=async (title,description,tag)=>{
  //api call
  const response= await fetch(`${host}/api/notes/addnotes`,{
    method:'POST',
    headers:{
      "auth-token":localStorage.getItem('token'),
      "Content-Type":"application/json"
    },
    body: JSON.stringify({title,description,tag})
  })
// -----------------
  const note=await response.json();
  setNotes(notes.concat(note));
}
//Delete a note
const deletenote=async (id)=>{
  //API CALL
  const response= await fetch(`${host}/api/notes/deletenote/${id}`,{
    method:'DELETE',
    headers:{
      "auth-token":localStorage.getItem('token'),
      "Content-Type":"application/json"
    }
  })
  const json=await response.json();
  console.log(json)


// -------------------------------  
  console.log("Deleting node with id: "+id);
  const newNote=notes.filter((note)=>{
    return note._id!==id
  })
  setNotes(newNote);
}
//Edit a note
const editnote= async(id,title,description,tag)=>{
  // API call
  const response= await fetch(`${host}/api/notes/updatenote/${id}`,{
    method:'PUT',
    headers:{
      "auth-token":localStorage.getItem('token'),
      "Content-Type":"application/json"
    },
    body: JSON.stringify({title,description,tag})
  })
  // const json=response.json();

  //logic to edit in client side
  getnote();
  // for (let i=0;i<notes.length;i++){
  //  const element=notes[i];
  //  if(element._id===id){
  //   element.title=title;
  //   element.description=description;
  //   element.tag=tag;
  //  } 
  // }
}

  return (
    <NoteContext.Provider value={{notes,addnote,deletenote,editnote,getnote}}>{props.children}</NoteContext.Provider>//{{state,update}} can also be writtern as {{state:state,update:update}}
  );
};

export default NoteState;
