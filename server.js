const express = require('express');
const mysql = require('mysql');
const factory = require('./factory');
const bodyParser = require('body-parser');
const cors = require('cors');


const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'password',
  database: 'pokemon',
  insecureAuth : true
});


connection.connect((err) => {
  if (err) throw err;
  console.log('Connected!');
});

const app = express();
app.use(cors());
app.use(express.static('public'));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.post('/addTask/:id', (req, res) => {
  console.log('req.body: ', req.body);


  connection.query(sql, function (err, result) {
    if (err) throw err;
    console.log("Number of records inserted: " + result.affectedRows);
  })

  // console.log('req: ', req);
  // factory.addTaskToDatabase({
  //   id: req.body.id,
  //   task: req.body.task,
  //   reward: req.body.reward,
  // })
  // .then((something) => {
  //   console.log('something:',something);
  //   res.send(something)
  // })
})

app.post('/addNewPokestop', (req, res, next) => {

  const westmostLocation = [36.073201300051345, -87.39700190267196]; // past Dickson
  const northmostLocation = [36.64965136535208, -86.79136861074458]; // Kentucky border
  const eastmostLocation = [35.95737315896857, -83.47954587059279]; // past Knoxville
  const southmostLocation = [34.56341006121154, -86.60234843420953]; // below Huntsville
  if (req.body.latitude < southmostLocation[0] || req.body.latitude > northmostLocation[0] || req.body.longitude < westmostLocation[1], req.body.logitude > eastmostLocation[1]){
    let locationError = new Error("That pokestop is not in middle TN. Double check your lat/long values, or please choose a pokestop in middle TN.");
    next(locationError);
  } else {
    console.log('req.body new pokestop',req.body);
    const sql = `
      INSERT INTO pokestops (name, latitude, longitude)
      VALUES (
        '${req.body.name}',
        ${req.body.latitude},
        ${req.body.longitude}
      )`;
    connection.query(sql, function (err, result) {
      if (err) throw err;
      console.log("Number of records inserted: " + result.affectedRows);
    })
    res.send("new pokestop added successfully")

  }

})

app.use((err, req, res, next ) => {
  // err = err || new Error("Internal Server Error");
  if (err) { console.log(err)}
  res.status( err.status || 500);
  res.json({ error: err.message });
});
app.listen(8080, () => {
  console.log('listening on http://localhost:8080');
});