const bodyParser = require('body-parser');
const express = require('express');
const logger = require('morgan')
const app = express();
const port = 5000;

const login = require('./route/login');
const upload = require('./route/upload');
const print = require('./route/print');
const list = require('./route/list');

app.use(express.json());
app.use(express.urlencoded({extended:true}))
app.use(logger());

app.use('/api/login', login);
app.use('/api/upload', upload);
app.use('/api/print', print);
app.use('/api/list', list);


app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
});