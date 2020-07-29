const router = require("express").Router();

// connect your API routes here!
router.use("/items", require("./items"));
router.use("/orders", require("./orders"));

module.exports = router;
