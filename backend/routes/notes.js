const express = require("express");
const router = express.Router();
const Note = require("../models/Note.js");

const fetchuser = require("../middleware/fetchuser.js");

//express validator
const { body, validationResult } = require("express-validator");

//ROUTE 1: get all the notes using GET "/api/notes/fetchallnotes"
router.get("/fetchallnotes", fetchuser, async (req, res) => {
  try {
    const notes = await Note.find({ user: req.user.id });
    res.json(notes);
  } catch (error) {
    console.error(error.message);
    res.status(500).send("internal server error");
  }
});

//ROUTE 2: add a new note using POST "/api/notes/addnotes"
router.post(
  "/addnotes",
  fetchuser,
  [
    body("title", "Enter a valid title").isLength({ min: 3 }),
    body("description", "description must be at least 5 characters").isLength({
      min: 5,
    }),
  ],
  async (req, res) => {
    try {
      const { title, description, tag } = req.body; //destructuring
      //if there are errors return bad request and error
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }
      const note = new Note({ title, description, tag, user: req.user.id });

      const savednote = await note.save();

      res.json(savednote);
    } catch (error) {
      console.error(error.message);
      res.status(500).send("internal server error");
    }
  }
);

//ROUTE 3:update the existing note using :PUT "/api/notes/updatenote".Login required
router.put('/updatenote/:id',fetchuser,async(req,res)=>{
    const {title,description,tag}=req.body;
    //create a new note object
    const newNote={};
    if(title){
        newNote.title=title;
    }
    if(description){
        newNote.description=description;
    }
    if(tag){
        newNote.tag=tag;
    }

    //find note to be updated and update it
    let note=await Note.findById(req.params.id);
    if(!note){
        return res.status(404).send("Not found");
    }
    if(note.user.toString()!==req.user.id){
        return res.status(401).send("Not allowed");
    }

    note = await Note.findByIdAndUpdate(req.params.id,{$set:newNote},{new:true})
    res.json({note});
})

//ROUTE 4: delete the existing note using :DELETE "/api/notes/deletenote".Login required
router.delete('/deletenote/:id',fetchuser,async(req,res)=>{
    //find note to be deleted and update it
    let note=await Note.findById(req.params.id);
    if(!note){
        return res.status(404).send("Not found");
    }
    if(note.user.toString()!==req.user.id){
        return res.status(401).send("Not allowed");
    }

    note = await Note.findByIdAndDelete(req.params.id)
    res.json({"sucess":"Note has been deleted"});
})


module.exports = router;
