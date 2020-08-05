const router = require("express").Router();
const { User, Address } = require('../db/index')

//all users route
router.get('/', async (req, res, next) => {
    try {
        const users = await User.findAll({
            //use attributes to pull non sensitive information from db
            attributes: ['id', 'firstName', 'lastName', 'imageUrl', 'email', 'role'],
            include: { model: Address }
        });
        //exports the queried info to front end in json array
        res.send(users);
    } catch (error) {
        next(error)
    }
});

router.get('/:usersId', async(req, res, next) => {
    try {
        const user = await User.findByPk(req.params.usersId, 
            {include: { model: Address }});
        res.send(user);
    } catch (error) {
        next(error)
    }
});

router.delete('/:userId', async(req, res, next) => {
    try {
        const destroyUser = await User.destroy({
            where: {id: req.params.userId}
        });
        console.log(destroyUser);
        res.send({
            message: "Destroyed User!"
        });
    } catch (error) {
        next(error)
    }
})

module.exports = router;

