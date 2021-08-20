const express = require('express');
const path = require('path')
const db = require('../db/index.js');
const { verifyToken } = require('../middleware/authorization.js');
const { imageUpload } = require('../middleware/imageupload.js');
const { splitFilename } = require('../middleware/splitfilename.js');

require('dotenv').config();
const router = express.Router();

router.post('/', verifyToken,imageUpload.single('image'),  (req, res) => {
    let name = req.file.filename.toString();
    const { filename, filetype } = splitFilename(name);
    let fullpath = path.join(path.resolve(), req.file.path);
    fullpath = fullpath.replace(/\\/g, '\\\\');
    //console.log(req.file.path);
    db.query(`INSERT INTO image (name, extension, path) VALUES("${filename}", "${filetype}","${fullpath}")`, 
        (err, rows, fields) => {
            if (err) throw err;
    })
    res.status(200).json({
        filetype : filetype
    })
})
router.use((err, req, res, next) => {
    console.log(err);
    res.status(400).json({
        errormessage : err.message
    })
})

module.exports = router;