var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const mongoose = require('mongoose');
const cors = require("cors");
require("dotenv").config();

var authRouter = require('./routes/authRoute.js');
var app = express();

app.use(cors({
  origin: 'https://chimebuka.onrender.com', // Update this line
  credentials: true // Allow credentials (cookies, authorization headers, etc.)
}));
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

const { MONGO_URL_PROD, MONGO_URL_DEV, PORT } = process.env;

const mongoURL = process.env.NODE_ENV === 'production'
  ? MONGO_URL_PROD
  : MONGO_URL_DEV;
console.log(mongoURL)
mongoose
  .connect(mongoURL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("MongoDB is connected successfully"))
  .catch((err) => console.error(err));


app.use("/", authRouter);
// app.use('/users', usersRouter);

app.use(express.static(path.join(__dirname, "build")));

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');


app.use(express.static(path.join(__dirname, 'public')));

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
