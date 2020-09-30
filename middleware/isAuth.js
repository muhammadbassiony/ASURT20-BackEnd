const jwt = require("jsonwebtoken");


module.exports = (req, res, next) => {
    try {
        const authHeader = req.get("Authorization");
        if (!authHeader) error("Authentication failed", 401, ["No authentication token"]);
        const token = authHeader.split(" ")[1];
        let decodedToken;
        decodedToken = jwt.verify(token, process.env.JWT_SECRET);
        if (!decodedToken) error("Authentication failed", 401);
        req.userId = decodedToken.userId;
        req.level = decodedToken.level;
        next();
    } catch (err) {
        if (err instanceof jwt.JsonWebTokenError) error("Invalid token", 401);
        // return (err, req, res, next);
        next(err);
    }

    // const authHeader = req.get("Authorization");
    // if (!authHeader) error("Authentication failed", 401, ["No authentication token"]);
    // const token = authHeader.split(" ")[1];
    // let decodedToken;
    
    // try {
    //     decodedToken = jwt.verify(token, process.env.JWT_SECRET);
    // } catch (err) {
    //     err.statusCode = 500;
    //     throw err;
    // }
    // if (!decodedToken) error("Authentication failed", 401);
    // req.userId = decodedToken.userId;
    // req.level = decodedToken.level;
    // next();
};
