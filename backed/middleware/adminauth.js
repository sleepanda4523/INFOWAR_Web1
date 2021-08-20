const jwt = require('jsonwebtoken');
const express = require('express');
const YOUR_SECRET_KEY = process.env.SECRET_KEY;
require('dotenv').config();

const adminToken = (req, res, next) => {
    try {
        const token = req.headers.accesstoken;
        const decoded = jwt.verify(token, YOUR_SECRET_KEY);
        //console.log(decoded);
        if (decoded && decoded.id === 'admin') {
            next();
        } else {
            res.status(401).json({ errorMessage: 'unauthorized' });
        }
    } catch (err) {
            res.status(400).json({ errorMessage: 'token expired' });
    }
};

exports.adminToken = adminToken;
