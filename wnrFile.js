const http = require('http');
const fs = require('fs');

const server = http.createServer((req, res) => {
  const url = req.url;
  
  if (url === "/home") {
    fs.readFile('messages.txt', 'utf8', (err, data) => {
      if (err) {
        console.error(err);
        res.statusCode = 500;
        res.end();
        return;
      }
      
      const messages = data ? data.split('\n') : [];
      const latestMessage = messages[messages.length - 2]; // Get the latest message
      
      res.write("<html>");
      res.write("<head><title>Welcome Home</title></head>");
      res.write("<body>");
      
      //res.write("<h2>Latest Message:</h2>");
      if (latestMessage) {
        res.write(`<p>${latestMessage}</p>`);
      } else {
        res.write("<p>No messages yet</p>");
      }
      
      res.write("<h2>Add Message:</h2>");
      res.write("<form action=\"/message\" method=\"POST\">");
      res.write("<input type=\"text\" name=\"message\"><br><br>");
      res.write("<button type=\"submit\">Submit</button>");
      res.write("</form>");
      
      res.write("</body>");
      res.write("</html>");
      res.end();
    });
  }
  else if (url === "/message" && req.method === "POST") {
    let body = '';
    
    req.on('data', (chunk) => {
      body += chunk;
    });
    
    req.on('end', () => {
      const message = decodeURIComponent(body.replace("message=", ""));
      
      fs.appendFile('messages.txt', message + '\n', (err) => {
        if (err) {
          console.error(err);
          res.statusCode = 500;
          res.end();
          return;
        }
        
        res.statusCode = 302;
        res.setHeader('Location', '/home');
        res.end();
      });
    });
  }
  else {
    res.statusCode = 404;
    res.write("<html>");
    res.write("<head><title>Page Not Found</title></head>");
    res.write("<body><p>404 - Page Not Found</p></body>");
    res.write("</html>");
    res.end();
  }
});

const port = 4002;
server.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
