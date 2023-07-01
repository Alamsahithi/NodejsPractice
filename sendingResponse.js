const http = require('http');

const server = http.createServer((req, res) => {
  //res.statusCode = 200;
  const url=req.url
  if(url==="/home"){
    res.write("<html>")
  res.write("<head><title>welcome home</title></head>")
  //res.write("<body>form action="/message" method="POST"><input type="text" name="message"></body>"); 
  res.write("</html>")
  res.end()
  }
  if(url==="/about"){
    res.write("<html>")
  res.write("<head><title>welcome to about us page</title></head>")
  //res.write("<body>form action="/message" method="POST"><input type="text" name="message"></body>"); 
  res.write("</html>")
  res.end()
  }
  if(url==="/node"){
  res.setHeader('Content-Type', 'text/html');
  res.write("<html>")
  res.write("<head><title>my first page</title></head>")
  res.write("<body><p>welcome to my node js project</p></body>"); 
  res.write("</html>")
  res.end()
  }
  //console.log('My name is being logged'); // This will be logged in the console when the server is accessed
});

const port = 3001
server.listen(port, () => {
    console.log(`Server running on port ${port}`);
  })
