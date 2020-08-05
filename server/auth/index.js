const router = require("express").Router();
const { User, Address } = require('../db/');
const passport = require('passport');
const bcrypt = require('bcrypt');

// TEST to GET the login info
// router.get('/', async(req, res, next) => {
//     try {
//         res.send(req.user);
//     } catch (err) {
//         next(err);
//     }
// });

//POST request to add (user) information to database
router.post('/signup', async(req, res, next) => {
    const {email, firstName, lastName, password, imageUrl} = req.body.userDetails;
    const {line1,line2,city,state,zip} = req.body.userAddress;

    try {
        const check = await User.findOne({
            where: {email: email}
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

router.get('/login', (req,res,next) => {
    res.send('Login failed')
});

router.post('/login', passport.authenticate('local', {
    // successRedirect: '/api/items',
    failureRedirect: '/auth/login',
}), (req, res, next) => {
    console.log(req.user);
    res.send(req.user);
});

module.exports = router;