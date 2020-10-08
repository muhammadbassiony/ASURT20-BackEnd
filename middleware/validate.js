const { validationResult } = require("express-validator");
// const error = require("../utils/errorFunction");

module.exports = ( message = "Input data is invalid", statusCode = 400) => {
    return (req, res, next) => {
        try {
            // console.log('\n\n\nVALIDATE MIDDLEWARE REQ :: \n', req);
            const errors = validationResult(req);
            if (!errors.isEmpty()) {
                const data = [...errors.errors];
                error(message, statusCode, data);
            }
        } catch (err) {
            next(err);
        }
        next();
    };
};
