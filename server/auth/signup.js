const router = require("express").Router();
const { User, Address } = require('../db/'); // requires user from db since route requires user model

//POST request to add (user) information to database
router.post('/', async(req, res, next) => {
    try {
        const check = await User.findOne({
            where: {email: req.body.userDetails.email}
        })

        if (check){
            res.send("Email is already in use!")
        }

        else {
            const newUser = await User.create(req.body.userDetails)
            const newAddress = await Address.create(req.body.userAddress)
            
            await newUser.addAddress(newAddress) //by the power of literal magic (Sequelize has "magic methods" that just happen I guess??????); Sequelize has now associated the user and address table
            
            const test = await User.findOne({
                where: {
                    id: newUser.id
                },
                include: [{
                    model: Address
                }]
            })
            
            res.json(newUser)

        }    
        
    } catch (error) {
        next(error);
    }
})



module.exports = router;