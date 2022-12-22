//Load env variables
if (process.env.NODE_ENV != "production") {
  require("dotenv").config();
}
//Import dependencies
const mongoose = require("mongoose");

//making the connection
const DBconnection = async () => {
  try {
    //to avoid a console error message
    mongoose.set("strictQuery", true);

    await mongoose.connect(process.env.URL);
    console.log("Connected to Database 🚀");
  } catch (error) {
    console.log(error);
  }
};
module.exports = DBconnection;
