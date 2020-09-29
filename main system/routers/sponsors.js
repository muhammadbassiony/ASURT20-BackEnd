const express = require("express");
const router = express.Router();

const isAuth = require("../../middleware/isAuth");
const isAdmin = require("../../middleware/isAdmin");
const upload = require("../../middleware/upload");

const sponsorsController = require("../controllers/sponsors");

router.get("/get-all", sponsorsController.getAll);

router.get('/get-activated', sponsorsController.getActivated);

router.post(
    "/add",
    isAuth,
    isAdmin(2),
    upload({ sub: "sponsors" }, true, "logo"),
    sponsorsController.addSponsor
);

router.patch("/activate/:id", isAuth, isAdmin(2), sponsorsController.activate);

router.get('/get-logo/:url', sponsorsController.getLogo);

module.exports = router;
