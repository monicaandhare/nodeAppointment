const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const cors = require('cors');
const passport = require('passport');
const passportjwt = require('passport-jwt');
const jwt = require('jsonwebtoken');
const authentication = require('./routes/authentication.js');
const mongoose = require('mongoose');
var http = require('http');


const config = require('./config/database');
mongoose.connect(config.database);
mongoose.connection.on('connected' ,()=>{
    console.log('connected to database' +config.database);
});

const app = express();
const port = 2222;

app.use(cors());

app.use(express.static(path.join(__dirname , 'public')));

var today = new Date();
var birthDate = new Date("12-10-1996");
var age = today.getFullYear() - birthDate.getFullYear();
var m = today.getMonth() - birthDate.getMonth();
if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) 
{
    age--;
}
console.log(age)

const visitordetails = require('./routes/visitordetails');
const vehicle = require('./routes/vehicles');
const appointment = require('./routes/appointments');
const batch = require('./routes/batches');
const Material = require('./routes/material');
const location = require('./routes/locations');
const user = require('./routes/users');
const userrole = require('./routes/userroles');
const bin = require('./routes/bin');
const assign = require('./routes/assign.js');
const status = require('./routes/status.js');



app.use(bodyParser.json());


app.use('/visitordetails',visitordetails);
app.use('/vehicle',vehicle);
app.use('/appointment',appointment);
app.use('/batch',batch);
app.use('/material',Material);
app.use('/location',location);
app.use('/user',user);
app.use('/status',status);
app.use('/userrole',userrole);
app.use('/bin',bin);
app.use('/assign',assign);

app.get('/',(req,res)=>{
    res.send("Invalid endpoint");
});

app.listen(port , ()=>{
    console.log('server started on port' +port);
});