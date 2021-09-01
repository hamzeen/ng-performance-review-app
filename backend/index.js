require('dotenv').config(); // process.env.MONGO_DB_NAME [JWT_SECRET]
const env = require('./config')[process.env.NODE_ENV]; // config.[environment].port

const logger = require('morgan');
const cors = require('cors');
const bodyParser = require('body-parser');
const express = require('express');

const app = express();
const routes = require('./routes/routes.js');

app.use(cors());
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());
app.use(logger('log:: ' + env.name));
app.use('/api/v1', routes);

app.listen(`${env.port}`, () => {
  console.log(`Environment::\t\t\t ${process.env.NODE_ENV}`);
  console.log(`PROCESS.ENV => DB_NAME::\t ${process.env.MONGO_DB_NAME}`);
  console.log(`server running at \t\t 127.0.0.0:${env.port}`);
});


module.exports = app;
