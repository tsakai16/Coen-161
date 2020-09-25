const fs = require('fs');

exports.handleTodoList = function(req, res, session) {
  switch(req.method) {
    case "GET":
        fs.readFile(`./sessions/${session.id}`, (err, data) => {
          let fileSession = null;
          if (err) {
            session.todoList = [];
          }
          session.todoList = JSON.parse(data).todoList;

          if(!session.todoList){
            session.todoList = [];
          }
          let objArr = [];
          for(var i = 0; i < session.todoList.length; i++) {
            objArr.push({id: i, description:session.todoList[i]});
          }
          
          res.writeHead(200, {'Content-Type': 'application/json'});
          res.end(JSON.stringify(objArr));
        });
      break;
    case "POST":
      if(!session.todoList){
        session.todoList = [];
      }
      convertRequest(req, data => {
        session.todoList.push(data.todo);
        fs.writeFile(`./sessions/${session.id}`, JSON.stringify(session), err =>{
          if(err) {
            res.writeHead(500, {'Content-Type': 'text/html'});
            return res.end("500 Internal Server Error");
          }
                res.writeHead(200, 'OK');
      res.end();
        });
      });
      break;
    default:
      res.writeHead(405, {'Allow': 'GET, POST'});
      res.end("Not Allowed");
  }
};

/*
  converts the HTTP POST request body into a JSON object
*/
function convertRequest(req, callback) {
  let data = "";
  req.on('data', chunk => {
    data += chunk.toString();
  });
  req.on('end', () => {
    callback(JSON.parse(data));
  });
}