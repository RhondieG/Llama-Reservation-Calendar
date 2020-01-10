const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const bcrypt = require('bcryptjs'); //password encrption, npm install crypto is another type 
const session = require('express-session');
const cookieParser = require('cookie-parser');
const dotenv = require('dotenv');
dotenv.config();

// Sequelize Setup
var models = require('./models');

//Routes 
const indexRouter = require('./routes/index');
const loginRouter = require('./routes/login');
const authRouter = require('./routes/auth');

const setupAuth = require('./routes/auth').setupAuth;

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

setupAuth(app);

app.use('/', indexRouter);
app.use('/login', loginRouter);
app.use('/auth', authRouter);

models.sequelize.sync().then(function () {
    app.listen(process.env.PORT || 3000, function(){
        console.log('Todo List API is now listening on port 3000...');
    })
});