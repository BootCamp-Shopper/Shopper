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
    const items = await Item.findById(req.params.albumId, {
      include: [{ model: Item }, { model: User }],
    });
    res.json(items);
  } catch (error) {
    next(error);
  }
});

module.exports = router;
