const express = require('express')
// const usersRouter = require('./routes/userRoutes');
const routes = require('./routes')
const watson = require('./watson');
const facebook = require('./facebook');
var bodyParser = require('body-parser')
const app = express();


// server basic configuration
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }));
app.use('/', routes);


// watson configuration
app.use('/watson/', watson)
app.use('/fb/', facebook)

module.exports = app;