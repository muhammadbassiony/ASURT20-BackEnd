const path = require("path");
const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");

const multer = require('multer');
const fs = require('fs');

const userRoutes = require('./auth system/routes/user');

const teamRoutes = require('./recruitment system/routes/team');
const eventRoutes = require('./recruitment system/routes/event');
const appsRoutes = require('./recruitment system/routes/application');
const interviewRoutes = require('./recruitment system/routes/interview');

const photorollsRouter = require("./main system/routers/photorolls");
const sponsorsRouter = require("./main system/routers/sponsors");
const prizesRouter = require("./main system/routers/prizes");
const competitionsRouter = require("./main system/routers/competitions");


// if (process.env.NODE_ENV !== "production") require("dotenv").config();
require("dotenv").config();


const MONGODB_URI =
'mongodb+srv://admin:admin@cluster0.9141m.mongodb.net/recruitment?retryWrites=true&w=majority';

// const MONGODB_URI = "mongodb://localhost:27017/asurtWebsite"




var options = {
  setHeaders: function (res, path, stat) {
    res.set('Content-Type', 'image/jpeg');
    res.set('X-Content-Type-Options', 'nosniff');
  }
}

const app = express();

app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader(
      'Access-Control-Allow-Methods',
      'OPTIONS, GET, POST, PUT, PATCH, DELETE'
  );
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization, X-Content-Type-Options');
  // res.setHeader('X-Content-Type-Options', 'nosniff');    
  next();
});

app.use(bodyParser.json()); 
app.use(bodyParser.urlencoded({ extended: false }));

app.use("/images", express.static(path.join(__dirname, "images")));
app.use("/sponsors", express.static(path.join(__dirname, "images", "sponsors")));
app.use("/photorolls", express.static(path.join(__dirname, "images", "photorolls")));
app.use("/awards", express.static(path.join(__dirname, "images", "awards")));

app.use("/cvs", express.static(path.join(__dirname, "recruitment system", "cvs")));
app.use("/recruitment system/excel-files", express.static(path.join(__dirname,  "recruitment system", "excel-files")));

app.use("/", express.static(path.join(__dirname, "angular")));


app.use('/api/auth/user', userRoutes);

app.use('/api/rec/team', teamRoutes);
app.use('/api/rec/event', eventRoutes);
app.use('/api/rec/application', appsRoutes);
app.use('/api/rec/interview', interviewRoutes);

app.use("/api/main/sponsors", sponsorsRouter);
app.use("/api/main/prizes", prizesRouter);
app.use("/api/main/photorolls", photorollsRouter);
app.use("/api/main/competitions", competitionsRouter);

// TODO :: set global this.currentSeason for all app?? where?? with front??- leave for next season

// app.use((req, res, next) => {
//   res.sendFile(path.join(__dirname, "angular", "index.html"));
// });



app.use((error, req, res, next) => {
  console.log(error);
  const status = error.statusCode || 500;
  const message = error.message;
  const data = error.data;
  res.status(status).json({ message: message, data: data });
});



  mongoose.connect(
    MONGODB_URI,
    {
      // "auth": {
      //   "authSource": "admin"
      // },
      // "user": "asurtIT",
      // "pass": "ITians_asurt20",
      "useNewUrlParser": true,
      "useUnifiedTopology": true
     }
  )
  .then(result => {
      app.listen(process.env.PORT || 3000);
      // app.listen(8080);
      console.log("connected!");
  })
  .catch(err => console.log(err));