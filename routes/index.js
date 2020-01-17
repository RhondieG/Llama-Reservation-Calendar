
const express = require('express');
const router = express.Router();

//Calendar Module from NPM
const Calendar = require('calendar').Calendar; 

// Index Page For Now
router.get('/', function(req, res) {
    var cal = new Calendar(1);               // weeks starting on Monday
    m = cal.monthDays(2012, 1);
    for (i=0; i<m.length; i++) console.log(m[i]);

    let calenderObject = { calendarValues: m};

    res.render('pages/index', calenderObject);
});
  
router.get('/logout', function(req, res, next) {
  console.log('logging out');
  req.logout();
  res.redirect('/');
});

module.exports = router;