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
      
      res.write(`
        <html>
          <head>
            <title>Welcome Home</title>
          </head>
          <body>
            ${latestMessage ? `<p>${latestMessage}</p>` : "<p>No messages yet</p>"}
            <h2>Add Message:</h2>
            <form action="/message" method="POST">
              <input type="text" name="message"><br><br>
              <button type="submit">Submit</button>
            </form>
          </body>
        </html>
      `);
      
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
    res.write(`
      <html>
        <head>
          <title>Page Not Found</title>
        </head>
        <body>
          <p>404 - Page Not Found</p>
        </body>
      </html>
    `);
    res.end();
  }
});

const port = 4002;
server.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
