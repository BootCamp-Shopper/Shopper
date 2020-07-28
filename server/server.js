const express = require("express");
const app = express();
const morgan = require("morgan");
const itemsRoute = require("./api/items");
const port = 4000;

app.use(morgan("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/api", itemsRoute);

app.get("/", (req, res) => {
  res.send("hello");
});

app.listen(port, () => {
  console.log(`Server started on Port ${port}`);
});
