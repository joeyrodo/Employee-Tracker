const inquirer = require('inquirer');
const express = require('express');
// Import and require mysql2
const mysql = require('mysql2');


const PORT = process.env.PORT || 3309;
const app = express();

// Express middleware
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

// Connect to database
const db = mysql.createConnection(
  {
    host: 'localhost',
    // MySQL username,
    user: 'root',
    // MySQL password
    password: 'root',
    database: 'employee_db'
  },
  console.log(`Connected to the employee_db database.`)
  );


// // Query database
// db.query('SELECT * from department;', function (err, results) {
//   console.log(results);
// });

// db.query('SELECT * from role;', function (err, results) {
//   console.log(results);
// });

// db.query('SELECT * from employee;', function (err, results) {
//   console.log("employee results")
//   console.log(results);
// });

// Default response for any other request (Not Found)
app.use((req, res) => {
  res.status(404).end();
});


app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});




let mainPrompt = [
  {
      // TEXT QUESTION
      type: 'list',
      name: 'mainPrompt',
      choices: ['View all departments', 'View all roles', 'View all employees', 'Add a department', 'Add a role', 'Add an employee', 'Update an employee role'],
      message: 'Select an option: '
  },
 
]

startQuestions();

function startQuestions() {
  inquirer.prompt(mainPrompt)
      .then(answers => {
          answers.mainPrompt == 'View all departments' ? viewDepartments()
            : answers.mainPrompt == 'View all roles' ? viewRoles()
            : answers.mainPrompt == 'View all employees' ? viewEmployees()
            : answers.mainPrompt == 'Add a department' ? addDepartment()
            : answers.mainPrompt == 'Add a role' ? addRole()
            : answers.mainPrompt == 'Add an employee' ? addEmployee()
            : answers.mainPrompt == 'Update an employee role' ? updateEmployeeRole()
            : console.log("Uh oh, something went wrong")
      })
}

function viewDepartments() {
  console.log("viewing departments...");
}

function viewRoles() {
  console.log("viewing roles...");
}

function viewEmployees() {
  console.log("viewing employees...");
}

function addDepartment() {
  console.log("adding a department...");
}

function addRole() {
  console.log("adding a role...");
}

function addEmployee() {
  console.log("adding an employee...");
}

function updateEmployeeRole() {
  console.log("updating an employee role...");
}