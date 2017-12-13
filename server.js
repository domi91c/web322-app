/**********************************************************************************
 *  WEB322 –Assignment 4
 *  I declare that this assignment is my own work in accordance with Seneca Academic Policy.
 *  No part of this assignment has been copied manually or electronically from any other source
 *  (including web sites) or distributed to other students.
 *
 *  Name: Dominic Nunes Student ID: 016-183-121 Date: 2017-11-26
 *
 *  Online (Heroku) URL: http://web322-app1.herokuapp.com/
 *********************************************************************************/

const express = require('express')
const path = require('path')
const app = express()
const data_service = require('./data-service.js')
const exphbs = require('express-handlebars')
const bodyParser = require('body-parser')
const HTTP_PORT = process.env.PORT || 8080

function onHttpStart() {
  console.log('Express listening on port ' + HTTP_PORT)
  return new Promise((res, req) => {
    data_service.initialize()
                .then(data => {
                  console.log(data)
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
                .then(data => {
                  res.render('employeeList', { data: data, title: 'Employees' })
                })
                .catch(err => {
                  res.render('employeeList', { data: {}, title: 'Employees' })
                })
  } else if (req.query.department) {
    data_service.getEmployeesByDepartment(req.query.department)
                .then(data => {
                  res.render('employeeList', { data: data, title: 'Employees' })
                })
                .catch(err => {
                  res.render('employeeList', { data: {}, title: 'Employees' })
                })
  } else if (req.query.manager) {
    data_service.getEmployeesByManager(req.query.manager)
                .then(data => {
                  res.render('employeeList', { data: data, title: 'Employees' })
                })
                .catch(err => {
                  res.render('employeeList', { data: {}, title: 'Employees' })
                })
  } else {
    data_service.getAllEmployees()
                .then(data => {
                  res.render('employeeList', { data: data, title: 'Employees' })
                })
                .catch(err => {
                  res.render('employeeList', { data: {}, title: 'Employees' })
                })
  }
})

app.get('/employee/:num', (req, res) => {
  data_service.getEmployeeByNum(req.params.num)
              .then(data => {
                res.render('employee',
                    { data: data, title: 'Employee' })
              })
              .catch(err => {
                res.render('employee',
                    { data: {}, title: 'Employee' })
              })
})

app.get('/managers', (req, res) => {
  data_service.getManagers()
              .then(data => {
                res.render('employeeList',
                    { data: data, title: 'Employees (Managers)' })
              })
              .catch(err => {
                res.render('employeeList',
                    { data: {}, title: 'Employees (Managers)' })
              })
})

app.get('/departments', (req, res) => {
  data_service.getDepartments()
              .then(data => {
                res.render('departmentList',
                    { data: data, title: 'Departments' })
              })
              .catch(err => {
                res.render('departmentList', { data: {}, title: 'Departments' })
              })
})

app.get('/departments/add', (req, res) => {
  res.render('addDepartment')
})

app.post('/departments/add', (req, res) => {
  data_service.addDepartment(req.body)
              .then(data => {
                res.redirect('/departments')
              })
})

app.get('/department/:departmentId', (req, res) => {
  data_service.getDepartmentById(req.params.departmentId)
              .then(data => {
                res.render('department',
                    { data: data, title: 'Department' })
              })
              .catch(err => {
                res.render('department',
                    { data: {}, title: 'Department' })
              })
})

app.post('/employee/update', (req, res) => {
  data_service.updateEmployee(req.body)
              .then(data => {
                res.redirect('/employees')
              })
})

app.get('/employees/add', (req, res) => {
  res.render('addEmployee')
})

app.post('/employees/add', (req, res) => {
  data_service.addEmployee(req.body)
              .then(data => {
                res.redirect('/employees')
              })
              .catch(err => {
                res.redirect('/employees')
              })
})

app.use((req, res) => {
  res.status(404).send('404: page not found')
})

app.listen(HTTP_PORT, onHttpStart)

