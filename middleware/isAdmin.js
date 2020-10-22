
module.exports = function isAdmin(accessLevel) {
    
    return (req, res, next) => {
        
        try {
            // console.log('ISADMIN', req.level, req.level>=accessLevel);
            const isAdmin = req.level >= accessLevel;
            if (!isAdmin) error("Access denied", 403);
            next();
        } catch (err) {
            // next(err);
            return res.status(401).json({ message: 'Unauthorized' });

        }
    }
}