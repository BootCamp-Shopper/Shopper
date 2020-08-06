const router = require("express").Router();
const { Item, User } = require("../db");
const { checkAuthAdmin } = require("../auth/middleware");

//Get All Items
router.get("/", async (req, res, next) => {
  try {
    const items = await Item.findAll({
      include: [{ model: User }],
    });
    res.send(items)
  } catch (error) {
    next(error);
  }
});

//Get Single Item
router.get("/:itemId", async (req, res, next) => {
  try {
    const item = await Item.findByPk(req.params.itemId);

    res.send(item);
  } catch (error) {
    next(error);
  }
});

// Add a new item to the database
router.post("/", checkAuthAdmin, async (req,res,next) => {
    try {
       // builds a new item instance to add to the database
       const item = await Item.create(req.body);
       
       res.send(item);
    }
    catch(err) {
       next(err);
    }
})

//Delete an item from the database
router.delete("/:id", checkAuthAdmin, async (req, res, next) =>{
  try {
    const deletedItem = await Item.destroy({
      where: {
        id: req.params.id
      }
    })
    res.send('deleted')
  } 
  
  catch (error) {
    next(error);
  }
})

module.exports = router;
