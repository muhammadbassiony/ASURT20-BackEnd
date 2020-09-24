const express = require("express");
const router = express.Router();
const isAuth = require("../middlewares/isAuth");
const isAdmin = require("../middlewares/isAdmin");
const upload = require("../middlewares/upload");

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
