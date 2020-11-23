const express = require('express');

const app = express();
const path = require('path');
//const static = require('express-static');

const port = 5001;

function cacheHeaders(res, p) {
  if (express.static.mime.lookup(p) === 'text/html') {
    res.setHeader('Cache-Control', 'public, max-age=0');
  }
}

app.use('/', express.static(path.resolve(__dirname, 'dist'), {
  index: false,
  maxAge: 0.25 * 3600,
  setHeaders: cacheHeaders,
}));

app.get('/*', (request, response) => {
  response.sendFile(path.resolve(__dirname, 'dist/index.html'));
});

app.listen(port, () => {
  console.log('service ready');
});

