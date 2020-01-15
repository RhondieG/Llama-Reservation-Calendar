
const express = require('express');
const router = express.Router();

//Calendar Module from NPM
const Calendar = require('calendar').Calendar; 

// Index Page For Now
router.get('/', function(req, res) {
    let cal = new Calendar(1);               // weeks starting on Monday
    const daysInMonth = cal.monthDays(2020, today('getMonth'));
    for (i=0; i<daysInMonth.length; i++) console.log(daysInMonth[i]);

    let juice = 'RANDOM';
    let calenderObject = { m : daysInMonth, year : today('getYear'), month : today('getMonth')};

    res.render('pages/index', calenderObject);
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