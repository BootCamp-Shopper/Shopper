const router = require("express").Router();

// connect your auth routes here!
router.use("/signup", require("./signup"));

module.exports = router;