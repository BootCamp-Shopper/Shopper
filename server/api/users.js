const router = require("express").Router();
const { User } = require('../db/index')

//all users route
router.get('/', async (req, res, next) => {
    try {
        const users = await User.findAll({
            //use attributes to pull non sensitive information from db
            attributes: ['id', 'firstName', 'lastName', 'imageUrl', 'address', 'email', 'role']
        });
        //exports the queried info to front end in json array
        res.send(users);
    } catch (error) {
        next(error)
    }
});

// Add a new user to the database 
router.post('/signup', async (req,res,next) => {
    try {
        // builds a new user instance to add to the database
        // const user = await User.create(req.body);
        // res.send(user);
        res.send('this is api/users/signup route')
    }
    catch(err) {
        next(err);
    }
});

router.get('/:usersId', async(req, res, next) => {
    try {
        const user = await User.findByPk(req.params.usersId);
        res.send(user);
    } catch (error) {
        next(error)
    }
});


module.exports = router;

