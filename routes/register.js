const express = require('express');
const router = express.Router();
const bcrypt = require ('bcrypt');
const db = require('../models');

// Index Page For Now
router.get('/', function(req, res) {
    res.render('pages/register');
});

router.post('/', function(req, res, next){
    console.log(req.body)
    const newUser = db.user.build({
        email: req.body.email,
        password: generateHash(req.body.password)
    });
    return newUser.save().then(results => {
        
        res.redirect('/');
        res.setHeader('Content-Type', 'application/json');
        res.end(JSON.stringify(results));
    })

});

module.exports = router;


//Generate encrypt password on db
const generateHash = function(password) {
    return bcrypt.hashSync(password, bcrypt.genSaltSync(8))
}

//Register new user
