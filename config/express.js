const express = require('express')
const cookieParser = require('cookie-parser')
const bodyParser = require('body-parser')
const session = require('express-session')
const passport = require('passport')
const cors = require('cors')

var corsOptions = {
  origin: 'http://localhost:4200' ,
  optionsSuccessStatus: 200,
  credentials: true
}




module.exports = (app) => {
  app.use(cookieParser())
  app.use(bodyParser.urlencoded({ extended: true }))
  app.use(bodyParser.json())
  app.use("/uploads" , express.static('uploads'))
  app.use(session({
    secret: '123456',
    resave: false, saveUninitialized: false
  }))
  app.use((req, res, next) => {
    if (req.user) {
      res.locals.currentUser = req.user;
    }
    next();
  });
  app.use(passport.initialize())
  app.use(passport.session())
  app.use(cors(corsOptions))
}