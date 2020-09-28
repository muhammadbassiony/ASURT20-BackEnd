const express = require("express");
const router = express.Router();

const photorollsController = require("../controllers/photorolls");

const upload = require("../../middleware/upload");
const isAuth = require("../../middleware/isAuth");
const isAdmin = require("../../middleware/isAdmin");

router.get("/get/:id", photorollsController.getPhotoroll);

router.post(
    "/add",
    isAuth,
    isAdmin(2),
    upload({ sub: "photorolls" }, false),
    photorollsController.updatePhotoroll
);
router.delete("/delete", isAuth, isAdmin(2), photorollsController.delete);

module.exports = router;
