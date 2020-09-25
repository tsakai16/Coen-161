const mysql = require('mysql');

// fill in your db credentials erased this part for privacy
const config = {
  host: "dbserver.engr.scu.edu",
  user: "",
  password: "", //erased
  database: "sdb_"
};

exports.addTodo = function (sessionId, todo, callback) {
  const con = mysql.createConnection(config);
  // call con.connect();
  con.connect(err => {
    if(err) {
      return callback(err);
    }
    const sql = "INSERT INTO Todos (description, session Id) VALUES (?, ?)";
    con.query(sql, [todo, sessionId], err => {
      callback(err);
      con.end();
    });
  });
};

exports.getTodos = function (sessionId, callback) {
  const con = mysql.createConnection(config);
  // call con.connect();  
  con.connect(err => {
    if(err) {
      return callback(err);
    }
    const sql = 'SELECT * FROM Todos WHERE sessionID = ?';
    con.query(sql, [sessionId],(err, results, fields) =>{
      callback(err, results);
      con.end();
    });
  });
};