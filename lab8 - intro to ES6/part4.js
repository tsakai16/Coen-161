var http = require('http');

http.createServer(function(req, res) {
	res.writeHead(200, { 'Content-Type': 'text/html' });

	// your code here
	var fs = requere("fs");
	fs.appendFile("theNewestOfNewFiles.txt", http, function(err){
		if(err) throw err;
	});
	res.write("hello world!");	
  res.end();
}).listen(3000);
