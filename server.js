/**********************************************************************************
 *  WEB322 –Assignment3
 *  I declare that this assignment is my own work in accordance with Seneca Academic Policy.
 *  No part of this assignment has been copied manually or electronically from any other source
 *  (including web sites) or distributed to other students.
 *
 *  Name: Dominic Nunes Student ID: 016-183-121 Date: 2017-09-23
 *
 *  Online (Heroku) URL: http://web322-app1.herokuapp.com/
 *********************************************************************************/

let express = require('express')
let path = require('path')
let app = express()
let data_service = require('./data-service.js')
const exphbs = require('express-handlebars')
const bodyParser = require('body-parser')
const HTTP_PORT = process.env.PORT || 8080

function onHttpStart() {
  console.log('Express listening on port ' + HTTP_PORT)
  return new Promise((res, req) => {
    data_service.initialize()
                .then(resp => {
                  console.log(resp)
                })
                .catch(err => {
                  console.log(err)
                })
  })
}

// load assets directory
app.use(express.static('public'))
app.use(bodyParser.urlencoded({ extended: true }))

app.engine('.hbs', exphbs({
  extname: '.hbs',
  defaultLayout: 'layout',
  helpers: {
    equal: function(lvalue, rvalue, options) {
      if (arguments.length < 3) thrownew
      Error('Handlebars Helper equal needs 2 parameters')
      if (lvalue != rvalue) {
        return options.inverse(this)
      } else {return options.fn(this)}
    },
  },
}))
app.set('view engine', '.hbs')

// ROUTES
app.get('/', (req, res) => {
  res.render('home')
})

app.get('/about', (req, res) => {
  res.render('about')
})

app.get('/employees', (req, res) => {
  if (req.query.status) {
    data_service.getEmployeesByStatus(req.query.status)
                .then(resp => {
                  res.json(resp)
                })
                .catch(err => {
                  res.json({ message: err })
                })
  } else if (req.query.department) {
    data_service.getEmployeesByDepartment(req.query.department)
                .then(resp => {
                  res.json(resp)
                })
                .catch(err => {
                  res.json({ message: err })
                })
  } else if (req.query.manager) {
    data_service.getEmployeesByManager(req.query.manager)
                .then(resp => {
                  res.json(resp)
                })
                .catch(err => {
                  res.json({ message: err })
                })
  } else {
    data_service.getAllEmployees()
                .then(resp => {
                  res.json(resp)
                })
                .catch(err => {
                  res.json({ message: err })
                })
  }
})

app.get('/employee/:num', (req, res) => {
  data_service.getEmployeeByNum(req.params.num)
              .then(resp => {
                res.json(resp)
              })
              .catch(err => {
                res.json({ message: err })
              })
})

app.get('/managers', (req, res) => {
  data_service.getManagers()
              .then(resp => {
                res.json(resp)
              })
              .catch(err => {
                res.json({ message: err })
              })
})

app.get('/departments', (req, res) => {
  data_service.getDepartments()
              .then(resp => {
                res.json(resp)
              })
              .catch(err => {
                res.json({ message: err })
              })
})

app.use((req, res) => {
  res.status(404).send('404: page not found')
})

app.listen(HTTP_PORT, onHttpStart)
