import mongoose from 'mongoose';

/**
 * MongoHelper
 * 
 * Set all the setting to connect mongo with our server. 
 * 
 */


//Set up default mongoose connection
var mongoDB = 'mongodb+srv://admin:gbm123@dbtest-tn0ge.mongodb.net/test?retryWrites=true&w=majority';
mongoose.connect(mongoDB, { useNewUrlParser: true });

//Get the default connection
var db = mongoose.connection;

//Bind connection to error event (to get notification of connection errors)
db.on('error', console.error.bind(console, 'MongoDB connection error:'));
