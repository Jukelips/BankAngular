// Get dependencies
// const express = require('express');
import * as express from 'express';
import * as session from 'express-session';
import * as mongoose from 'mongoose';
import * as bodyParser from 'body-parser';


const path = require('path');
const http = require('http');
// const session = require('express-session');
// const bodyParser = require('body-parser');
const MongoStore = require('connect-mongo')(session);

// Get our API routes
const api = require('./server/routes/api');

const app = express();

// const mongoose = require('mongoose');
const url = 'mongodb://localhost:27017/bankangular';
const db = mongoose.connection;

mongoose.connect(url, function(err) {
  if (err) { throw err; }
});

app.use(session({
  // secret: 'yolo',
  resave: true,
  saveUninitialized: false,
  store: new MongoStore({
    mongooseConnection: db
  })
}));

// Parsers for POST data
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

// Point static path to dist
app.use(express.static(path.join(__dirname, 'dist')));

// Set our api routes
app.use('/api', api);

// Catch all other routes and return the index file
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'dist/index.html'));
});

/**
 * Get port from environment and store in Express.
 */
const port = process.env.PORT || '3000';
app.set('port', port);

/**
 * Create HTTP server.
 */
const server = http.createServer(app);

/**
 * Listen on provided port, on all network interfaces.
 */
server.listen(port, () => console.log(`API running on localhost:${port}`));
