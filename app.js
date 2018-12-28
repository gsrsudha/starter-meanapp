var express = require("express");
var cors = require("cors");
var mongoose = require("mongoose");
var bodyparser = require("body-parser");
var path = require("path"); // no need to install as this is part of core node module

var app = express();

const route = require('./routes/route');

//connect to mongo db
mongoose.connect('mongodb://localhost:27017/contactlist');

//on connection to mongo db
mongoose.connection.on('connected', () => {
    console.log('Connected to mongodb @ 27017');
});

mongoose.connection.on('error', (err) => {
    if(err){
        console.log(`Error in connecting to database:${err}`);
    }
});

const port = 3000;

//adding middleware
app.use(cors());

app.use(bodyparser.json());

//static files
app.use(express.static(path.join(__dirname, 'public')));

app.use('/api', route);

app.get('/', (req, res) => {
    res.send("App works!!!")
});

app.listen(port , () => {
    console.log("Server is listening at port " + port);
});