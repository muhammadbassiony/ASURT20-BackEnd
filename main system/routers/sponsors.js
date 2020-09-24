const express = require("express");
const router = express.Router();

const isAuth = require("../../middleware/isAuth");
const isAdmin = require("../../middleware/isAdmin");
const upload = require("../../middleware/upload");

const sponsorsController = require("../controllers/sponsors");

router.get("/get", sponsorsController.getAll);

router.post(
    "/add",
    isAuth,
    isAdmin,
    upload({ sub: "sponsors" }, true, "logo"),
    sponsorsController.addSponsor
);
router.patch("/activate/:id", isAuth, isAdmin, sponsorsController.activate);

module.exports = router;
