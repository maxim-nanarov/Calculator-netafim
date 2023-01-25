const path = require('path');
const express = require('express');
const sqlite3 = require('sqlite3');
const cors = require('cors');
const bodyParser = require('body-parser');
const App = express();
//suppose to be the window directory to the data base:
// let Path = path.join('win-unpacked', 'resources', 'test');
//
//suppose to be the Linux directory to the data base:
// let Path = path.join('./', 'linux-unpacked', 'resources', 'test.db');
//
//this is the localy directory of the database:
let Path = path.join('../../../', 'assets', 'DB', 'test.db');
//assets/DB/test.db
//In order to package for windows:  --win --x64
//need to insert it to the json file in the package command
const db = new sqlite3.Database(Path, (err: any) => {
  if (err) {
    console.log(err.message);
  } else {
    console.log('Connected to the database.');
  }
});

App.use(
  cors({
    origin: 'http://localhost:1212',
    methods: ['GET', 'PUT', 'POST'],
  })
);

// parse application/x-www-form-urlencoded
App.use(bodyParser.urlencoded({ extended: false }));

// parse application/json
App.use(bodyParser.json());
App.use(function (req: any, res: any, next: any) {
  res.header('Access-Control-Allow-Origin', 'http://localhost:1212');
  res.header(
    'Access-Control-Allow-Headers',
    'Origin, X-Requested-With, Content-Type, Accept'
  );
  next();
});

// Define a route for retrieving data from the database
//(the request here are gettting data from the tables)
App.get('/Drippers', (req: any, res: any, next: any) => {
  const SelectDrippers = 'SELECT * FROM Drippers;';
  db.all(SelectDrippers, (err: any, rows: any) => {
    if (err) {
      console.error(err.message);
      res.send({ success: false, error: err.message });
    } else {
      res.send({ success: true, data: rows });
    }
  });
});

App.get('/Pipes', (req: any, res: any, next: any) => {
  const SPipes = 'SELECT * FROM Pipes ORDER BY Models;';
  db.all(SPipes, (err: any, rows: any) => {
    if (err) {
      console.error(err.message);
      res.send({ success: false, error: err.message });
    } else {
      res.send({ success: true, data: rows });
    }
  });
});
//SELECT * FROM table_name ORDER BY column_name ASC|DESC
App.get('/Dripper_Pipes', (req: any, res: any, next: any) => {
  const SelectDrippers = 'SELECT * FROM Dripper_Pipes ORDER BY Dripper_Id ;';
  db.all(SelectDrippers, (err: any, rows: any) => {
    if (err) {
      console.error(err.message);
      res.send({ success: false, error: err.message });
    } else {
      res.send({ success: true, data: rows });
    }
  });
});

App.get('/DData', (req: any, res: any, next: any) => {
  const SelectDrippers = 'SELECT * FROM Drippers_data;';
  db.all(SelectDrippers, (err: any, rows: any) => {
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
App.get('/Get_Relevent_Pipes', (req: any, res: any) => {
  const id = req.query.id;
  let sql = `Select * from Pipes Where Models IN (Select Pipe_Model from Dripper_Pipes Where Dripper_id = ${id});`;
  db.all(sql, (err: any, rows: any) => {
    if (err) {
      console.log(err);
      res.send({ success: false, error: err.message });
    } else {
      console.log(rows);
      res.send({ success: true, data: rows });
    }
  });
});
//gets specifed data for the select page so the user
//will select the data he wants to use
App.get('/Get_Specified_Data', (req: any, res: any) => {
  const id = req.query.id;
  let sql = `SELECT * FROM Drippers_Data Where Dripper_id = ${req.query.id};`;
  db.all(sql, (err: any, rows: any) => {
    if (err) {
      res.send({ success: false, error: err.message });
    } else {
      res.send({ success: true, data: rows });
    }
  });
});
//gets the kd in corolation to the dripper id and the
// pipe model
App.get('/Get_Kd_DripperId_PipeModel', (req: any, res: any) => {
  const id = req.query.Dripper_id;
  const model = req.query.Model;
  console.log(id, model);
  let sql = `SELECT kd FROM DRIPPER_PIPES where Dripper_id = ${id} AND Pipe_Model = ${model}`;
  db.all(sql, (err: any, rows: any) => {
    if (err) {
      res.send({ success: false, error: err });
    } else {
      res.send({ success: true, data: rows });
    }
  });
});
//Crud Functions to the DRIPPER PIPES table
App.post('/Update_Dripper_Pipes', (req: any, res: any) => {
  console.log(req.body);
  const id = req.body.id;
  const Dripper_id = req.body.Dripper_id;
  const Pipe_Model = req.body.Pipe_Model;
  const kd = req.body.kd;

  let sql = `UPDATE DRIPPER_PIPES SET Dripper_id=${Dripper_id}, Pipe_Model=${Pipe_Model}, kd=${kd} WHERE id = ${id}`;
  db.all(sql, (err: any, rows: any) => {
    if (err) {
      res.send({ success: false, error: err.message });
    } else {
      res.send({ success: true, data: rows });
    }
  });
});

App.post('/Insert_Into_Dripper_Pipes', (req: any, res: any) => {
  console.log(req.body);
  const Dripper_Id = req.body.Dripper_Id;
  const Pipe_Model = req.body.Pipe_Model;
  const kd = req.body.kd;
  console.log(Dripper_Id, Pipe_Model);
  let id = 0;
  db.all(
    `SELECT id FROM Dripper_Pipes order by id desc limit 1`,
    (err: any, row: any) => {
      if (err) {
        console.log(err);
      } else {
        console.log(row[0].id + 1);
        id = row[0].id + 1;
        console.log('id: ' + id);
        let sql = `INSERT INTO DRIPPER_PIPES (id,Dripper_id, Pipe_Model,kd) VALUES (${id},${Dripper_Id},${Pipe_Model},${kd})`;
        db.all(sql, (err: any, rows: any) => {
          if (err) {
            res.send({ success: false, error: err.message });
          } else {
            res.send({ success: true });
          }
        });
      }
    }
  );
});

App.post('/Delete_From_Dripper_Pipes', (req: any, res: any) => {
  console.log(req.body);
  const id = req.body.id;

  let sql = `DELETE FROM DRIPPER_PIPES WHERE id = ${id}`;
  db.all(sql, (err: any, rows: any) => {
    if (err) {
      res.send({ success: false, error: err.message });
    }
    res.send({ success: true });
  });
});
//Crud Functions to the Dripper Data Table
App.post('/Update_Drippers_Data', (req: any, res: any) => {
  console.log(req.body);
  const data = req.body.data.Edit;

  let sql = `UPDATE Drippers_Data SET Dripper_Id=${data.Dripper_id}, flow_rate=${data.flow_rate}, k=${data.k}, Pressure=${data.Pressure}, Exponent=${data.Exponent} WHERE Data_id = ${data.Data_id}`;
  db.all(sql, (err: any, rows: any) => {
    console.log(err);
    if (err) {
      res.send({ success: false, error: err.message });
    } else {
      res.send({ success: true, data: rows });
    }
  });
});

App.post('/Insert_Into_Dripper_Data', (req: any, res: any) => {
  console.log(req.body.data.formData);
  const data = req.body.data.formData;
  console.log('Dripper ID: ' + data.Dripper_Id);
  let id = 0;
  db.all(
    `SELECT Data_id FROM Drippers_Data order by Data_id desc limit 1`,
    (err: any, row: any) => {
      if (err) {
        console.log(err);
      } else {
        console.log(row[0].Data_id + 1);
        id = row[0].Data_id + 1;
        console.log('id: ' + id);
        let sql = `INSERT INTO Drippers_Data (Data_id,Dripper_id, flow_rate,k,Pressure,Exponent) VALUES (${id},${data.Dripper_Id},${data.Flow_Rate},${data.Coefficency},${data.Pressure},${data.Exponent})`;
        db.all(sql, (err: any, rows: any) => {
          if (err) {
            res.send({ success: false, error: err.message });
          } else {
            res.send({ success: true });
          }
        });
      }
    }
  );
});

App.post('/Delete_From_Dripper_Data', (req: any, res: any) => {
  const Data_id = req.body.id;
  console.log(Data_id);
  let sql = `DELETE FROM Drippers_Data WHERE Data_id = ${Data_id}`;
  db.all(sql, (err: any, rows: any) => {
    if (err) {
      res.send({ success: false, error: err.message });
    } else {
      res.send({ success: true });
    }
  });
});
//Crud functions to the Pipes Tables
App.post('/Insert_Into_Pipes', (req: any, res: any) => {
  console.log(req.body.data.formData);
  let data = req.body.data.formData;
  console.log('does it even enter?');
  let sql = `INSERT INTO PIPES (Models,Diameter,Pressure) VALUES(${data.Model},${data.Diameter},${data.Pressure});`;
  db.all(sql, (err: any, rows: any) => {
    if (err) {
      res.send({ success: false, error: err.message });
    } else {
      console.log('Worked');
      res.send({ success: true });
    }
  });
});

App.post('/Delete_From_Pipes', (req: any, res: any) => {
  const Model = req.body.Model;
  console.log(Model);
  let sql = `DELETE FROM Pipes WHERE Models = ${Model}`;
  db.all(sql, (err: any, rows: any) => {
    if (err) {
      res.send({ success: false, error: err.message });
    } else {
      res.send({ success: true });
    }
  });
});

App.post('/Update_Pipes', (req: any, res: any) => {
  let data = req.body.Edited;
  console.log(data);
  let sql = `UPDATE PIPES SET  DIAMETER=${data.Diameter}, Pressure=${data.Pressure} WHERE Models=${data.Models};`;
  db.all(sql, (err: any, rows: any) => {
    if (err) {
      res.send({ success: false, error: err.message });
    } else {
      res.send({ success: true });
    }
  });
});
//Crud functions to the Dripper Tables
App.post('/Insert_Into_Dripper', (req: any, res: any) => {
  console.log(req.body);
  const data = req.body.formData;
  let id = 0;
  db.all(
    `SELECT id FROM Drippers order by id desc limit 1`,
    (err: any, row: any) => {
      if (err) {
        res.send({ success: false, error: err.message });
      } else {
        console.log(row[0].id + 1);
        id = row[0].id + 1;
        console.log('id: ' + id);
        console.log(data.Name);
        let sql = `INSERT INTO Drippers (id,Dripper_Type) VALUES ('${id}','${data.Name}');`;
        db.all(sql, (err: any, rows: any) => {
          if (err) {
            res.send({ success: false, error: err.message });
          } else {
            res.send({ success: true });
          }
        });
      }
    }
  );
});
App.post('/Delete_from_Dripper', (req: any, res: any) => {
  let index = req.body.Index;
  console.log(req.body.Index);
  let sql = `DELETE FROM DRIPPERS WHERE id=${index}`;
  db.all(sql, (err: any, row: any) => {
    if (err) {
      res.send({ success: false, error: err.message });
    } else {
      res.send({ success: true });
    }
  });
});
App.post('/Update_Dripper', (req: any, res: any) => {
  let data = req.body;
  console.log(data.Edited);
  let sql = `UPDATE DRIPPERS SET DRIPPER_TYPE='${data.Edited.Dripper_Type}' Where id='${data.Edited.id}';`;
  db.all(sql, (err: any, rows: any) => {
    if (err) {
      res.send({ success: false, error: err.message });
    } else {
      res.send({ success: true });
    }
  });
});
// Start the server
App.listen(3000, () => {
  console.log('Server listening on port 3000. (http://localhost:3000/users)');
});
