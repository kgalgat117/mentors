require('dotenv').config()
var express = require('express');
var path = require('path');
var fs = require('fs')
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var cors = require('cors')
var DB = require('./config/db') 

DB.on('connected', function () {
    console.log('connected to database')
})

var mentorRouter = require('./routes/mentor');
var usersRouter = require('./routes/users');

var app = express();

app.use(cors({
    origin: true,
    credentials: true
}))
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({
    extended: false
}));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/mentor', mentorRouter);
app.use('/user', usersRouter);


app.get('*', (req, res) => {
    res.status(404).send('Are You Lost Buddy !')
});


module.exports = app;