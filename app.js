const path = require("path");
const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");

const multer = require('multer');
const fs = require('fs');

const userRoutes = require('./routes/user');

const teamRoutes = require('./recruitment system/routes/team');
const eventRoutes = require('./recruitment system/routes/event');
const appsRoutes = require('./recruitment system/routes/application');
const interviewRoutes = require('./recruitment system/routes/interview');

const MONGODB_URI =
  'mongodb+srv://admin:admin@cluster0.9141m.mongodb.net/recruitment?retryWrites=true&w=majority';

const app = express();

app.use(bodyParser.json()); 
// app.use(bodyParser.urlencoded({ extended: false }));
app.use("/recruitment system/cvs", express.static(path.join(__dirname, "cvs")));
app.use("/recruitment system/excel-files", express.static(path.join(__dirname, "excel-files")));

app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader(
        'Access-Control-Allow-Methods',
        'OPTIONS, GET, POST, PUT, PATCH, DELETE'
    );
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
    next();
});

app.use('/api/user', userRoutes);

app.use('/api/rec/team', teamRoutes);
app.use('/api/rec/event', eventRoutes);
app.use('/api/rec/application', appsRoutes);
app.use('/api/rec/interview', interviewRoutes);

// TODO :: set global this.currentSeason for all app ??

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
