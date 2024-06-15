const axios = require('axios');


const verifyToken = async (req, res, next) => {
    const token = req.header('Authorization')?.replace('Bearer ', '');
    if (!token) {
        return res.status(401).send({ message: 'Access denied. No token provided.' });
    }

    console.log(token)

    try {
        const response = await axios.get(`http://authentication-service:4000/api/validate/${token}`, {
            headers: { Authorization: `Bearer ${token}` }
        });

        if (response.status === 200) {
            req.user = response.data;
            next();
        } else {
            res.status(401).send({ message: 'Invalid token.' });
        }
    } catch (error) {
        res.status(500).send({ message: 'Token validation failed.', error: error.message });
    }
};

module.exports = verifyToken;
