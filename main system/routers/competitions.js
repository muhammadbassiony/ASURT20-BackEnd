const router = require("express").Router();
const { body } = require("express-validator");

const competitionsController = require("../controllers/competitions");

const isAdmin = require("../../middleware/isAdmin");
const isAuth = require("../../middleware/isAuth");
// const validate = require("../../middleware/validate");
const upload = require("../../middleware/upload");

router.get("/get-all-comps",  competitionsController.getAllCompetitions);

router.get("/get-all-comps-populated",  competitionsController.getAllCompetitionsPopulated);

router.get("/get-comp/:id", competitionsController.getCompetition);

router.post(
    "/add-comp",
    // [
    //     body("name")
    //     .isLength({ min: 3 })
    //     .withMessage("Competition name must be at least 3 characters"),
    // ],
    // isAuth,
    // isAdmin(3),
    // validate("Competition data is invalid"),
    competitionsController.addNewCompetition
);

router.put('/update-comp/:compId', competitionsController.updateCompetition);

router.post(
    '/add-award/:compId', 
    upload({ main: "images", sub: "awards" }, true, "awardImg"), 
    competitionsController.addNewAward);

// router.get('/get-award/:awardId', competitionsController.getAward);

router.put('/update-award/:awardId', competitionsController.updateAward);

router.delete('/delete-award/:awardId/:compId', competitionsController.deleteAward);

module.exports = router;
