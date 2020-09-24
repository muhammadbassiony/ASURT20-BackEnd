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
// const usersRouter = require("./routers/users");
const sponsorsRouter = require("./main system/routers/sponsors");
const prizesRouter = require("./main system/routers/prizes");
const competitionsRouter = require("./main system/routers/competitions");

if (process.env.NODE_ENV !== "production") require("dotenv").config();

//switch to this uri if you want to use the recruitment system
// const MONGODB_URI =
//   'mongodb+srv://admin:admin@cluster0.9141m.mongodb.net/recruitment?retryWrites=true&w=majority';

//switch to this uri to test the main system
const MONGODB_URI = `mongodb+srv://${process.env.MONGO_USER}:${process.env.MONGO_PASSWORD}@cluster0.srk19.mongodb.net/${process.env.MONGO_DEFAULT_DATABASE}`;
// // mongodb+srv://RacingTeam:RacingTeamPass@cluster0.srk19.mongodb.net/rcteam


const app = express();

app.use(bodyParser.json()); 
// app.use(bodyParser.urlencoded({ extended: false }));
app.use("/images", express.static(path.join(__dirname, "images")));

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

app.use('/api/auth/user', userRoutes);

app.use('/api/rec/team', teamRoutes);
app.use('/api/rec/event', eventRoutes);
app.use('/api/rec/application', appsRoutes);
app.use('/api/rec/interview', interviewRoutes);

// app.use("/api/main/users", usersRouter);
app.use("/api/main/sponsors", sponsorsRouter);
app.use("/api/main/prizes", prizesRouter);
app.use("/api/main/photorolls", photorollsRouter);
app.use("/api/main/competitions", competitionsRouter);

// TODO :: set global this.currentSeason for all app ?? where ?? - leave for next season

app.use("", (req, res) => {
  res.sendFile(path.join(__dirname, "views", "doc.html"));
});

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
    app.listen(process.env.PORT || 3000);
    // app.listen(8080);
    console.log("connected!");
  })
  .catch(err => console.log(err));
