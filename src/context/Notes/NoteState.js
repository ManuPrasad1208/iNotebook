import NoteContext from "./NoteContext";

import React,{ useState } from "react";
const NoteState = (props) => {
  const initialnotes=[
    {
        "_id": "64e0646255f600ed6c4937e0",
        "user": "64cf8b16ec35314101ed4fd4",
        "title": "my notes",
        "description": "this is my first note",
        "tag": "personal",
        "date": "2023-08-19T06:42:42.239Z",
        "__v": 0
    },
    {
        "_id": "64e0646f55f600ed6c4937e2",
        "user": "64cf8b16ec35314101ed4fd4",
        "title": "my notes",
        "description": "this is my second note",
        "tag": "personal",
        "date": "2023-08-19T06:42:55.994Z",
        "__v": 0
    },
    {
      "_id": "64e0646255f600ed6c4937e0",
      "user": "64cf8b16ec35314101ed4fd4",
      "title": "my notes",
      "description": "this is my first note",
      "tag": "personal",
      "date": "2023-08-19T06:42:42.239Z",
      "__v": 0
  },
  {
    "_id": "64e0646255f600ed6c4937e0",
    "user": "64cf8b16ec35314101ed4fd4",
    "title": "my notes",
    "description": "this is my first note",
    "tag": "personal",
    "date": "2023-08-19T06:42:42.239Z",
    "__v": 0
},
{
  "_id": "64e0646255f600ed6c4937e0",
  "user": "64cf8b16ec35314101ed4fd4",
  "title": "my notes",
  "description": "this is my first note",
  "tag": "personal",
  "date": "2023-08-19T06:42:42.239Z",
  "__v": 0
},
{
  "_id": "64e0646255f600ed6c4937e0",
  "user": "64cf8b16ec35314101ed4fd4",
  "title": "my notes",
  "description": "this is my first note",
  "tag": "personal",
  "date": "2023-08-19T06:42:42.239Z",
  "__v": 0
},
{
  "_id": "64e0646255f600ed6c4937e0",
  "user": "64cf8b16ec35314101ed4fd4",
  "title": "my notes",
  "description": "this is my first note",
  "tag": "personal",
  "date": "2023-08-19T06:42:42.239Z",
  "__v": 0
},
{
  "_id": "64e0646255f600ed6c4937e0",
  "user": "64cf8b16ec35314101ed4fd4",
  "title": "my notes",
  "description": "this is my first note",
  "tag": "personal",
  "date": "2023-08-19T06:42:42.239Z",
  "__v": 0
},
{
  "_id": "64e0646255f600ed6c4937e0",
  "user": "64cf8b16ec35314101ed4fd4",
  "title": "my notes",
  "description": "this is my first note",
  "tag": "personal",
  "date": "2023-08-19T06:42:42.239Z",
  "__v": 0
}
]
const [notes,setNotes]=useState(initialnotes);
  return (
    <NoteContext.Provider value={{notes,setNotes}}>{props.children}</NoteContext.Provider>//{{state,update}} can also be writtern as {{state:state,update:update}}
  );
};

export default NoteState;
