const mongoose = require("mongoose");

// Define User schema
const Schema = mongoose.Schema;


// Attributes of the data object.
const userSchema = new Schema({
  name: String,
  email: String,
  password: String,
  office: String,
  debt: Number,
  points: Number,
});

// Compile model from schema
module.exports = mongoose.model('user', userSchema );