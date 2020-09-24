const express = require("express");
const router = express.Router();
const upload = require("../middlewares/upload");
const photorollsController = require("../controllers/photorolls");
const isAuth = require("../middlewares/isAuth");
const isAdmin = require("../middlewares/isAdmin");

router.get("/get/:id", photorollsController.getPhotoroll);

router.post(
    "/add",
    isAuth,
    isAdmin,
    upload({ sub: "photorolls" }, false),
    photorollsController.updatePhotoroll
);
router.delete("/delete", isAuth, isAdmin, photorollsController.delete);

module.exports = router;
