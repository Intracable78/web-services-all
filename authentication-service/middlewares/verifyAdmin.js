
const jwt = require('jsonwebtoken');

function verifyAdmin(req, res, next) {
    const token = req.headers.authorization?.split(" ")[1];
    if (!token) return res.status(401).json({ message: "Access denied. No token provided." });

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = decoded;

        console.log(decoded);

        if (req.user.role !== 'ROLE_ADMIN') {
            return res.status(403).json({ message: "Access denied. Requires admin role." });
        }
        next();
    } catch (error) {
        res.status(400).json({ message: "Invalid token." });
    }
}

module.exports = verifyAdmin;