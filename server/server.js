const express = require("express");
const path = require('path');
const app = express();
const { db } = require("./db");
const morgan = require("morgan");
const port = 4000;

app.use(morgan("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, '..', 'public')));
app.use('/api', require('./api'));

// Error catching endware
app.use((err, req, res, next) => {
   console.error(err, typeof next)
   console.error(err.stack)
   res.status(err.status || 500).send(err.message || 'Internal server error.')
});

const init = async () => {
 try {
   await db.sync();

   app.listen(port, () => {
      console.log(`App listening on PORT ${port}`)
   });
  }
  catch(err) {
     console.log(err);
  } 
}

init();
