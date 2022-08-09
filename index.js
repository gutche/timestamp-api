// index.js
// where your node app starts

// init project
var express = require('express');
var app = express();

// enable CORS (https://en.wikipedia.org/wiki/Cross-origin_resource_sharing)
// so that your API is remotely testable by FCC
var cors = require('cors');
const moment = require('moment');
app.use(cors({ optionsSuccessStatus: 200 })); // some legacy browsers choke on 204

// http://expressjs.com/en/starter/static-files.html
app.use(express.static('public'));

// http://expressjs.com/en/starter/basic-routing.html
app.get('/', function (req, res) {
  res.sendFile(__dirname + '/views/index.html');
});

// your first API endpoint...
app.get('/api/:timestamp', (req, res) => {
  var { timestamp } = req.params;

  if (timestamp > 10000) timestamp = +timestamp;

  if (new Date(timestamp) == 'Invalid Date') {
    res.json({ error: 'Invalid Date' });
  } else {
    const date = new Date(timestamp);
    res.json({ unix: date.getTime(), utc: date.toUTCString() });
  }
});

app.get('/api', (req, res) => {
  const date = new Date();
  res.json({ unix: date.getTime(), utc: date.toUTCString() });
});

// listen for requests :)
var listener = app.listen(3000, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});
