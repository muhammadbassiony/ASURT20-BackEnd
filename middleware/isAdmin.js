const error = require("../utils/errorFunction");
module.exports = (req, res, next) => {
    try {
        const isAdmin = req.permissions === 1;
        if (!isAdmin) error("Access denied", 403);
        next();
    } catch (err) {
        next(err);
    }
};
