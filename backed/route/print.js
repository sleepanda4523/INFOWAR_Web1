const express = require('express');
const fs = require('fs');
const db = require('../db/index.js');
const { adminToken } = require('../middleware/adminauth.js');
require('dotenv').config();
const router = express.Router();

router.post('/', adminToken, (req, res) => {
    const filename = req.body.filename;
    if(filename.toLowerCase() === 'flag') {
        return res.status(401).json({
            errorMessage : "Unauthorized"
        })
    }
    db.query(`SELECT * FROM image WHERE name='${filename}'`, (err, rows, fields) =>{
        if(err || rows.length === 0) {
            console.log(err);
            return res.status(404).json({
                errorMessage : "Not Found"
            })
        }
        const extension = rows[0].extension;
        return res.status(200).json({
            name : filename,
            extension : extension
        })
    })
})


router.get('/:filename', (req, res) => {
    const { filename } = req.params;
    const query = `SELECT * FROM image WHERE name='${filename}'`;
    //console.log(query);
    db.query(query, (err, rows, fields) =>{
        if(err || rows.length === 0) {
            return res.status(404).json({
                errorMessage : "Not Found"
            })
        }
        const path = rows[0].path;
        console.log(path);
        fs.exists(path,  function(exists){
            if(exists){
                return res.status(200).sendFile(path);
            } else {
                return res.status(404).json({
                    errorMessage : "Not Found"
                })
            }
        });
    })
})

module.exports = router;