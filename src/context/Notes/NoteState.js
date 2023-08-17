import NoteContext from "./NoteContext";

import React,{ useState } from "react";
const NoteState = (props) => {
    
  const s1 = {
    name: "Harry",
    class: "5B",
  };
  const [state,setState]=useState(s1);
    const update=()=>{
        setTimeout(()=>{
            setState({
                name:"Larry",
                class:"10B"
            })
        },5000)
    }

  return (
    <NoteContext.Provider value={{state,update}}>{props.children}</NoteContext.Provider>//{{state,update}} can also be writtern as {{state:state,update:update}}
  );
};

export default NoteState;
