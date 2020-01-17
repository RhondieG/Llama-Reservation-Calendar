const express = require('express');
const path = require('path');
// const logger = require('morgan');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
// const hbs = require('express-handlebars');

// include routes
const index = require('./routes/index');
const users = require('./models/user');
const register = require('./routes/register');
const login = require('./routes/login');
const auth = require('./routes/auth');

const app = express();

// import settings from .env file or ENV variables
require('dotenv').config();
