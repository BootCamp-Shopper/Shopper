const router = require("express").Router();
const { User, Address } = require('../db/');
const passport = require('passport');
const session = require('express-session');
const bcrypt = require('bcrypt');
const passportAuthentication = require('./passport-config');

passportAuthentication(passport);

// session takes in a lot of different options
// secret is a key that we want to keep secret and
// encrypt all of our information
// resave: false prevents resave of session var if nothing is changed
// saveUninitialized: false prevents saving of empty values in the session
router.use(session({
    secret: 'secret',
    resave: false,
    saveUninitialized: false,
}));
router.use(passport.initialize());
// store variables to be persisted across the entire session
router.use(passport.session());


//POST request to add (user) information to database
router.post('/signup', async(req, res, next) => {
    const {email, firstName, lastName, password, imageUrl,
    line1, line2, city, state, zip} = req.body;

    try {
        const check = await User.findOne({
            where: {email: req.body.email}
        })

        if (check){
            res.send("Email is already in use!");
        }

        else {
            const hashedPassword = await bcrypt.hash(password, 10);

            const newUser = await User.create({email, firstName, lastName, password: hashedPassword, imageUrl});
            const newAddress = await Address.create({line1, line2, city, state, zip});
            await newAddress.setUser(newUser);
            const userAddress = await User.findOne({
                where: {id: newUser.id},
                include: Address,
            });
            res.send(userAddress);
        }    
    } catch (error) {
        next(error);
    }
});

router.post('/login', passport.authenticate('local', {
    successRedirect: '/api/items',
    failureRedirect: '/api/items',
}));

module.exports = router;