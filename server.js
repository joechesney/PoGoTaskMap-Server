const express =require('express');

const app = express();
const mysql = require('mysql');

const con = mysql.createConnection({
  host: "localhost",
  user: "admin",
  password: "admin"
});

con.connect(function(err) {
  if (err) throw err;
  console.log("Connected!");
});

app.use(express.static('public'));


app.listen(8080);