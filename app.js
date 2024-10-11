var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

const mongoose = require('mongoose');
const config = require("config");
const cors = require("cors");


const connection = config.get("mongodb");
console.log(`connecting to ${connection}`);

mongoose.connect(connection);

//mongoose.connect('mongodb://127.0.0.1:27017/MONGODBLES');
//mongoose.connect(
  //'mongodb+srv://danteverbiest:7nKd9ddVxmLsqSdv@mongodblescluster.a3i9g.mongodb.net/'
//); //aanpassen voor conndecte om mongedb.com //in production file

const messageRouter = require('./routes/api/v1/messages');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(cors());

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use("/api/v1/messages", messageRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
