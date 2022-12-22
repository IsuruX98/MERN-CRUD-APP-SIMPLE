//Load env variables
if (process.env.NODE_ENV != "production") {
  require("dotenv").config();
}

//Import dependencies
const express = require("express");
const DBconnection = require("./config/DBconnection");
const cors = require("cors");

//Import controllers
const noteController = require("./controllers/noteController");

//create an express app
const app = express();
app.use(express.json());
app.use(cors());

//conncet to database
DBconnection();

//Routing

//Create a note
app.post("/create", noteController.createNotes);

//Retrieve all the notes
app.get("/read", noteController.fetchNotes);

//Retrieve a single note
app.get("/readOne/:id", noteController.fetchNote);

//Update a note
app.put("/update/:id", noteController.updateNotes);

//Delete a note
app.delete("/delete/:id", noteController.deleteNotes);

//Start the server
const port = process.env.PORT;

app.listen(port, () => {
  console.log(`Server running on port ${port} 🔥`);
});
