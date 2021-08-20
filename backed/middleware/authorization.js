const jwt = require('jsonwebtoken');
const YOUR_SECRET_KEY = process.env.SECRET_KEY;
require('dotenv').config();

const verifyToken = (req, res, next) => {
    try {
        const token = req.headers.accesstoken;
        const decoded = jwt.verify(token, YOUR_SECRET_KEY);
        if (decoded) {
            next();
        } else {
            res.status(401).json({ error: 'unauthorized' });
        }
    } catch (err) {
            res.status(401).json({ error: 'token expired' });
    }
};

exports.verifyToken = verifyToken;
