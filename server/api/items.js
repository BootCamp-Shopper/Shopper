const router = require("express").Router();
const { Items, User } = require("../db");

//Get All Items
router.get("/", async (req, res, next) => {
  try {
    const items = await Items.findAll({
      include: [User],
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
      include: [Item, User],
    });
    res.json(items);
  } catch (error) {
    next(error);
  }
});

module.exports = router;
