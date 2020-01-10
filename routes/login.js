const express = require('express');
const router = express.Router();


// Index Page For Now
router.get('/login', function(req, res) {
    res.render('pages/login');
});
module.exports = router;