const jwt = require("jsonwebtoken");

const verifyToken = (req, res, next) => {
    const authHeader = req.headers.token;
    if (!authHeader) {
        return res.status(401).json({ msg: "No token, authorization denied" });
    }
    const token = authHeader.split(" ")[1];
    if (!token) {
        return res.status(401).json({ msg: "Token not found" });
    }
    try {
        jwt.verify(token, process.env.JWT_SECRET_KEY, (err, user) => {
            if (err) {
                return res.status(401).json({ msg: "Invalid token" });
            }
            req.user = user;
            next();
        });
    } catch (error) {
        res.status(500).json({ msg: "Token is not valid" });
    }
};

const verifyTokenAndAuthorization = (req, res, next) => {
    verifyToken(req, res, () => {
        if (req.user.id === req.params.id) {
            next();
        } else {
            return res.status(401).json({ msg: "You are not authorized to do that." });
        }
    })
}

module.exports = { verifyToken, verifyTokenAndAuthorization };