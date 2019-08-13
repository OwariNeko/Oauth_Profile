const express = require('express')
const app = express()
const bodyParser = require('body-parser');
var mongoose = require('./config/mongoose')
var db = mongoose();
const cors = require('cors')
const logger = require('./util/logger');
const morgan = require('morgan');




// const morgan = require('morgan');
app.use(bodyParser.urlencoded({
  extended: true
}));

app.use(bodyParser.json());
app.use(bodyParser.text());
app.use(cors({origin: '*'}));
app.use(morgan('dev', {
  'stream': logger.stream
}));


// respond with "hello world" when a GET request is made to the homepage
app.use('/api/v1', require('./middleware/router'));

app.use((req, res, next) => {
    res.status(404);
    res.json({
        status: 404,
        message: "Resource not found"
    });
    next();
});


app.listen(8080, () => console.log('Example app listening on port 3000!'))