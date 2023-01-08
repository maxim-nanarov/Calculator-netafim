const express = require('express');
const sqlite3 = require('sqlite3');

const app = express();

// Connect to the database
const db = new sqlite3.Database('../DB/test.db', (err) => {
  if (err) {
    console.error(err.message);
  } else {
    console.log('Connected to the database.');
  }
});

app.use(function (req, res, next) {
  res.header('Access-Control-Allow-Origin', 'http://localhost:1212');
  res.header(
    'Access-Control-Allow-Headers',
    'Origin, X-Requested-With, Content-Type, Accept'
  );
  next();
});

// Define a route for retrieving data from the database
//(the request here are gettting data from the tables)
app.get('/Drippers', (req, res, next) => {
  const SelectDrippers = 'SELECT * FROM Drippers;';
  db.all(SelectDrippers, (err, rows) => {
    if (err) {
      console.error(err.message);
      res.send({ success: false, error: err.message });
    } else {
      res.send({ success: true, data: rows });
    }
  });
});

app.get('/Pipes', (req, res, next) => {
  const SPipes = 'SELECT * FROM Pipes;';
  db.all(SPipes, (err, rows) => {
    if (err) {
      console.error(err.message);
      res.send({ success: false, error: err.message });
    } else {
      res.send({ success: true, data: rows });
    }
  });
});

app.get('/Dripper_Pipes', (req, res, next) => {
  const SelectDrippers = 'SELECT * FROM Dripper_Pipes;';
  db.all(SelectDrippers, (err, rows) => {
    if (err) {
      console.error(err.message);
      res.send({ success: false, error: err.message });
    } else {
      res.send({ success: true, data: rows });
    }
  });
});

app.get('/DData', (req, res, next) => {
  const SelectDrippers = 'SELECT * FROM Drippers_data;';
  db.all(SelectDrippers, (err, rows) => {
    if (err) {
      console.error(err.message);
      res.send({ success: false, error: err.message });
    } else {
      res.send({ success: true, data: rows });
    }
  });
});
//more complicated request that is made for the select
//calculator:

app.get('/Get_Relevent_Pipes', (req, res) => {
  const id = req.query.id;
  let sql = `Select * from Pipes Where Models IN (Select Models from Dripper_Pipes Where dripper_id = ${id})`;
  db.all(sql, (err, rows) => {
    if (err) {
      console.log(err);
      res.send({ success: false, error: err.message });
    } else {
      res.send({ success: true, data: rows });
    }
  });
});

// Start the server
app.listen(3000, () => {
  console.log('Server listening on port 3000. (http://localhost:3000/users)');
});
