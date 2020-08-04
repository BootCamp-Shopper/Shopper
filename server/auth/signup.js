const router = require("express").Router();
const { User, Address } = require('../db/'); // requires user from db since route requires user model

//POST request to add (user) information to database
router.post('/', async(req, res, next) => {
    const {email, firstName, lastName, password, imageUrl,
    line1, line2, city, state, zip} = req.body;

    try {
        const check = await User.findOne({
            where: {email: req.body.email}
        })

        if (check){
            res.send("Email is already in use!")
        }

        else {
            const newUser = await User.create({email, firstName, lastName, password, imageUrl});
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
})

module.exports = router;