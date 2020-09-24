const router = require("express").Router();
const { body } = require("express-validator");

const validate = require("../../middleware/validate");
const isAuth = require("../../middleware/isAuth");
const isAdmin = require("../../middleware/isAdmin");
const upload = require("../../middleware/upload");

const prizeController = require("../controllers/prizes");


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
