const express = require('express');
const app = express();
const db = require("./db");
const morgan = require("morgan");
const port = 4000;

app.use(morgan("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.listen(port, () => {
   console.log(`Server started on Port ${port}`);
});