const { OPEN_READWRITE, OPEN_CREATE } = require('sqlite3');
const sqlite3 = require('sqlite3').verbose();

// Connect to DB
// module.exports = {
const db = new sqlite3.Database(
  './test.db',
  OPEN_READWRITE | OPEN_CREATE,
  (err) => {
    // const db = new sqlite3.Database(':memory:', OPEN_READWRITE, (err) => {
    if (err) {
      console.log('Could not connect to database', err.message);
    } else {
      console.log('Connected to database');
    }
  }
);
// }),
// };

db.serialize(async () => {
  // Create table
  // let sql = `CREATE TABLE IF NOT EXISTS Drippers(
  //   id INTERGER PRIMARY KEY,
  //   Dripper_Type STRING);`;
  // let sql2 = `CREATE TABLE IF NOT EXISTS Pipes(
  //     Models INTERGER PRIMARY KEY,
  //     Diameter INTERGER,
  //     Pressure INTERGER,
  //     kd INTERGER);`;
  // let sql3 = `CREATE TABLE IF NOT EXISTS Dripper_Pipes(
  //       id INTERGER PRIMARY KEY,
  //       Dripper_id INTERGER,
  //       Pipe_Model INTERGER,
  //       foreign key (Dripper_id) References Drippers(id) ON DELETE CASCADE ON UPDATE CASCADE,
  //       foreign key (Pipe_Model) References Pipes(Models) ON DELETE CASCADE ON UPDATE CASCADE);`;
  // let sql4 = `CREATE TABLE IF NOT EXISTS Drippers_data(
  //         Data_id INTERGER PRIMARY KEY,
  //         Dripper_id Interger,
  //         flow_rate Interger,
  //         k INTERGER,
  //         Pressure INTERGER,
  //         foreign key (Dripper_id) References Drippers(id) ON DELETE CASCADE ON UPDATE CASCADE);`;
  // db.run(sql);
  // db.run(sql2);
  // db.run(sql3);
  // db.run(sql4);
  // let sql = `INSERT INTO Drippers VALUES('0','UniRam')`;
  // let sql = `INSERT INTO PIPES VALUES ('16009','14.2','3.0','1.3'),('16010','14.2','3.5','1.3'),('16011','14.2','3.5','1.3'),('16012','14.2','4.0','1.3'),('20011','17.5','3.5','0.4'),('20012','17.5','4.0','0.4');`;
  // let sql = `INSERT INTO DRIPPERS_DATA VALUES('0','0','0.7','0','0.7'),('1','0','1','0','1'),('2','0','1.6','0','1.6'),('3','0','2.3','0','2.3'),('4','0','3.5','0','3.5');`;
  let sql = `INSERT INTO Dripper_Pipes Values ('0','0','16009'),('1','0','16010'),('2','0','16011'),('3','0','16012'),('4','0','20010'),('5','0','20012');`;
  db.run(sql);
  // db.run(sql2);
  // Insert to table
  //   sql = `INSERT INTO Pipes `;
  //   let statements = [
  //     ['Jerusalem', 'Center', 30, 19, '2022-07-18'],
  //     ['Tel Aviv', 'Center', 30, 25, '2022-07-18'],
  //     ['Haifa', 'North', 28, 22, '2022-07-18'],
  //     ['Beer Sheva', 'South', 33, 22, '2022-07-18'],
  //     ['Eilat', 'South', 38, 24, '2022-07-18'],
  //     ['Rehovot', 'North', 31, 24, '2022-07-18'],
  //   ];
  //   const stmt = db.prepare(sql);
  //   for (let i = 0; i < statements.length; i++) {
  //     stmt.run(statements[i], (err) => {
  //       if (err) return console.log(err.message);
  //     });
  //   }
  //   stmt.finalize();
  //   // Query table
  //   sql = `SELECT * from weather`;
  //   db.all(sql, [], (err, rows) => {
  //     if (err) return console.log(err.message);
  //     rows.forEach((row) => {
  //       console.log(row);
  //     });
  //   });
  //   // Drop table
  // sql = `DROP TABLE Drippers`;
  // let result = db.run(sql);
  // if (result.error === null) {
  //   console.log('it all worked');
  // } else {
  //   console.log('nope');
  // }
});

db.close();
