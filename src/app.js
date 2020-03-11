const express = require('express')
const usersRouter = require('./routes/userRoutes');
var bodyParser = require('body-parser')
const app = express();
var mongoose = require('mongoose');


// server basic configuration
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }));
app.use('/user/', usersRouter);

//Import the mongoose module

//Set up default mongoose connection
var mongoDB = 'mongodb+srv://admin:gbm123@dbtest-tn0ge.mongodb.net/test?retryWrites=true&w=majority';
mongoose.connect(mongoDB, { useNewUrlParser: true });

//Get the default connection
var db = mongoose.connection;

//Bind connection to error event (to get notification of connection errors)
db.on('error', console.error.bind(console, 'MongoDB connection error:'));

// Our server is listening on port 8000 using express framework
app.listen(8000, () => {
  console.log('Example app listening on port 8000!')
});