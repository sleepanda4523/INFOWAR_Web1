const express = require('express');
const db = require('../db/index.js');
const { adminToken } = require('../middleware/adminauth.js');

require('dotenv').config();
const router = express.Router();

router.get('/', adminToken, (req, res) => {
    db.query('SELECT name FROM image', (err, rows, fields) => {
        //console.log(rows);
        let list = [];
        for(let i in rows) {
            list.push({ name : rows[i].name});
        }
        return res.status(200).json({
            list : list
        })
    })
})

module.exports = router;