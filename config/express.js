const express = require('express')
const cookieParser = require('cookie-parser')
const bodyParser = require('body-parser')
const session = require('express-session')
const passport = require('passport')

app.use(cookieParser())
app.use(bodyParser.urlencoded({ extended: true }))
app.use(session({ secret: '123456',
  resave: false, saveUninitialized: false }))
app.use(passport.initialize())
app.use(passport.session())



module.exports = (app) =>{ 
  
}