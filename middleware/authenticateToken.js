const jwt = require('jsonwebtoken');
const jwtPassword = "pass123"; // Same password used for signing the token

const authenticateToken = (req, res, next) => {
    const token = req.headers['authorization'] // Expecting "Bearer <token>"
    // console.log(token)
    if (!token) {
        return res.status(403).json({ msg: "Access denied, no token provided." });
    }
    


    jwt.verify(token, jwtPassword, (err, user) => {
        if (err) {
            return res.status(403).json({ msg: "Invalid token." });
        }

        req.user = user; // Attach the decoded user data to the request object
        next(); // Proceed to the next middleware/route handler
    });
};

module.exports = authenticateToken;
