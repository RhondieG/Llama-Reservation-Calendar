const express = require('express');
const passport = require('passport');
const LinkedInStrategy = require('@sokratis/passport-linkedin-oauth2').Strategy;
const bcrypt = require('bcryptjs');
const db = require('../models');
const LocalStrategy = require('passport-local').Strategy;

const router = express.Router();

function setupAuth(app) {

    // use the GitHub strategy with the settings from the .env file
    passport.use(new LinkedInStrategy({
        // clientID: process.env.CLIENT_ID,
        // clientSecret: process.env.CLIENT_SECRET,
        clientID: process.env.LINKEDIN_API_KEY,
        clientSecret: process.env.LINKEDIN_SECRET_KEY,
        callbackURL: `${process.env.APP_URL}/auth/linkedin/callback`,
        scope: ['r_emailaddress', 'r_liteprofile'],
    },
        function (accessToken, refreshToken, profile, done) {
            // this function should take the profile and transform it into a user object.
            // for now we will just pass on the profile object returned by GitHub
            return done(null, profile);
        }
    ));

    passport.use(new LocalStrategy({
            usernameField: 'email',
            passwordField: 'password',
        },
        function (email, password, done) {
            db.user.findOne({where: { email: email }})
                .then(user => {
                    if (!user) { return done(null, false); }
                    if (!bcrypt.compareSync(password, user.password)) {
                        return done(null, false);
                    }
                    console.log('password match');
                    return done(null, user);
                })
                .catch(err => done(err));
        }
    ));

    // #4 call passport.serializeUser
    // This configures how passport turns a user object
    // into something it can track in a session.
    passport.serializeUser(function (user, done) {
        // placeholder for custom user serialization
        // null is for errors
        console.log('we are serializing');
        // console.log(user);
        done(null, user.id);
    });

    // #5 call passport.serializeUser
    // This configures how passport checks what's in the
    // session to see if the login is still valid.
    passport.deserializeUser(function (id, done) {
        console.log('we are deserializing');
        // placeholder for custom user deserialization.
        // maybe you are going to get the user from mongo by id?
        // null is for errors
        // console.log(id);

        const user = db.user.findOne({where: { id: id }})
        done(null, user);
    });

    // #6 initialize passport middleware and register it with express
    app.use(passport.initialize());

    // #7 start passport's session management middleware and
    // register it with express
    app.use(passport.session());
}

// this function is a middleware (notice req, res, and next?)
function ensureAuthenticated(req, res, next) {
    // it checks to see if the request is from a logged in user and if it is
    if (req.isAuthenticated()) {
        // it will pass the request on to the next middleware in the chain
        // req.user is available for use here
        return next();
    }

    // if the request was not authenticated we redirect to login
    res.redirect('/');
}

// handle login link
router.get('/linkedin', passport.authenticate('linkedin'));

// GitHub/linkedin will call this URL
router.get('/linkedin/callback', passport.authenticate('linkedin', { failureRedirect: '/' }),
    function (req, res) {
        res.redirect('/');
    }
);

router.post('/login',
    passport.authenticate('local', { failureRedirect: '/login' }),
    function (req, res) {
        console.log('success');
        res.redirect('/');
    });

module.exports = router;

module.exports.ensureAuthenticated = ensureAuthenticated;
module.exports.setupAuth = setupAuth;
