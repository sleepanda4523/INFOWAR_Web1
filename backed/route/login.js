const express = require('express');
const jwt = require('jsonwebtoken');
const db = require('../db/index.js');
require('dotenv').config();

const router = express.Router();
const YOUR_SECRET_KEY = process.env.SECRET_KEY;


/// Login
router.post('/', (req, res) => {
    const id = req.body.id;
    const pw = req.body.password;
    if (id.length === 0 || pw.length === 0) {
        return res.status(403).json({
            "statusCode": 403,
            "errorMessage": "Failed Login"
        })
    }
    db.query(`SELECT id, password FROM user WHERE id='${id}' AND password='${pw}';`, (err, results) => {
        if (err || results.length === 0) {
            return res.status(403).json({
                "statusCode": 403,
	            "errorMessage": "Failed Login"
            })
        };

        const token = jwt.sign({id}, YOUR_SECRET_KEY, {
            expiresIn: '1h'
        })
        return res.status(200).json({
            "success" : "OK",
	        "accessToken": token
        })
    })
});

module.exports = router;