//installed concurrently to start server of backend and frontend simultaneosly
//to make it work after installing.....under package.json of frontend under scripts....write-->
//"both":"concurrently \"npm run start\" \"nodemon backend/index.js\""

//if we want to add double quotes under double quotes we use backslash before every quote inside

import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./components/Home";
import About from "./components/About";
import NoteState from "./context/Notes/NoteState";

const App = () => {
  return (
    <div className="App">
      <NoteState>
        <BrowserRouter>
          <Navbar />
          <Routes>
            <Route exact path="/" element={<Home />} />
            <Route exact path="/about" element={<About />} />
          </Routes>
        </BrowserRouter>
      </NoteState>
    </div>
  );
};

export default App;
