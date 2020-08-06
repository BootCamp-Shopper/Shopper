const router = require("express").Router();
const { Item, User, Order } = require("../db");
const stripe = require('stripe')("sk_test_4eC39HqLyjWDarjtT1zdp7dc");
const { checkAuth } = require("../auth/middleware");

router.get("/", checkAuth, async (req,res,next) => {
    try {
       const user = await User.findByPk(req.user.id);

       const orders = await user.getItems();

       res.send(orders);
    }
    catch(err) {
       next(err);
    }
})

router.post("/add", checkAuth, async (req,res,next) => {
   try {
      // when user clicks add to cart button, in the backend, user add item and item add user (not additems and add users)
      // we need hero id and user id. 
      // Order.create is an error
      const { superheroId } = req.body;
      
      const userId = req.user.id;

      const user = await User.findByPk(userId);

      const item = await Item.findByPk(superheroId);

      await user.addItem(item, { through: { status: 'pending' }});

      await item.addUser(user, { through: { status: 'pending' }});

      res.send('Item added to cart!');
   }
   catch(err) {
      next(err);
   }
})

router.delete('/:itemId', async (req,res,next) => {
    try {
       const user = await User.findByPk(req.user.id);
       const superpower = await Item.findByPk(req.params.itemId);

       await user.removeItem(superpower);
       await superpower.removeUser(user);

       res.send('removed');
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

router.post('/payment', checkAuth, async (req,res,next) => {
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
