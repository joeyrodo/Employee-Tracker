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

app.use((req, res) => {
  res.status(404).end();
});


app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});


let mainPrompt = [
  {
    type: 'list',
    name: 'mainPrompt',
    choices: ['View all departments', 'View all roles', 'View all employees', 'Add a department', 'Add a role', 'Add an employee', 'Update an employee role'],
    message: 'Select an option: '
  },

]

let departmentPrompt = [
  {
    // TEXT QUESTION
    type: 'input',
    name: 'name',
    message: 'Enter a name for the new department: '
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
  db.query('SELECT name FROM department', function (err, results) {
    console.table(results);
    startQuestions();
  });
}

function viewRoles() {
  console.log("viewing roles...");
  db.query("SELECT role.title, role.id, department.name, role.salary from role join department on role.department_id = department.id", function (err, results) {
    console.table(results);
    startQuestions();
  });
}

function viewEmployees() {
  console.log("viewing employees...");
  const query = `
  SELECT employee.id, employee.first_name, employee.last_name, role.title, role.salary, department.name, CONCAT (manager.first_name," ", manager.last_name) AS manager FROM employee
  JOIN role on employee.role_id = role.id
  JOIN department on role.department_id = department.id
  JOIN employee manager ON manager.id = employee.manager_id
  `;
  db.query(query, (err, res) => {
    if (err) throw err;
    console.table(res);
    startQuestions();
  });
}

function addDepartment() {
  console.log("adding a department...");
  inquirer.prompt(departmentPrompt)
    .then(answers => {
      const query = `
        INSERT INTO department set ?`;
      db.query(query, answers, (err, res) => {
        if (err) throw err;
        console.log(`${answers.name} added!`);
        startQuestions();
      })
    });
}

function addRole() {
  console.log("adding a role...");
  db.query(`SELECT * FROM department`, (err, res) => {
    if (err) throw err;
    const departmentArray = res.map(dpt => ({ name: dpt.name, value: dpt.id }));
    let rolePrompt = [
      {
        // TEXT QUESTION
        type: 'input',
        name: 'title',
        message: 'Enter a title for the new job: '
      },

      {
        type: 'input',
        name: 'salary',
        message: 'Enter a salary for the new job: '
      },

      {
        type: 'list',
        name: 'department_id',
        message: 'Choose a department for the new job: ',
        choices: departmentArray
      },
    ]

    inquirer.prompt(rolePrompt)
      .then(answers => {
        const query = `
      INSERT INTO role set ?`;
        db.query(query, answers, (err, res) => {
          if (err) throw err;
          console.log(`${answers.title} added!`);
          startQuestions();
        })
      });
  })
}

function addEmployee() {
  console.log("adding an employee...");
  db.query(`SELECT * FROM role`, (err, res) => {
    if (err) throw err;
    const roleArray = res.map(role => ({ name: role.title, value: role.id }));

    db.query(`SELECT * FROM employee`, (err, data) => {
      if (err) throw err;
      const managerArray = data.map(emp => ({ name: `${emp.first_name} ${emp.last_name}`, value: emp.id }));
      let employeePrompt = [
        {
          // TEXT QUESTION
          type: 'input',
          name: 'first_name',
          message: 'Enter the first name of the new employee: '
        },

        {
          // TEXT QUESTION
          type: 'input',
          name: 'last_name',
          message: 'Enter the last name of the new employee: '
        },

        {
          type: 'list',
          name: 'role_id',
          message: 'Choose a role for the new employee: ',
          choices: roleArray
        },

        {
          type: 'list',
          name: 'manager_id',
          message: 'Choose a role for the new employee: ',
          choices: managerArray
        },
      ]

      inquirer.prompt(employeePrompt)
        .then(answers => {
          const query = `
      INSERT INTO employee set ?`;
          db.query(query, answers, (err, res) => {
            if (err) throw err;
            console.log(`${answers.first_name} ${answers.last_name} added!`);
            startQuestions();
          })
        });
    })
  })
}

function updateEmployeeRole() {
  console.log("updating an employee role...");
  db.query(`SELECT * FROM role`, (err, res) => {
    if (err) throw err;
    const roleArray = res.map(role => ({ name: role.title, value: role.id }));

    db.query(`SELECT * FROM employee`, (err, data) => {
      if (err) throw err;
      const employeeArray = data.map(emp => ({ name: `${emp.first_name} ${emp.last_name}`, value: emp.id }));

      let employeePrompt = [
        {
          type: 'list',
          name: 'id',
          message: 'Choose the employee to update: ',
          choices: employeeArray
        },

        {
          type: 'list',
          name: 'role_id',
          message: 'Choose the updated role for the employee: ',
          choices: roleArray
        },
      ]

      inquirer.prompt(employeePrompt)
        .then(answers => {
          console.log(answers)
          const query = `
      UPDATE employee set role_id = ? where id = ?`;
          db.query(query, [answers.role_id, answers.id], (err, res) => {
            if (err) throw err;
            console.log(`Employee updated!`);
            startQuestions();
          })
        });
    })
  })
}