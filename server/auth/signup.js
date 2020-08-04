const router = require("express").Router();
const { User, Address } = require('../db/'); // requires user from db since route requires user model

//POST request to add (user) information to database
router.post('/', async(req, res, next) => {
    try {
        const check = await User.findOne({
            where: {email: req.body.userDetails.email}
        })

        if (check){
            res.send("Email is already in use!");
        }

        else {
            const newUser = await User.create(req.body.userDetails);
            const newAddress = await Address.create(req.body.userAddress);
            
            //by the power of "magic methods"; Sequelize has now associated the user and address table
            await newUser.addAddress(newAddress);
            
            const userAddress = await User.findOne({
                where: {
                    id: newUser.id
                },
                include: [{
                    model: Address
                }]
            });
            res.json(userAddress);
        }    
    } catch (error) {
        next(error);
    }
})

module.exports = router;