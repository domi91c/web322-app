var fs = require('fs')

var employees = []
var departments = []

module.exports.initialize = () => new Promise((resolve, reject) => {
  try {
    fs.readFile('./data/employees.json', (err, data) => {
      if (err) throw err
      employees = JSON.parse(data)
      resolve('Working...')
    })
    fs.readFile('./data/departments.json', (err, data) => {
      if (err) throw err
      departments = JSON.parse(data)
      resolve('Working...')
    })
  } catch (err) {
    reject('Initialization Failed')
  }
})

module.exports.getAllEmployees = () => {
  var response = []
  return new Promise((resolve, reject) => {
    for (var i = 0; i < employees.length; i++) {
      response.push(employees[i])
    }
    if (response.length === 0) {
      reject('no results returned')
    }
    resolve(response)
  })
}

module.exports.getEmployeesByStatus = status => {
  var response = []
  return new Promise((resolve, reject) => {
    for (let i = 0; i < employees.length; i++) {
      if (employees[i].status === status) {
        response.push(employees[i])
      }
    }
    if (response.length === 0) {
      reject('no results returned')
    }
    resolve(response)
  })
}

module.exports.getEmployeesByDepartment = department => {
  var response = []
  return new Promise((resolve, reject) => {
    for (let i = 0; i < employees.length; i++) {
      if (employees[i].department === department) {
        response.push(employees[i])
      }
    }
    if (response.length === 0) {
      reject('no results returned')
    }
    resolve(response)
  })
}

module.exports.getEmployeesByManager = manager => {
  var response = []
  return new Promise((resolve, reject) => {
    for (let i = 0; i < employees.length; i++) {
      if (employees[i].employeeManagerNum === manager) {
        response.push(employees[i])
      }
    }
    if (response.length === 0) {
      reject('no results returned')
    }
    resolve(response)
  })
}

module.exports.getEmployeeByNum = num => {
  return new Promise((resolve, reject) => {
    for (let i = 0; i < employees.length; i++) {
      if (employees[i].employeeNum == num) {
        resolve(employees[i])
      }
    }
    reject('no employees found')
  })
}

module.exports.getManagers = () => {
  var response = []
  return new Promise((resolve, reject) => {
    if (employees.length === 0) {
      reject('no results returned')
    } else {
      for (var i = 0; i < employees.length; i++) {
        if (employees[i].isManager === true) {
          response.push(employees[i])
        }
      }
      if (response.length === 0) {
        reject('no results returned')
      }
    }
    resolve(response)
  })
}

module.exports.getDepartments = () => {
  var response = []
  return new Promise((resolve, reject) => {
    if (employees.length === 0) {
      reject('no results returned')
    } else {
      for (var i = 0; i < departments.length; i++) {
        response.push(departments[i])
      }
      if (response.length === 0) {
        reject('no results returned')
      }
    }
    resolve(response)
  })
}