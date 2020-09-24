//should take extra parameter to type of desired team and return true if user member of THIS team

const User = require('../auth system/models/user');
const Member = require('../auth system/models/member');

module.exports = function isMember(subteam) {
    return function(req, res, next) {
        next();
        // implement here later
    //   if (subteam !== req.user.role){
    //     // res.redirect(...);
    //   } 
    //   else next();
    }
}