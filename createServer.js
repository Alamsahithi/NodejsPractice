const http = require('http');

const server = http.createServer((req, res) => {
  res.statusCode = 200;
  res.setHeader('Content-Type', 'text/plain');
  res.end('My name is sahi'); // Replace 'ChatGPT' with your name

  console.log('My name is being logged'); // This will be logged in the console when the server is accessed
});

const port = 4001;
server.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
