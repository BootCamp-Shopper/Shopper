const router = require("express").Router();
const { Item, User, Order } = require("../db");
const stripe = require('stripe')("sk_test_4eC39HqLyjWDarjtT1zdp7dc");

router.get("/", async (req,res,next) => {
    try {
       const orders = await Order.findAll({
          where: {
             userId: 1,
          }
       });
       
       res.send(orders);
    }
    catch(err) {
       next(err);
    }
})

router.post("/add", async (req,res,next) => {
   try {
      // when user clicks add to cart button, in the backend, user add item and item add user (not additems and add users)
      // we need hero id and user id. 
      // Order.create is an error
      const { status, superheroId } = req.body;
      
      const userId = 1;

      const user = await User.findByPk(userId);

      const item = await Item.findByPk(superheroId);

      await user.addItem(item, { through: { status: status }});

      await item.addUser(user, { through: { status: status }});

      const orders = await Order.findAll();

      res.send(orders);
   }
   catch(err) {
      next(err);
   }
})

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


module.exports = router;
