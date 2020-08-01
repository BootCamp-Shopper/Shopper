const router = require("express").Router();
const { User } = require('../db/'); // requires user from db since route requires user model

//POST request to add (user) information to database
router.post('/', async(req, res, next) => {
    try {
        const newUser = await User.create(req.body)
        res.send(newUser)
        
    } catch (error) {
        next(error);
    }
})



module.exports = router;