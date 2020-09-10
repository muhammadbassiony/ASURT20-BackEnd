const path = require("path");
const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");

const teamController = require('./routes/team');

const MONGODB_URI =
  'mongodb+srv://admin:admin@cluster0.9141m.mongodb.net/recruitment?retryWrites=true&w=majority';

const app = express();

app.use(bodyParser.json()); 
app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader(
        'Access-Control-Allow-Methods',
        'OPTIONS, GET, POST, PUT, PATCH, DELETE'
    );
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
    next();
});

app.use('/api/team', teamController);


app.use((error, req, res, next) => {
  console.log(error);
  const status = error.statusCode || 500;
  const message = error.message;
  const data = error.data;
  res.status(status).json({ message: message, data: data });
});


mongoose
  .connect(
    MONGODB_URI
  )
  .then(result => {
    app.listen(8080);
    console.log("connected!");
  })
  .catch(err => console.log(err));
