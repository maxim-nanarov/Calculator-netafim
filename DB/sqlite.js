const { OPEN_READWRITE, OPEN_CREATE } = require('sqlite3');
const sqlite3 = require('sqlite3').verbose();

// Connect to DB
module.exports = {
  db: new sqlite3.Database('./test.db', OPEN_READWRITE | OPEN_CREATE, (err) => {
    const db = new sqlite3.Database(':memory:', OPEN_READWRITE, (err) => {
      if (err) {
        console.log('Could not connect to database', err.message);
      } else {
        console.log('Connected to database');
      }
    });
  }),
};

db.serialize(async () => {
  // Create table
  let sql = `CREATE TABLE IF NOT EXISTS Pipes (PIPES INTEGER PRIMARY KEY, MAX_PRESSURE INTERGER, KD INTERGER)`;
  let sql2 = `CREATE TABLE IF NOT EXISTS Drippers (id INTEGER PRIMARY KEY, k INTERGER, X INTERGER, MAX_PRESSURE INTERGER, PIPES INTERGER, FOREIGN KEY (PIPES) REFERENCES Persons(PIPES))`;
  db.run(sql);
  db.run(sql2);

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
