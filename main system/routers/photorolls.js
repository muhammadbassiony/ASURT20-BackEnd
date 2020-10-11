const express = require("express");
const router = express.Router();

const photorollsController = require("../controllers/photorolls");

const upload = require("../../middleware/upload");
const isAuth = require("../../middleware/isAuth");
const isAdmin = require("../../middleware/isAdmin");

router.get("/get/:id", photorollsController.getPhotoroll);

router.post(
    "/update",
    isAuth,
    isAdmin(2),
    upload({ sub: "photorolls" }, false, "images"),
    photorollsController.updatePhotoroll
);
router.delete("/delete", isAuth, isAdmin(2), photorollsController.delete);

//not required in front end - no auth needed
router.post('/add-new', photorollsController.addNewPhotoroll);

router.get('/get-all', photorollsController.getAllPhotorolls);

module.exports = router;
