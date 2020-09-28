const router = require("express").Router();
const { body } = require("express-validator");

const { getAll, add, getOne } = require("../controllers/competitions");

const isAdmin = require("../../middleware/isAdmin");
const isAuth = require("../../middleware/isAuth");
const validate = require("../../middleware/validate");

router.get("/getAll", getAll);
router.get("/getOne/:id", getOne);
router.post(
    "/add",
    [
        body("name")
            .isLength({ min: 3 })
            .withMessage("Competition name must be at least 3 characters"),
    ],
    isAuth,
    isAdmin(3),
    validate("Competition data is invalid"),
    add
);

module.exports = router;
