const Sequelize = require('sequelize')

var sequelize = new Sequelize('d84f7qmjeuffb6', 'oezvkzddwqdghf',
    '13df9ed758fce366fa2fb0ff7af376045d5edbb210b703fa5f7dfab878ca7859', {
      host: 'ec2-54-243-211-197.compute-1.amazonaws.com',
      dialect: 'postgres',
      port: 5432,
      dialectOptions: { ssl: true },
    })

var Employee = sequelize.define('Employee', {
  employeeNum: {
    type: Sequelize.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  firstName: Sequelize.STRING,
  lastName: Sequelize.STRING,
  email: Sequelize.STRING,
  SSN: Sequelize.STRING,
  addressStreet: Sequelize.STRING,
  addresCity: Sequelize.STRING,
  addressPostal: Sequelize.STRING,
  maritalStatus: Sequelize.STRING,
  isManager: Sequelize.BOOLEAN,
  employeeManagerNum: Sequelize.INTEGER,
  status: Sequelize.STRING,
  department: Sequelize.INTEGER,
  hireDate: Sequelize.STRING,
})

var Department = sequelize.define('Department', {
  departmentId: {
    type: Sequelize.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  departmentName: Sequelize.STRING,
})

module.exports.initialize = () => new Promise((resolve, reject) => {
  sequelize.sync().then(function() {
    resolve()
  }).catch(() => {
    reject('unable to sync database')
  })
})

module.exports.addEmployee = (employeeData) => new Promise(
    (resolve, reject) => {
      employeeData.isManager = (employeeData.isManager) ? true : false
      for (let key in employeeData) {
        if (employeeData.hasOwnProperty(key) && employeeData[key] === '') {
          employeeData[key] = null
        }
      }
      Employee.create({
        firstName: employeeData.firstName,
        lastName: employeeData.lastName,
        email: employeeData.email,
        SSN: employeeData.SSN,
        addressStreet: employeeData.addressStreet,
        addresCity: employeeData.addresCity,
        addressPostal: employeeData.addressPostal,
        maritalStatus: employeeData.maritalStatus,
        isManager: employeeData.isManager,
        employeeManagerNum: employeeData.employeeManagerNum,
        status: employeeData.status,
        department: employeeData.department,
        hireDate: employeeData.hireDate,
      }).then(() => {
        resolve()
      }).catch(() => {
        reject('unable to create employee')
      })
    })

module.exports.updateEmployee = (employeeData) => {
  return new Promise((resolve, reject) => {
    sequelize.sync().then(() => {
      for (let x in employeeData) {
        if (employeeData[x] === '') {
          employeeData[x] = null
        }
      }
      employeeData.isManager = (employeeData.isManager) ? true : false
      resolve(Employee.update({
        firstName: employeeData.firstName,
        last_name: employeeData.last_name,
        email: employeeData.email,
        addressStreet: employeeData.addressStreet,
        addresCity: employeeData.addresCity,
        addressPostal: employeeData.addressPostal,
        addressState: employeeData.addressPostal,
        isManager: employeeData.isManager,
        employeeManagerNum: employeeData.employeeManagerNum,
        status: employeeData.status,
        department: employeeData.department,
      }, {
        where: {
          employeeNum: employeeData.employeeNum,
        },
      }))
    }).catch(() => {
      reject('unable to create employee.')
    })
  })
}

module.exports.addDepartment = (departmemntData) => new Promise(
    (resolve, reject) => {
      for (let key in departmemntData) {
        if (departmemntData.hasOwnProperty(key) &&
            departmemntData[key] === '') {
          departmemntData[key] = null
        }
      }
      Department.create({
        departmentName: departmemntData.departmentName,
      }).then(() => {
        resolve()
      }).catch(() => {
        reject('unable to create employee')
      })
    })

module.exports.updateDepartment = (departmentData) =>
    new Promise((resolve, reject) => {
      sequelize.sync().then(() => {
        for (let key in departmentData) {
          if (departmentData[key] === '') {
            departmentData[key] = null
          }
        }
        resolve(Department.update({
          departmentName: departmentData.departmentName,
        }, {
          where: {
            departmentId: departmentData.departmentId,
          },
        }))
      }).catch(() => {
        reject('unable to update department.')
      })
    })

module.exports.getDepartmentById = (id) => new Promise(
    (resolve, reject) => {
      Department.findAll({
        where: {
          departmentId: id,
        },
      }).then(function(data) {
        resolve(data)
      }).catch(() => {
        reject('no results returned')
      })
    })

module.exports.getAllEmployees = () => new Promise((resolve, reject) => {
  Employee.findAll({}).then(function(data) {
    resolve(data)
  }).catch(() => {
    reject('no results returned')
  })
})

module.exports.getEmployeesByStatus = (status) => new Promise(
    (resolve, reject) => {
      Employee.findAll({
        where: {
          status: status,
        },
      }).then(function(data) {
        resolve(data)
      }).catch(() => {
        reject('no results returned')
      })
    })

module.exports.getEmployeesByDepartment = (department) => new Promise(
    (resolve, reject) => {
      Employee.findAll({
        where: {
          departmentId: department,
        },
      }).then(function(data) {
        resolve(data)
      }).catch(() => {
        reject('no results returned')
      })
    })

module.exports.getEmployeesByManager = (manager) => new Promise(
    (resolve, reject) => {
      Employee.findAll({
        where: {
          employeeManagerNum: manager,
        },
      }).then(function(data) {
        resolve(data)
      }).catch(() => {
        reject('no results returned')
      })
    })

module.exports.getEmployeeByNum = (employeeNum) => new Promise(
    (resolve, reject) => {
      Employee.findAll({
        where: {
          employeeNum: employeeNum,
        },
      }).then(function(data) {
        resolve(data)
      }).catch(() => {
        reject('no results returned')
      })
    })

module.exports.getManagers = () => new Promise((resolve, reject) => {
  Employee.findAll({
    where: {
      isManager: true,
    },
  }).then(function(data) {
    resolve(data)
  }).catch(() => {
    reject('no results returned')
  })
})

module.exports.getDepartments = () => new Promise((resolve, reject) => {
  Department.findAll({}).then(function(data) {
    resolve(data)
  }).catch(() => {
    reject('no results returned')
  })
})