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

//Promise and Sanitize input to prevent unexpected queries (and malicious queries) into data-base
const pgp = require('pg-promise')();
const db = pgp(process.env.DATABASE_URL || config); //Checks for Environment URL, will only show if add postgres addon, else defaults to local 

//Creating Objects for Sequelize
const Sequelize = require('sequelize');

