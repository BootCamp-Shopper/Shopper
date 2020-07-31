const router = require("express").Router();
const {User} = require('../db/index')

//all users route
router.get('/', async (req, res, next) => {
    try {
        const users = await User.findAll({
            //use attributes to pull non sensitive information from db
            attributes: ['id', 'firstName', 'lastName', 'imageUrl', 'address', 'email', 'role'] 
        })
        
        //exports the queried info to front end in json array
        res.send(users);
        
        
    } catch (error) {
        next(error)
    }
    
})


module.exports = router;

