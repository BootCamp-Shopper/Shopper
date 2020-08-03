const router = require("express").Router();
const { Item, User } = require("../db");
const stripe = require('stripe')("sk_test_4eC39HqLyjWDarjtT1zdp7dc");

const calculateAmount = items => {
    // Replace this constant with a calculation of the order's amount
    // Calculate the order total on the server to prevent
    // people from directly manipulating the amount on the client
    return 1400;
}

router.post('/payment', async (req,res,next) => {
   try {
      const { items } = req.body;
      
      const paymentIntent = await stripe.paymentIntents.create({
          amount: calculateAmount(items),
          currency: 'usd',
      });

      res.send({
         clientSecret: paymentIntent.client_secret,
      });
   }
   catch(err) {
      next(err);
   }
})

// Get specific user order.
router.get("/:userId", async (req, res, next) => {
    try {
      const userCart = await User.findByPk(req.params.userId, {
        include: [{ model: Item }],
      }); // this is the user's cart information. it is found through querying db for current user & through association with table "order"
      res.send(userCart);
    } catch (err) {next(err);}
});

module.exports = router;
