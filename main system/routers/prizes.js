const router = require("express").Router();
const { body } = require("express-validator");
const validate = require("../middlewares/validate");
const isAuth = require("../middlewares/isAuth");
const isAdmin = require("../middlewares/isAdmin");

const prizeController = require("../controllers/prizes");
const upload = require("../middlewares/upload");

router.post(
    "/add",
    isAuth,
    isAdmin,
    upload({ main: "images", sub: "prizes" }, true, "prizeImage"),
    [body("title").not().isEmpty(), body("description").not().isEmpty()],
    validate("prize data is not valid", 400),
    prizeController.addPrize
);

router.get("/get/:id", prizeController.getPrizes);

module.exports = router;
