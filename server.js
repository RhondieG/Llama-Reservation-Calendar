const config =
{
    host: 'localhost',
    port: 5432,
    database: 'llama_reservation',
    username: 'postgres',
    password: 'Pokemon1'
};

var express = require('express');
var bodyParser = require('body-parser');
var cors = require('cors');
const bcrypt = require('bcryptjs'); //password encrption, npm install crypto is another type 
const session = require('express-session');
const cookieParser = require('cookie-parser');
const ejs = require('ejs');

//Routes 
const indexRouter = require('./routes/index');

//Promise and Sanitize input to prevent unexpected queries (and malicious queries) into data-base
const pgp = require('pg-promise')();
const db = pgp(process.env.DATABASE_URL || config); //Checks for Environment URL, will only show if add postgres addon, else defaults to local 

//Creating Objects for Sequelize
const Sequelize = require('sequelize');

 //Connection for Heroku
 const connectionString = `postgres://${config.username}:${config.password}@${config.host}:${config.port}/${config.database}`
 const sequelize = new Sequelize(process.env.DATABASE_URL || connectionString, {
     dialect: 'postgres',
     pool: {
         max: 10,
         min: 0,
         acquire: 30000,
         idle: 10000
     }
 });


 //Add options to app
var app = express();

// set the view engine to ejs
app.set('view engine', 'ejs');
app.use(express.static('public')); //This is to access your css and javascript files in public folder
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
//Cors for AXIOS ON BROWSER
app.use(cors());
app.use(cookieParser());
app.use(session({ secret: 'keyboard cat', cookie: { maxAge: 60000 }}));

app.use('/', indexRouter);


app.listen(process.env.PORT || 3000, function(){
    console.log('Todo List API is now listening on port 3000...');
})