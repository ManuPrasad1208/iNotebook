import React , {useContext,useEffect} from 'react'

import noteContext from '../context/Notes/NoteContext'

const About=()=>{
    const a=useContext(noteContext);
    useEffect(()=>{
        a.update();
        // eslint-disable-next-line
    },[])
    return (
    <div>
      This is about {a.state.name} and his class is {a.state.class}
    </div>
  )
}

export default About
