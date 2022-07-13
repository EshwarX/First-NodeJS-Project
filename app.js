/**
 *Name: Xavier Huang
 *Date: 05/17/2022
 *Section: CSE 154 AE
 *This is the server side js. file for CP4, it defines API
 *it stores and manages the account and password information
 *for users.
 */

'use strict';

const express = require("express");
const Datastore = require('nedb');
const bodyParser = require("body-parser");
let jsonParser = bodyParser.json();
require('dotenv').config();

const app = express();
const database = new Datastore({filename: 'database.db', autoload: true});
const STATUS = 200;
const INVALID = 400;
const PORT_CODE = 8826;
const PORT = process.env.PORT || PORT_CODE;

/** Respond to GET request, returns plain text indicating whether user is registered. */
app.get("/users/:name", (req, res) => {
  if (req === undefined) {
    res.status(INVALID).send("Error: Invalid Fetch");
  }
  database.find({name: req.params.name}, (err, data) => {
    res.send(determineRes(err, data, req.params.name));
  });
});

/**
 * A function that returns the desired output to send to the client side.
 * @param {String} err - error caught
 * @param {array} data - an array of object found
 * @param {String} user - the name of the user to be displayed.
 * @return {String} returns the desired string for the client side.
 */
function determineRes(err, data, user) {
  if (err) {
    return err;
  }
  if (data.length === 0) {
    return "Welcome, " + user + ", please sign up.";
  }
  return "This user already exists";
}

/** Respond to GET request, returning the user object */
app.get("/login/:name", (req, res) => {
  if (req === undefined) {
    res.status(INVALID).send("Error: Invalid Fetch");
  }
  database.find({name: req.params.name}, (err, data) => {
    if (err) {
      res.send(err);
    }
    res.send(data);
  });
});

/** Responds to POST fetches, reads the information and stores in database */
app.post('/adduser', jsonParser, (request, response) => {
  if (request === undefined) {
    response.status(INVALID).send("Error: Invalid Fetch");
  }
  let data = request.body;
  database.insert(data);
  response.status(STATUS);
  response.contentType('application/json');
  response.json(data);
});

app.use(express.static('public'));
app.use(express.json());
app.use(bodyParser.json());

app.listen(PORT);