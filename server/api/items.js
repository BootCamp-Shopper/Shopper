const router = require("express").Router();
const { Item, User } = require("../db");

//Get All Items
router.get("/", async (req, res, next) => {
  try {
    const items = await Item.findAll({
      include: [{ model: User }],
    });
    res.send(items);
  } catch (error) {
    next(error);
  }
});

//Get Single Item
router.get("/:itemId", async (req, res, next) => {
  try {
    const item = await Item.findByPk(req.params.itemsId);

    res.send(item);
  } catch (error) {
    next(error);
  }
});

module.exports = router;
