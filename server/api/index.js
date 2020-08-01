const router = require("express").Router();

// connect your API routes here!
router.use("/items", require("./items"));
router.use("/orders", require("./orders"));
router.use("/users", require("./users"));
router.use("/member", require("./member"));

module.exports = router;
