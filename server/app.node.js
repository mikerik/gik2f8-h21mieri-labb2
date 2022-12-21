
const http = require('http');


const server = http.createServer((req, res) => {
  
  console.log(http.METHODS);

  

  
  const statusCode = 425;
  
  res.writeHead(statusCode);
  
  res.end(`Du gjorde ett ${req.method}-anrop till ${req.url}`);
});


server.listen('5678', () =>
  console.log('Server running on http://localhost:5678')
);
