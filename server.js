const express = require('express');
const mysql = require('mysql');
const factory = require('./factory');
const bodyParser = require('body-parser');
const cors = require('cors');


const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'password',
  // database: 'first_tester',
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
  // console.log('req: ', req);
  factory.addTaskToDatabase({
    id: req.body.id,
    task: req.body.task,
    reward: req.body.reward,
  })
  .then((something) => {
    console.log('something:',something);
    res.send(something)
  })
})

app.get('/testRoute', (req, res) => {
  res.send({"testKey":"testValue"})
})

app.use((err, req, res, next ) => {
  err = err || new Error("Internal Server Error");
  res.status( err.status || 500);
  res.json({ error: err.message });
});
app.listen(8080, () => {
  console.log('listening on 8080');
});