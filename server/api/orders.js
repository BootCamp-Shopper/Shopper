const router = require("express").Router();
const { Item, User } = require("../db");

// Get specific user order.
router.get("/:userId", async (req, res, next) => {
    try {
      const userCart = await User.findByPk(req.params.userId, {
        include: [{ model: Item }],
      }); // this is the user's cart information. it is found through querying db for current user & through association with table "order"
      res.send("This is userId-order route.");
    } catch (err) {next(err);}
});

module.exports = router;
