const http = require('http');

const server = http.createServer((req, res) => {
  //res.statusCode = 200;
  res.setHeader('Content-Type', 'text/html');
  res.write("<html>")
  res.write("<head><title>my first page</title></head>")
  res.write("<body><p>hello from my nodejs server</p>,/body>"); 
  res.write("</html>")
  res.end()
  //console.log('My name is being logged'); // This will be logged in the console when the server is accessed
});

const port = 4001;
server.listen(port)
