const router = require("express").Router();
const { body } = require("express-validator");
const { getAll, add, getOne } = require("../controllers/competitions");
const isAdmin = require("../middlewares/isAdmin");
const isAuth = require("../middlewares/isAuth");
const validate = require("../middlewares/validate");

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
    isAdmin,
    validate("Competition data is invalid"),
    add
);

module.exports = router;
