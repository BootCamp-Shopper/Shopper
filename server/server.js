const express = require("express");
const path = require('path');
const app = express();
const { db } = require("./db");
const morgan = require("morgan");
const passport = require('passport');
const session = require('express-session');
const passportAuthentication = require('./passport-config');
const port = 4000;

passportAuthentication(passport);

// session takes in a lot of different options
// secret is a key that we want to keep secret and
// encrypt all of our information
// resave: false prevents resave of session var if nothing is changed
// saveUninitialized: false prevents saving of empty values in the session
app.use(session({
   secret: 'secret',
   resave: false,
   saveUninitialized: false,
}));
app.use(passport.initialize());
// store variables to be persisted across the entire session
app.use(passport.session());

// app.get('/', (req,res,next) => {
//    res.send(req.user);
// });
app.use(morgan("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, '..', 'client', 'build')));

app.use('/api', require('./api'));
app.use('/auth', require('./auth')) // authorization routes

app.use('*', (req,res,next) => {
    res.sendFile(path.join(__dirname,'..','client','build','index.html'));
});

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
