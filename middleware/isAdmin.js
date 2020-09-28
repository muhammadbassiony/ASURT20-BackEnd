// const error = require("../utils/errorFunction");
// module.exports = (req, res, next) => {
//     try {
//         const isAdmin = req.level === 1;
//         if (!isAdmin) error("Access denied", 403);
//         next();
//     } catch (err) {
//         next(err);
//     }
// };

module.exports = (accessLevel) => {
    return function(req, res, next) {
        // next();
        // implement here later
        try {
            const isAdmin = req.level >= accessLevel;
            if (!isAdmin) error("Access denied", 403);
            next();
        } catch (err) {
            next(err);
        }
    }
}