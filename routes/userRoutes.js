const express = require('express');
const passport = require('passport');
const router = express.Router();
const User = require('../models/userModel');


router.get('/login', (req, res) => {
    res.render("pages/login");
})

router.get('/register', (req, res) => {
    res.render("pages/register");
})
router.post('/register', async (req, res) => {
    try {
        const { username, email, password } = req.body;
        //console.log(username, password,email);
        const user = new User({ email, username });
        const newuser = await User.register(user, password);


        req.login(newuser, e => {
            if (e) return next(e);
            res.redirect('/');
        })
    } catch (e) {
        console.log(e);
        res.redirect('/login');
    }
})

router.post('/login', passport.authenticate('local', { failureRedirect: '/login' }), (req, res) => {
    res.redirect('/');
})

module.exports = router;
