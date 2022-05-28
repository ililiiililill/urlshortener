require('dotenv').config();
const express = require('express');
const morgan = require('morgan');
const cors = require('cors');
const app = express();

// port
const port = process.env.PORT || 5000;

// use body parser
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// enable CORS so API is remotely testable by FCC
app.use(cors());

// morgan logger
app.use(morgan('combined'));

// public static
app.use('/public', express.static(__dirname + '/public'));

// index
app.get('/', (req, res) => {
  res.sendFile(__dirname + '/views/index.html');
});

// shorturl endpoint
app.use('/api/shorturl', require('./routes/shorturlRoute'));

// listening for requests
app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});
