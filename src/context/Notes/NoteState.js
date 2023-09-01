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
      "auth-token":"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjRjZjhiMTZlYzM1MzE0MTAxZWQ0ZmQ0In0sImlhdCI6MTY5MTMyMzIxMn0.JBJBXYNltLny0QjFyhWAxqHsrX7n697M69Cot5SLdv8",
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
      "auth-token":"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjRjZjhiMTZlYzM1MzE0MTAxZWQ0ZmQ0In0sImlhdCI6MTY5MTMyMzIxMn0.JBJBXYNltLny0QjFyhWAxqHsrX7n697M69Cot5SLdv8",
      "Content-Type":"application/json"
    },
    body: JSON.stringify({title,description,tag})
  })
// -----------------
  const note={
    "_id": "64e0646255f600ed6c4937e0",
    "user": "64cf8b16ec35314101ed4fd4",
    "title": title,
    "description": description,
    "tag": tag,
    "date": "2023-08-19T06:42:42.239Z",
    "__v": 0
  }
  setNotes(notes.concat(note));
}
//Delete a note
const deletenote=async (id)=>{
  //API CALL
  const response= await fetch(`${host}/api/notes/deletenote/${id}`,{
    method:'DELETE',
    headers:{
      "auth-token":"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjRjZjhiMTZlYzM1MzE0MTAxZWQ0ZmQ0In0sImlhdCI6MTY5MTMyMzIxMn0.JBJBXYNltLny0QjFyhWAxqHsrX7n697M69Cot5SLdv8",
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
      "auth-token":"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjRjZjhiMTZlYzM1MzE0MTAxZWQ0ZmQ0In0sImlhdCI6MTY5MTMyMzIxMn0.JBJBXYNltLny0QjFyhWAxqHsrX7n697M69Cot5SLdv8",
      "Content-Type":"application/json"
    },
    body: JSON.stringify({title,description,tag})
  })
  // const json=response.json();

  //logic to edit in client side
  for (let i=0;i<notes.length;i++){
   const element=notes[i];
   if(element._id===id){
    element.title=title;
    element.description=description;
    element.tag=tag;
   } 
  }
}

  return (
    <NoteContext.Provider value={{notes,addnote,deletenote,editnote,getnote}}>{props.children}</NoteContext.Provider>//{{state,update}} can also be writtern as {{state:state,update:update}}
  );
};

export default NoteState;
