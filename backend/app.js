const express = require('express');
const app = express()
const http = require('http');
const bodyParser = require('body-parser');
const cors = require('cors');
const user=require('./routes/register');
const subject=require('./routes/subject');
const blog=require('./routes/batch');
const teacher=require('./routes/teacher');
const rooms=require('./routes/rooms');
const routine=require('./routes/routine');
const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost:27017/routine',
{
    useNewUrlParser:true,
    useCreateIndex:true,
    useUnifiedTopology:true
})
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());
app.use(cors());
app.use('/users',user);
app.use('/subjects', subject);
app.use('/batch', blog);
app.use('/rooms', rooms);
app.use('/teacher', teacher);
app.use('/routine', routine);
const port = process.env.port || 3000;
const server = http.createServer(app);
server.listen(port);
module.exports = app;