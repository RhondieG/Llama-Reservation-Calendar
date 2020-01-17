
const express = require('express');
const router = express.Router();

const db = require("../models/");

//Calendar Module from NPM
const Calendar = require('calendar').Calendar; 

//Joins for Sequelize
// db.llama.hasMany(db.feed, {foreignKey: 'id'});
//db.feed.belongsTo(db.llama, {foreignKey: 'feed_id'});


// Index Page 
router.get('/', function(req, res) {

    let cal = new Calendar(1);               // weeks starting on Monday
    const daysInMonth = cal.monthDays(2020, today('getMonth'));
    //for (i=0; i<daysInMonth.length; i++) console.log(daysInMonth[i]);

    let calenderObject = { m : daysInMonth, year : today('getYear'), month : today('getMonth')};

    res.render('pages/index', calenderObject);
});

//if the user is logged in already, the req will have the session user id already 
//Check if Reservation Exist for this Date 
router.get('/api/reservation', function(req, res) {

    req.session.user = 1;

    db.user.findOne({
        where: {
            id: req.session.user
        },
    }).then(user => {
        // if the user exists
        res.setHeader('Content-Type', 'application/json');
        res.end(JSON.stringify(user));
        
        console.log('works');
    });
});

router.post('/api/reservation', function(req, res) {

    //Default values for now
    req.session.user = 1;
    
    let llama_id = 1;

    db.user.findOne({
        where: {
            id: req.session.user
        },
    }).then(user => {
        // if the user exists, then insert new reservation
        db.reservation.create({
            user_id: req.session.user,
            llama_id: req.body.llamaChosen,
            date_reserved: req.body.dateReserved
        }).then(new_reservation => {
        
            res.setHeader('Content-Type', 'application/json');
            res.end(JSON.stringify(new_reservation));
            console.log('works');

        }).catch(error => {

            res.setHeader('Content-Type', 'application/json');
            res.end(JSON.stringify(error));
            console.log('erorr');
        });
    });
});

//Pull ALL llamas
router.get('/api/reservation/llama/all', function(req,res)
{
    db.llama.findAll().then((results) => {
        res.end(JSON.stringify(results));
    });

});

//Pull llamas based off id
router.get('/api/reservation/llama/:id', function(req,res)
{
    const id = Number.parseInt(req.params.id, 10);

    //Association with feed is defined in models/llama folder under associate
    db.llama.findOne(
        { 

        where: {id: id},
        include: [db.feed]

        }).then((results) => {
        res.end(JSON.stringify(results));
    });

});

function today(userDateFilter)
{
    let d = new Date();

    if(userDateFilter == 'fullDate')
    {
        return d.getMonth()+1 + '/' + d.getDate() + '/' + d.getFullYear();
    }
    else if (userDateFilter == 'getMonth')
    {
        return d.getMonth()+1;
    }
    else if(userDateFilter == 'getYear')
    {
        return d.getFullYear();
    }
}

module.exports = router;