const router = require('express').Router();
const { Item, User } = require("./db");

// Get specific user order.
router.get('/userOrders', async (req, res, next) => {
  const userCart = await User.findbyID({
    id: String
    }) // this is the user's cart information. it is found through querying db for current user & through association with table "order"

})


module.exports = router;