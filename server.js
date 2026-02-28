const http = require('http');
const fs = require('fs');
const path = require('path');

const PORT = process.env.PORT || 3000;

const MIME = {
  '.html': 'text/html',
  '.css':  'text/css',
  '.js':   'application/javascript',
  '.json': 'application/json',
  '.png':  'image/png',
  '.jpg':  'image/jpeg',
  '.svg':  'image/svg+xml',
  '.ico':  'image/x-icon',
  '.woff2':'font/woff2',
  '.woff': 'font/woff',
};

function serveFile(res, filePath) {
  const ext = path.extname(filePath);
  const contentType = MIME[ext] || 'application/octet-stream';
  fs.readFile(filePath, (err, data) => {
    if (err) return null;
    res.writeHead(200, { 'Content-Type': contentType });
    res.end(data);
    return true;
  });
}

http.createServer((req, res) => {
  let urlPath = req.url.split('?')[0];
  
  // Root -> index.html
  if (urlPath === '/') urlPath = '/index.html';
  
  // Directory paths with trailing slash -> try index.html
  if (urlPath.endsWith('/')) urlPath += 'index.html';

  const filePath = path.join(__dirname, urlPath);
  const ext = path.extname(filePath);
  const contentType = MIME[ext] || 'application/octet-stream';

  fs.readFile(filePath, (err, data) => {
    if (!err) {
      // File found, serve it
      res.writeHead(200, { 'Content-Type': contentType });
      res.end(data);
      return;
    }

    // File not found - try as directory (e.g. /practice -> /practice/index.html)
    const dirIndex = path.join(__dirname, urlPath, 'index.html');
    fs.readFile(dirIndex, (errDir, dataDir) => {
      if (!errDir) {
        res.writeHead(200, { 'Content-Type': 'text/html' });
        res.end(dataDir);
        return;
      }

      // SPA fallback - serve root index.html
      fs.readFile(path.join(__dirname, 'index.html'), (err2, data2) => {
        if (err2) {
          res.writeHead(500);
          res.end('Server error');
        } else {
          res.writeHead(200, { 'Content-Type': 'text/html' });
          res.end(data2);
        }
      });
    });
  });
}).listen(PORT, () => {
  console.log(`PokerTeacher running on port ${PORT}`);
});
