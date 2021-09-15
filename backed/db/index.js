const mysql = require('mysql');
const dbconfig = require('../config/database.js');
const { splitFilename } = require('../middleware/splitfilename.js');
const path = require('path');
const fs = require('fs');

const connection = mysql.createConnection(dbconfig);
let checkTable = true;

function init() {
    connection.connect();
    console.log(dbconfig);
    
    connection.query(`USE ${process.env.SQLDATABASE}`, function(err, rows, fields) {
        if (err) throw err;
    });
    connection.query("SHOW TABLES", function(err, rows, fields) {
        if (err) throw err;
        if(rows.length === 0){
            checkTable = false;
        }
    });
}

function check() {
    if(!checkTable){
        connection.query("CREATE TABLE image (name VARCHAR(200) NOT NULL PRIMARY KEY, extension VARCHAR(100), path VARCHAR(255))", 
            function(err, rows, fields) {
        if (err) throw err;
        console.log('Make Image Table!');
        });

        connection.query("CREATE TABLE user (num INT NOT NULL PRIMARY KEY, name VARCHAR(10), id VARCHAR(20), password VARCHAR(50))", 
            function(err, rows, fields) {
        if (err) throw err;
        console.log('Make User Table!');
        });
    
        // Insert Users
        connection.query("INSERT INTO user (num, name, id, password) VALUES(1, 'Admin', 'admin', '210CF7AA5E2682C9C9D4511F88FE2789');", 
            function(err, rows, fields) {
        if (err) throw err;
        console.log('Insert admin');
        });
        
        connection.query("INSERT INTO user (num, name, id, password) VALUES(0, 'Guest', 'guest', 'guest');", 
            function(err, rows, fields) {
        if (err) throw err;
        console.log('Insert guest');
        });
    
        //Insert FLAG
        const dir = './images/';
        const filelist = fs.readdir(dir, function(err, filelist){
            if(err) throw err;
            for(let file of filelist) {
                const fullpath = path.join(path.resolve(), dir+file);
                console.log(fullpath)
                const { filename, filetype } = splitFilename(file);
                connection.query(`INSERT INTO image (name, extension, path) VALUES('${filename}', '${filetype}', '${fullpath}');`, 
                function(err, rows, fields) {
                    if (err) throw err;
                    console.log(`Insert ${filename}`);
                });
            }
        });
    }
}
setTimeout(init, 1500);
setTimeout(check, 3000);

module.exports = connection;