const bodyParser = require('body-parser');
const express = require('express');
const logger = require('morgan')

const app = express();
const port = 5000;

const login = require('./route/login');
const print = require('./route/print');

app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use(logger());

app.use('/api/login', login);
app.use('/api/print', print);


app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
});