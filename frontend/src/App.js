import { useState, useEffect } from "react";
import axios from "axios";

const App = () => {
  //States
  const [notes, setNotes] = useState([]);
  const [createForm, setCreateForm] = useState({
    title: "",
    body: "",
  });
  const [updateForm, setUpdateForm] = useState({
    _id: null,
    title: "",
    body: "",
  });

  //use effect
  useEffect(() => {
    fetchNotes();
  });

  //functions
  const fetchNotes = async () => {
    //fetch the notes
    const res = await axios.get("http://localhost:3001/read");
    //set the state
    setNotes(res.data.allNotes);
  };

  const updateCreateFormField = async (e) => {
    const { name, value } = e.target;
    setCreateForm({
      ...createForm,
      [name]: value,
    });
  };

  const createNote = async (e) => {
    //prevent the page from reloading
    e.preventDefault();

    //create the note
    const res = await axios.post("http://localhost:3001/create", createForm);

    //update the state
    setNotes([...notes, res.data.note]);

    //clear from state
    setCreateForm({
      title: "",
      body: "",
    });
  };

  const handleUpdateFieldChange = async (e) => {
    const { name, value } = e.target;

    setUpdateForm({
      ...updateForm,
      [name]: value,
    });
  };

  const toggleUpdate = async (note) => {
    //set state on update form
    setUpdateForm({
      title: note.title,
      body: note.body,
      _id: note._id,
    });
  };

  const updateNote = async (e) => {
    //prevent the page from reloading
    //e.preventDefault();

    const { title, body } = updateForm;

    //send update request
    const res = axios.put(`http://localhost:3001/update/${updateForm._id}`, {
      title,
      body,
    });
    //update state
    const newNotes = [...notes];
    const noteIndex = notes.findIndex((note) => {
      return note.id === updateForm._id;
    });
    newNotes[noteIndex] = res.data.note;

    setNotes(newNotes);

    //clear update form state
    setUpdateForm({
      _id: null,
      title: "",
      body: "",
    });
  };

  const deleteNote = async (_id) => {
    //delete the note
    await axios.delete(`http://localhost:3001/delete/${_id}`);

    //update the state
    const newNotes = [...notes].filter((note) => {
      return note._id !== _id;
    });

    //set the state
    setNotes(newNotes);
  };

  return (
    <div className="App">
      <div>
        <h2>Display Notes : </h2>
        {notes &&
          notes.map((note) => {
            return (
              // must give a key
              <div key={note._id}>
                <p>Title : {note.title}</p>
                <p>Body : {note.body}</p>
                <button onClick={() => deleteNote(note._id)}>
                  Delete note
                </button>
                <button onClick={() => toggleUpdate(note)}>Update note</button>
                <br />
                <hr />
              </div>
            );
          })}
      </div>

      {!updateForm._id && (
        <div>
          <h2>Create Note</h2>
          <form onSubmit={createNote}>
            <input
              type="text"
              name="title"
              placeholder="Enter the title..."
              value={createForm.title}
              onChange={updateCreateFormField}
            />
            <br />
            <br />
            <textarea
              cols="30"
              rows="5"
              name="body"
              placeholder="Enter the body..."
              value={createForm.body}
              onChange={updateCreateFormField}
            ></textarea>
            <br />
            <br />
            <button type="submit">Create Note</button>
          </form>
        </div>
      )}

      {updateForm._id && (
        <div>
          <h2>Update Note</h2>
          <form onSubmit={updateNote}>
            <input
              type="text"
              name="title"
              placeholder="Enter the title..."
              value={updateForm.title}
              onChange={handleUpdateFieldChange}
            />
            <br />
            <br />
            <textarea
              cols="30"
              rows="5"
              name="body"
              placeholder="Enter the body..."
              value={updateForm.body}
              onChange={handleUpdateFieldChange}
            ></textarea>
            <br />
            <br />
            <button type="submit">Update Note</button>
          </form>
        </div>
      )}
    </div>
  );
};

export default App;
