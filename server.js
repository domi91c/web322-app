/**********************************************************************************
 *  WEB322 –Assignment2
 *  I declare that this assignment is my own work in accordance with Seneca  Academic Policy.
 *  No part of this assignment has been copied manually or electronically from any other source
 *  (including web sites) or distributed to other students.
 *
 *  Name: Dominic Nunes Student ID: 016-183-121 Date: 2017-09-23
 *
 *  Online (Heroku) URL: http://web322-app.herokuapp.com/
 *********************************************************************************/


const HTTP_PORT = process.env.PORT || 8080
const express = require('express')
const app = express()
const path = require('path')
app.use(express.static('public'))

// setup a 'route' to listen on the default url path
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname + '/views/home.html'))
})

app.get('/about', (req, res) => {
  res.sendFile(path.join(__dirname + '/views/about.html'))
})

// setup http server to listen on HTTP_PORT
app.listen(HTTP_PORT)
