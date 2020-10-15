
module.exports = function isAdmin(accessLevel) {
    return (error, req, res, next) => {
        if(error) next(error);
        // next();
        // implement here later
        try {
            console.log('ISADMIN', req.level, req.level>=accessLevel);
            const isAdmin = req.level >= accessLevel;
            if (!isAdmin) error("Access denied", 403);
            next();
        } catch (err) {
            // next(err);
            return res.status(401).json({ message: 'Unauthorized' });

        }
    }
}