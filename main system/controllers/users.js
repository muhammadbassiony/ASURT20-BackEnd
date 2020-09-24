const User = require("../models/users");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const error = require("../utils/errorFunction");

exports.signUp = async (req, res, next) => {
    const { name, email, password } = req.body;
    const hashedPassword = await bcrypt.hash(password, 12);
    const doc = await new User({ name: name, email: email, password: hashedPassword }).save();
    const id = doc._id.toString();
    const permissions = doc.permissions;
    const token = this.generateJWT(id, permissions);
    res.status(201).json({
        message: "Account created",
        token: token,
    });
};

exports.login = async (req, res, next) => {
    try {
        const { email, password } = req.body;
        const user = await User.findOne({ email: email });
        const id = user._id.toString();
        const permissions = user.permissions;
        const hashedPassword = user.password;
        const doMatch = await bcrypt.compare(password, hashedPassword);
        if (doMatch) {
            const token = this.generateJWT(id, permissions);
            res.status(200).json({ message: "Login successfully", token: token });
        } else error("Password is incorrect", 401, [{ email: email }]);
    } catch (err) {
        next(err);
    }
};

exports.generateJWT = (id, permissions) => {
    return jwt.sign({ userId: id, permissions: permissions }, process.env.JWT_SECRET, {
        expiresIn: "1h",
    });
};
