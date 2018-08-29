'use strict';
const express = require('express');
const http = require('http');
const methodOverride = require('method-override');
const bodyParser = require('body-parser');
const helmet = require('helmet');
const cors = require('cors');
const path = require('path');
const app = express();
const port = process.env.PORT || 8097;
const webpackProyect = require('./config/webpack.proyect.js');

app
  .use(
    helmet({
      frameguard: {
        action: 'deny',
      },
    })
  )
  .use(helmet.noCache())
  .use(cors())
  .use(bodyParser.urlencoded({
    extended: false
  }))
  .use(`${webpackProyect.pathProyect}`, express.static(path.join(__dirname, 'dist')))
  .use(methodOverride());

const server = http.createServer(app);

app.get('*', (req, res) => {
  res.sendfile('./dist/');
});

server.listen(port, (err) => {
  if (err) {
    throw err;
  }
  console.log(`From Server: App iniciada exitósamente y corriendo en puerto: ${port}`);
});