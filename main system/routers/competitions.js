const router = require("express").Router();
const { body } = require("express-validator");

const competitionsController = require("../controllers/competitions");

const isAdmin = require("../../middleware/isAdmin");
const isAuth = require("../../middleware/isAuth");
const validate = require("../../middleware/validate");

router.get("/get-all-comps",  competitionsController.getAllCompetitions);

router.get("/get-comp/:id", competitionsController.getCompetition);

router.post(
    "/add-comp",
    [
        body("name")
            .isLength({ min: 3 })
            .withMessage("Competition name must be at least 3 characters"),
    ],
    isAuth,
    isAdmin(3),
    validate("Competition data is invalid"),
    competitionsController.addNewCompetition
);

module.exports = router;
