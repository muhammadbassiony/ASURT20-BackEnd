const path = require("path");
const express = require("express");

const eventsController = require("../controllers/event");

const isAdmin = require("../../middleware/isAdmin");
const isAuth = require("../../middleware/isAuth");

const router = express.Router();

router.get("/all-events", isAuth, isAdmin(2), eventsController.getAllEvents);

router.get("/get-event/:eventId", isAuth, isAdmin(2), eventsController.getEvent);

router.post("/add-event", isAuth, isAdmin(3), eventsController.addNewEvent);

router.put("/update-event/:eventId", isAuth, isAdmin(2), eventsController.updateEvent);

router.put("/edit-event-status/:eventId", isAuth, isAdmin(2), eventsController.toggleEventStatus);

router.put("/increment-event-applicants/:eventId", isAuth, eventsController.incrementNumApplicants);

router.put(
    "/increment-num-acc/:eventId",
    isAuth,
    isAdmin(2),
    eventsController.incrementNumAccepted
);

router.put(
    "/increment-num-rej/:eventId",
    isAuth,
    isAdmin(2),
    eventsController.incrementNumRejected
);

router.put(
    "/increment-num-pendacc/:eventId",
    isAuth,
    isAdmin(2),
    eventsController.incrementNumPendAcc
);

router.put(
    "/increment-num-pendrej/:eventId",
    isAuth,
    isAdmin(2),
    eventsController.incrementNumPendRej
);

router.delete("/delete-event/:eventId", isAuth, isAdmin(2), eventsController.deleteEvent);

module.exports = router;

//put -> update
//post -> add
