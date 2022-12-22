const Note = require("../models/note");

const fetchNotes = async (req, res) => {
  //find the notes
  const allNotes = await Note.find();

  //Respond with the notes
  res.json({ allNotes: allNotes });
};

const fetchNote = async (req, res) => {
  // get the id from the url
  const noteId = req.params.id;

  //find the note using that url
  const note = await Note.findById(noteId);

  //respond with the note
  res.json({ note: note });
};

const createNotes = async (req, res) => {
  //get the sent in data off request body
  const title = req.body.title;
  const body = req.body.body;

  //create a note with it
  const newNote = await Note.create({
    title: title,
    body: body,
  });

  //respond with the new note
  res.json({ note: newNote });
};

const updateNotes = async (req, res) => {
  // get the id from the url
  const noteId = req.params.id;

  //get the data off the req body
  const title = req.body.title;
  const body = req.body.body;

  //find and update the record
  await Note.findByIdAndUpdate(noteId, {
    title: title,
    body: body,
  });

  //find the updated note
  const updateNote = await Note.findById(noteId);

  //respond with it
  res.json({ updateNote: updateNote });
};

const deleteNotes = async (req, res) => {
  // get the id from the url
  const noteId = req.params.id;

  //delete the note
  await Note.findByIdAndDelete(noteId);

  //respond
  res.json({ Success: "record deleted" });
};

module.exports = {
  fetchNotes: fetchNotes,
  fetchNote: fetchNote,
  createNotes: createNotes,
  updateNotes: updateNotes,
  deleteNotes: deleteNotes,
};
