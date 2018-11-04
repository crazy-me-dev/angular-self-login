'use strict';
var passport = require('passport');
var User = require('./models/user');
var GoogleTokenStrategy = require('passport-google-token').Strategy;

// var config = require('../config/auth');
passport.use(new GoogleTokenStrategy({
    clientID: "42954571675-no85iikkqfe67pogqmikaqsipgrsb8q2.apps.googleusercontent.com"
    ,
    clientSecret: "g7aEYM1KnkUeXsrLJxYm8hSk"
    },
    function (accessToken, refreshToken, profile, done) {
        console.log('1-----');
        User.upsertGoogleUser(accessToken, refreshToken, profile, function(err, user) {
            return done(err, user);
        });
    }
));

module.exports = passport; 
