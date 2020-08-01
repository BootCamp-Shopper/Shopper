const router = require("express").Router();
const { User } = require('../db/index');

router.get('/:userId', async (req, res, next) => {
    try {
        const member = await User.findByPk(req.params.usersId);
        // res.send(member);
        res.send('member\'s profile api')
    } catch (err) { next(err); }
});

module.exports = router;