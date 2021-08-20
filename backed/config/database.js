require('dotenv').config();
module.exports = {
    host : process.env.SQLHOST,
    port : process.env.SQLPORT,
    user : process.env.SQLUSER,
    password : process.env.SQLPASSWORD,
    database : process.env.SQLDATABASE
};

