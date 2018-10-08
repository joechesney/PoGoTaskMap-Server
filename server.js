
"use strict";
const express = require('express');
const mysql = require('mysql');
const bodyParser = require('body-parser');
const cors = require('cors');
const nodemailer = require('nodemailer');
const { escape } = require('sqlstring');

const connection = mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PW,
  database: process.env.DB_DATABASE_NAME,
  // insecureAuth: true
});

connection.connect((err) => {
  if (err) throw err;
  console.log('Connected!');
});

const app = express();
app.options('*', cors());
app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

// A home endpoint
app.get('/', (req, res, next) => {
  res.json({
    "hello": "there",
    "this site is available at": "https://pogotaskmap.firebaseapp.com" });
});

/***** REWARD SEARCH *****/
// This basically does what the getPokestops endpoint does, except
//   that it is a much narrower result
// I am using the LIKE keyword for the mysql statement,
//   and surrounding it with the '%' wildcard character, which
//   can retrieve slowly if my database gets huge.
//   an alternative keyword would be INSTR, or LOCATE, if need be
app.get('/rewardSearch/', (req, res, next) => {
  const rewardQuery = escape('%' + req.query.task_reward + '%')
  connection.query(`
  SELECT
  pokestops.*,
    tasks.requirements,
    tasks.reward,
    tasks.pokestop_id,
    tasks.task_date_end_time,
    tasks.id AS task_id,
    CASE
      WHEN tasks.reward LIKE ${rewardQuery}
      THEN 'true'
      ELSE 'false'
      END active
  FROM pokestops
  LEFT JOIN tasks
  ON tasks.pokestop_id = pokestops.id
  AND tasks.task_date_end_time > NOW() - INTERVAL 5 HOUR
  `, (err, pokestops) => {
      if (err) next(err);
      else res.send(pokestops);
    });
});

app.get('/getPokestops', (req, res, next) => {
  // Getting the pokestops also gets the active tasks and gives the pokestops
  // the relationship with the task and also the property on the same object

  connection.query(`
  SELECT
  pokestops.*,
    tasks.requirements,
    tasks.reward,
    tasks.pokestop_id,
    tasks.task_date_end_time,
    tasks.id AS task_id,
    CASE
      WHEN tasks.task_date_end_time > (NOW() - INTERVAL 5 HOUR)
      THEN 'true'
      ELSE 'false'
      END active
  FROM pokestops
  LEFT JOIN tasks
  ON tasks.pokestop_id = pokestops.id
  AND tasks.task_date_end_time > (NOW() - INTERVAL 5 HOUR)
  `, (err, pokestops) => {
      if (err) {
        next(err);
      } else {
        res.send(pokestops);
      }
    });
});
app.get('/getOnePokestop/:pokestop_id', (req, res, next) => {
  // Getting the pokestops also gets the active tasks and gives the pokestops
  // the relationship with the task and also the property on the same object

  connection.query(`
  SELECT
  pokestops.*,
    tasks.requirements,
    tasks.reward,
    tasks.pokestop_id,
    tasks.task_date_end_time,
    tasks.id AS task_id,
    CASE
      WHEN tasks.task_date_end_time > (NOW() - INTERVAL 5 HOUR)
      THEN 'true'
      ELSE 'false'
      END active
  FROM pokestops
  LEFT JOIN tasks
  ON tasks.pokestop_id = pokestops.id
  AND tasks.task_date_end_time > (NOW() - INTERVAL 5 HOUR)
  WHERE pokestops.id = ${req.params.pokestop_id}
  `, (err, result) => {
      if (err) {
        next(err);
      } else {
        res.send({
          pokestop: result,
          serverStatus: 200
        });
      }
    });
});

app.post('/addTask/:pokestop_id', (req, res, next) => {
  // This route sends a user-submitted task as a POST request
  // It gives the server the pokestop_id as a req.param so i can use that as
  // the tasks associated pokestop in the database
  if ( +req.params.pokestop_id !== +req.body.pokestop_id) next(err)
  const taskRequirements = escape(req.body.requirements);
  const taskReward = escape(req.body.reward);
  const sql = `
    INSERT INTO tasks (
      requirements,
      reward,
      pokestop_id,
      task_date_and_submission_time,
      task_date_end_time
    )
    VALUES (
      ${taskRequirements},
      ${taskReward},
      ${req.body.pokestop_id},
      NOW() - INTERVAL 5 HOUR,
      DATE(NOW() - INTERVAL 5 HOUR + INTERVAL 1 DAY)
    )`;
  connection.query(sql, function (err, result) {
    if (err) {
      throw err;
    } else {
      res.send({
        insertId: result.insertId,
        serverStatus: result.serverStatus,
        pokestopId: req.body.pokestop_id
      });
    }
  });
});

app.post('/addNewPokestop', (req, res, next) => {
  // This endpoint sends a user-submitted pokestop as a POST request
  // It first checks to make sure the lat/long values being sent
  // are within the boundaries of the area I have set up

  // These are the boundaries for pokesotp submission. They form a square around niddle TN
  const westmostLocation = [36.073201300051345, -87.39700190267196]; // west past Dickson
  const northmostLocation = [36.64965136535208, -86.79136861074458]; // Kentucky border
  const eastmostLocation = [35.95737315896857, -83.47954587059279]; // east past Knoxville
  const southmostLocation = [34.56341006121154, -86.60234843420953]; // below Huntsville

  // If the submission is not within these boundaries, it sends back an error
  if (req.body.latitude < southmostLocation[0] || req.body.latitude > northmostLocation[0] || req.body.longitude < westmostLocation[1] || req.body.longitude > eastmostLocation[1]) {
    const locationError = new Error("That pokestop is not in middle TN. Double check your lat/long values, or please choose a pokestop in middle TN.");
    next(locationError);
  } else {
    const pokestopName = escape(req.body.name)
    const sql = `
      INSERT INTO pokestops (name, latitude, longitude, date_submitted)
      VALUES (
        ${pokestopName},
        ${req.body.latitude},
        ${req.body.longitude},
        NOW() - INTERVAL 5 HOUR
      )`;
    connection.query(sql, function (err, result) {
      if (err) {
        throw err;
      } else {
        res.send({
          insertId: result.insertId,
          serverStatus: result.serverStatus,
          pokestopId: result.insertId
        });
      }
    });
  }
});

app.post('/changeRequest', (req, res, next) => {
  // This endpoint will send me an email with any requested changes
  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: `${process.env.EMAIL_DESTINATION}`,
      pass: `${process.env.EMAIL_KEY}`
    }
  });
  const mailOptions = {
    from: `${req.body.userEmail}`,
    to: `${process.env.EMAIL_DESTINATION}`,
    subject: "CHANGE REQUEST FROM NASHQUESTMAP",
    html: `
    Message from some dear Pokemon friend named ${req.body.userEmail},<br>
    They said:<br>
    <br>
    ${req.body.changesRequested}`
  };
  transporter.sendMail(mailOptions, function (err, info) {
    if (err) {
      next(err);
    } else {
      res.sendStatus(200);
    }
  });
});

// Error handler
app.use((err, req, res, next) => {
  if (err) { console.log(err) }
  res.status(err.status || 500);
  res.json({ error: err.message });
});

app.listen(process.env.PORT, () => {
  console.log(`listening on http://localhost:${process.env.PORT}`);
});