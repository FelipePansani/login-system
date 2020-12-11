const express = require('express');
const router = express.Router();
const User = require('./Users.js');
const bcrypt = require('bcrypt');
const { MongoClient } = require('mongodb');
require('dotenv').config();

router.get('/', (req, res) => {
    User.find({}).lean()
        .then(user => res.render('index', { user }))
})

router.get('/register', (req, res) => {
    res.render('register');
})

router.post('/register', async (req, res) => {
    let newEmail = req.body.email;
    let salt = await bcrypt.genSalt();
    let newPassword = await bcrypt.hash(req.body.password, salt);
    let newUser = new User({ email: newEmail, password: newPassword });

    newUser.save()
        .then(() => res.redirect('/'))
})

router.get('/login', (req, res) => {
    res.render('login');
})

router.post('/login', async (req, res) => {

    User.findOne({ email: req.body.email }, async (err, user) => {
        if (user == null) {
            res.render('login', { message: 'Email not found' })
        }
        else {
            if (await bcrypt.compare(req.body.password, user.password)) {
                res.render('profile', { email: user.email })
                console.log('Password is correct')
            }
            else {
                res.render('login', { message: 'Password is incorrect' })
            }
        }
    })
})

router.get('/profile', (req, res) => {
    res.render('profile');
})

module.exports = router;
