var path = require('path');
var express = require('express');
var sqlite3 = require('sqlite3');
var cors = require('cors');
var bodyParser = require('body-parser');
var App = express();
//suppose to be the window directory to the data base:
// let Path = path.join('win-unpacked', 'resources', 'test');
//
//suppose to be the Linux directory to the data base:
// let Path = path.join('./', 'linux-unpacked', 'resources', 'test.db');
//
//this is the localy directory of the database:
var Path = path.join('../../../', 'assets', 'DB', 'test.db');
//assets/DB/test.db
//In order to package for windows:  --win --x64
//need to insert it to the json file in the package command
var db = new sqlite3.Database(Path, function (err) {
    if (err) {
        console.log(err.message);
    }
    else {
        console.log('Connected to the database.');
    }
});
App.use(cors({
    origin: 'http://localhost:1212',
    methods: ['GET', 'PUT', 'POST']
}));
// parse application/x-www-form-urlencoded
App.use(bodyParser.urlencoded({ extended: false }));
// parse application/json
App.use(bodyParser.json());
App.use(function (req, res, next) {
    res.header('Access-Control-Allow-Origin', 'http://localhost:1212');
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
    next();
});
// Define a route for retrieving data from the database
//(the request here are gettting data from the tables)
App.get('/Drippers', function (req, res, next) {
    var SelectDrippers = 'SELECT * FROM Drippers;';
    db.all(SelectDrippers, function (err, rows) {
        if (err) {
            console.error(err.message);
            res.send({ success: false, error: err.message });
        }
        else {
            res.send({ success: true, data: rows });
        }
    });
});
App.get('/Pipes', function (req, res, next) {
    var SPipes = 'SELECT * FROM Pipes ORDER BY Models;';
    db.all(SPipes, function (err, rows) {
        if (err) {
            console.error(err.message);
            res.send({ success: false, error: err.message });
        }
        else {
            res.send({ success: true, data: rows });
        }
    });
});
//SELECT * FROM table_name ORDER BY column_name ASC|DESC
App.get('/Dripper_Pipes', function (req, res, next) {
    var SelectDrippers = 'SELECT * FROM Dripper_Pipes ORDER BY Dripper_Id ;';
    db.all(SelectDrippers, function (err, rows) {
        if (err) {
            console.error(err.message);
            res.send({ success: false, error: err.message });
        }
        else {
            res.send({ success: true, data: rows });
        }
    });
});
App.get('/DData', function (req, res, next) {
    var SelectDrippers = 'SELECT * FROM Drippers_data;';
    db.all(SelectDrippers, function (err, rows) {
        if (err) {
            console.error(err.message);
            res.send({ success: false, error: err.message });
        }
        else {
            res.send({ success: true, data: rows });
        }
    });
});
//more complicated request that is made for the select
//calculator:
App.get('/Get_Relevent_Pipes', function (req, res) {
    var id = req.query.id;
    var sql = "Select * from Pipes Where Models IN (Select Pipe_Model from Dripper_Pipes Where Dripper_id = ".concat(id, ");");
    db.all(sql, function (err, rows) {
        if (err) {
            console.log(err);
            res.send({ success: false, error: err.message });
        }
        else {
            console.log(rows);
            res.send({ success: true, data: rows });
        }
    });
});
//gets specifed data for the select page so the user
//will select the data he wants to use
App.get('/Get_Specified_Data', function (req, res) {
    var id = req.query.id;
    var sql = "SELECT * FROM Drippers_Data Where Dripper_id = ".concat(req.query.id, ";");
    db.all(sql, function (err, rows) {
        if (err) {
            res.send({ success: false, error: err.message });
        }
        else {
            res.send({ success: true, data: rows });
        }
    });
});
//gets the kd in corolation to the dripper id and the
// pipe model
App.get('/Get_Kd_DripperId_PipeModel', function (req, res) {
    var id = req.query.Dripper_id;
    var model = req.query.Model;
    console.log(id, model);
    var sql = "SELECT kd FROM DRIPPER_PIPES where Dripper_id = ".concat(id, " AND Pipe_Model = ").concat(model);
    db.all(sql, function (err, rows) {
        if (err) {
            res.send({ success: false, error: err });
        }
        else {
            res.send({ success: true, data: rows });
        }
    });
});
//Crud Functions to the DRIPPER PIPES table
App.post('/Update_Dripper_Pipes', function (req, res) {
    console.log(req.body);
    var id = req.body.id;
    var Dripper_id = req.body.Dripper_id;
    var Pipe_Model = req.body.Pipe_Model;
    var kd = req.body.kd;
    var sql = "UPDATE DRIPPER_PIPES SET Dripper_id=".concat(Dripper_id, ", Pipe_Model=").concat(Pipe_Model, ", kd=").concat(kd, " WHERE id = ").concat(id);
    db.all(sql, function (err, rows) {
        if (err) {
            res.send({ success: false, error: err.message });
        }
        else {
            res.send({ success: true, data: rows });
        }
    });
});
App.post('/Insert_Into_Dripper_Pipes', function (req, res) {
    console.log(req.body);
    var Dripper_Id = req.body.Dripper_Id;
    var Pipe_Model = req.body.Pipe_Model;
    var kd = req.body.kd;
    console.log(Dripper_Id, Pipe_Model);
    var id = 0;
    db.all("SELECT id FROM Dripper_Pipes order by id desc limit 1", function (err, row) {
        if (err) {
            console.log(err);
        }
        else {
            console.log(row[0].id + 1);
            id = row[0].id + 1;
            console.log('id: ' + id);
            var sql = "INSERT INTO DRIPPER_PIPES (id,Dripper_id, Pipe_Model,kd) VALUES (".concat(id, ",").concat(Dripper_Id, ",").concat(Pipe_Model, ",").concat(kd, ")");
            db.all(sql, function (err, rows) {
                if (err) {
                    res.send({ success: false, error: err.message });
                }
                else {
                    res.send({ success: true });
                }
            });
        }
    });
});
App.post('/Delete_From_Dripper_Pipes', function (req, res) {
    console.log(req.body);
    var id = req.body.id;
    var sql = "DELETE FROM DRIPPER_PIPES WHERE id = ".concat(id);
    db.all(sql, function (err, rows) {
        if (err) {
            res.send({ success: false, error: err.message });
        }
        res.send({ success: true });
    });
});
//Crud Functions to the Dripper Data Table
App.post('/Update_Drippers_Data', function (req, res) {
    console.log(req.body);
    var data = req.body.data.Edit;
    var sql = "UPDATE Drippers_Data SET Dripper_Id=".concat(data.Dripper_id, ", flow_rate=").concat(data.flow_rate, ", k=").concat(data.k, ", Pressure=").concat(data.Pressure, ", Exponent=").concat(data.Exponent, " WHERE Data_id = ").concat(data.Data_id);
    db.all(sql, function (err, rows) {
        console.log(err);
        if (err) {
            res.send({ success: false, error: err.message });
        }
        else {
            res.send({ success: true, data: rows });
        }
    });
});
App.post('/Insert_Into_Dripper_Data', function (req, res) {
    console.log(req.body.data.formData);
    var data = req.body.data.formData;
    console.log('Dripper ID: ' + data.Dripper_Id);
    var id = 0;
    db.all("SELECT Data_id FROM Drippers_Data order by Data_id desc limit 1", function (err, row) {
        if (err) {
            console.log(err);
        }
        else {
            console.log(row[0].Data_id + 1);
            id = row[0].Data_id + 1;
            console.log('id: ' + id);
            var sql = "INSERT INTO Drippers_Data (Data_id,Dripper_id, flow_rate,k,Pressure,Exponent) VALUES (".concat(id, ",").concat(data.Dripper_Id, ",").concat(data.Flow_Rate, ",").concat(data.Coefficency, ",").concat(data.Pressure, ",").concat(data.Exponent, ")");
            db.all(sql, function (err, rows) {
                if (err) {
                    res.send({ success: false, error: err.message });
                }
                else {
                    res.send({ success: true });
                }
            });
        }
    });
});
App.post('/Delete_From_Dripper_Data', function (req, res) {
    var Data_id = req.body.id;
    console.log(Data_id);
    var sql = "DELETE FROM Drippers_Data WHERE Data_id = ".concat(Data_id);
    db.all(sql, function (err, rows) {
        if (err) {
            res.send({ success: false, error: err.message });
        }
        else {
            res.send({ success: true });
        }
    });
});
//Crud functions to the Pipes Tables
App.post('/Insert_Into_Pipes', function (req, res) {
    console.log(req.body.data.formData);
    var data = req.body.data.formData;
    console.log('does it even enter?');
    var sql = "INSERT INTO PIPES (Models,Diameter,Pressure) VALUES(".concat(data.Model, ",").concat(data.Diameter, ",").concat(data.Pressure, ");");
    db.all(sql, function (err, rows) {
        if (err) {
            res.send({ success: false, error: err.message });
        }
        else {
            console.log('Worked');
            res.send({ success: true });
        }
    });
});
App.post('/Delete_From_Pipes', function (req, res) {
    var Model = req.body.Model;
    console.log(Model);
    var sql = "DELETE FROM Pipes WHERE Models = ".concat(Model);
    db.all(sql, function (err, rows) {
        if (err) {
            res.send({ success: false, error: err.message });
        }
        else {
            res.send({ success: true });
        }
    });
});
App.post('/Update_Pipes', function (req, res) {
    var data = req.body.Edited;
    console.log(data);
    var sql = "UPDATE PIPES SET  DIAMETER=".concat(data.Diameter, ", Pressure=").concat(data.Pressure, " WHERE Models=").concat(data.Models, ";");
    db.all(sql, function (err, rows) {
        if (err) {
            res.send({ success: false, error: err.message });
        }
        else {
            res.send({ success: true });
        }
    });
});
//Crud functions to the Dripper Tables
App.post('/Insert_Into_Dripper', function (req, res) {
    console.log(req.body);
    var data = req.body.formData;
    var id = 0;
    db.all("SELECT id FROM Drippers order by id desc limit 1", function (err, row) {
        if (err) {
            res.send({ success: false, error: err.message });
        }
        else {
            console.log(row[0].id + 1);
            id = row[0].id + 1;
            console.log('id: ' + id);
            console.log(data.Name);
            var sql = "INSERT INTO Drippers (id,Dripper_Type) VALUES ('".concat(id, "','").concat(data.Name, "');");
            db.all(sql, function (err, rows) {
                if (err) {
                    res.send({ success: false, error: err.message });
                }
                else {
                    res.send({ success: true });
                }
            });
        }
    });
});
App.post('/Delete_from_Dripper', function (req, res) {
    var index = req.body.Index;
    console.log(req.body.Index);
    var sql = "DELETE FROM DRIPPERS WHERE id=".concat(index);
    db.all(sql, function (err, row) {
        if (err) {
            res.send({ success: false, error: err.message });
        }
        else {
            res.send({ success: true });
        }
    });
});
App.post('/Update_Dripper', function (req, res) {
    var data = req.body;
    console.log(data.Edited);
    var sql = "UPDATE DRIPPERS SET DRIPPER_TYPE='".concat(data.Edited.Dripper_Type, "' Where id='").concat(data.Edited.id, "';");
    db.all(sql, function (err, rows) {
        if (err) {
            res.send({ success: false, error: err.message });
        }
        else {
            res.send({ success: true });
        }
    });
});
// Start the server
App.listen(3000, function () {
    console.log('Server listening on port 3000. (http://localhost:3000/users)');
});
