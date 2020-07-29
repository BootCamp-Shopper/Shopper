const router = require("express").Router();
const { Item, User } = require("../db");

//Get All Items
router.get("/", async (req, res, next) => {
  try {
    const items = await Item.findAll({
      include: [{ model: User }],
    });
    res.send("this is items routes");
  } catch (error) {
    next(error);
  }
});

//Get Single Item
router.get("/:itemsId", async (req, res, next) => {
  try {
    const items = await Item.findByPk(req.params.albumId, {
      include: [{ model: User }],
    });
    // res.json(items);
    res.send('this is /items/itemsId route');
  } catch (error) {
    next(error);
  }
});

module.exports = router;
