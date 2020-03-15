var mysql = require("mysql");
var inquirer = require("inquirer");
var pw = require('./pw')
var Font = require('ascii-art-font')
const cTable = require('console.table');



// create the connection information for the sql database
var connection = mysql.createConnection({
    host: "localhost",

    // Your port; if not 3306
    port: 3306,

    // Your username
    user: "root",

    // Your password
    password: pw.password,
    database: "employee_tracker_db"
});

// connect to the mysql server and sql database
connection.connect(function(err) {
    if (err) throw err;
    console.log("connected as id " + connection.threadId);
    // run the start function after the connection is made to prompt the user
    Font.create("EMPLOYEE", "Doom", function(err, res) {
        console.log("-----------------------------------------")
        console.log(res)
        if (err) throw err;
    });
    Font.create("MANAGER", "Doom", function(err, res) {
        // console.log("-----------------------------------------")
        console.log(res)
        if (err) throw err;
    });
    start();
});

// Font.fontPath = './Fonts';

function start() {

    inquirer
        .prompt({
            name: "menu",
            type: "list",
            message: "What would you like to do?",
            choices: [
                "View all Employees",
                "View all Departments",
                "View all Employees by Manager",
                "Add Employee",
                "Add Department",
                "Add Role",
                "Remove Employee",
                "Update Employee Role",
                "Update Employee Manager"
            ]
        })
        .then(function(answer) {

            switch (answer.menu) {
                case "View all Employees":
                    viewEmployees();
                    break;

                case "View all Departments":
                    viewDepartments();
                    break;

                case "View all Employees by Manager":
                    employeeByManager();
                    break;

                case "Add Employee":
                    addEmployee();
                    break;

                case "Add Department":
                    addDepartment();
                    break;

                case "Add Role":
                    addRole();
                    break;

                case "Remove Employee":
                    removeEmployee();
                    break;

                case "Update Employee Role":
                    updateRole();
                    break;

                case "Update Employee Manager":
                    updateManager();
                    break;
            }
        })

}

function viewEmployees() {
    connection.query(`SELECT * FROM employees`, function(err, res) {
            if (err) throw err;

            Font.create("EMPLOYEE ROSTER", "rusted", function(err, result) {
                console.log("-----------------------------------------");
                console.log(result);
                if (err) throw err;

                console.log("The number of employees: " + res.length);

            });

            var roster = [];
            for (var i = 0; i < res.length; i++) {
                var thisEmp = {
                    Employee: `${res[i].first_name} ${res[i].last_name}`,
                    Manager: `${res[i].manager_id}`
                }

                roster.push(thisEmp)

            }

            var table = cTable.getTable(roster)
            console.log(table)
        }

    );
    start()

};

function viewDepartments() {
    connection.query(`SELECT * FROM departments`, function(err, res) {
        console.log('this isn"t the problem')
        if (err) throw err;
        var roster = [];
        for (var i = 0; i < res.length; i++) {
            var depts = {
                Departments: `${res[i].dept_name}`
            }

            roster.push(depts)

        }

        var table = cTable.getTable(roster)
        console.log(table)
    });
    start();
};

function employeeByManager() {
    connection.query(`SELECT IFNULL(CONCAT(m.first_name, ' ', m.last_name), '-self-') AS 'Manager', CONCAT(e.first_name, ' ', e.last_name) AS 'Employee', r.title, r.salary
    FROM employees e
        LEFT JOIN employees m ON m.id = e.manager_id
        JOIN roles r ON e.role_id = r.id
        JOIN departments d ON d.id = r.dept_id
    ORDER BY m.first_name ASC;`, function(err, res) {
        if (err) throw err;

        console.log("-----------------------------");
        console.log("-----------------------------");
        for (var i = 0; i < res.length; i++) {

            console.log(`${res[i].Manager} manages ${res[i].Employee} and their title is ${res[i].title}`)
                // for (var i = 0; i < res.length; i++) {
                //     var managerList = res[i].first_name + " " + res[i].last_name
                //     var pushList = [];
                //     // Array.prototype.push.apply(managerList)
                //     pushList.push.apply(managerList)
                //     console.log(pushList)
                // }
                // console.log(pushList)
                // inquirer.prompt({
                //     name: "manager",
                //     type: "list",
                //     message: "Pleasse select by Manager: ",
                //     choices: pushList
        }

    });
    start()
}


function addEmployee() {
    inquirer
        .prompt([{
                name: "first_name",
                type: "input",
                message: "What is the Employee's First Name?"
            },

            {
                name: "last_name",
                type: "input",
                message: "What is the Employee's Last Name?"
            }

        ])
        .then(nameresponse => {
            connection.query("SELECT title FROM roles", function(err, results) {
                if (err) throw err;
                inquirer
                    .prompt([{
                        name: "choice",
                        type: "rawlist",
                        message: "What is the Employee's Role?",
                        choices: function() {
                            var choiceArray = [];
                            for (var i = 0; i < results.length; i++) {
                                choiceArray.push(results[i].title);
                            }
                            return choiceArray;
                        }

                    }]).then(department => {
                        connection.query("SELECT * FROM employees WHERE role_id = 'Supervisor'", function(err, results) {
                            if (err) throw err;
                            inquirer
                                .prompt([{
                                    name: "choice",
                                    type: "rawlist",
                                    message: "Who is the Employee's Manager?",
                                    choices: function() {
                                        var choiceArray = [];
                                        for (var i = 0; i < results.length; i++) {
                                            choiceArray.push(results[i].first_name + " " + results[i].last_name);
                                            console.log(choiceArray);
                                        }
                                        return choiceArray;
                                    }

                                }]).then(function(roleanswer) {
                                    console.log(roleanswer)
                                    connection.query("INSERT INTO employees SET ?", {
                                        first_name: nameresponse.first_name,
                                        last_name: nameresponse.last_name,
                                        role_id: department.choice,
                                        manager_id: roleanswer.choice
                                    })
                                    start();
                                });
                        })
                    })
            });
        })
};

function addDepartment() {

    inquirer
        .prompt({
            name: "addDept",
            type: "input",
            message: "Enter the name of the new Department"
        }).then(deptRes => {
            connection.query("INSERT INTO departments SET ?", {
                dept_name: deptRes.addDept
            })
            start();
        })

};

function addRole() {

    inquirer
        .prompt([{
                name: "addRo",
                type: "input",
                message: "Enter the name of the new Role"
            },

            {
                name: "addSal",
                type: "input",
                message: "Enter the Anual Salary for this Role"
            }

        ]).then(deptRes => {
            console.log(deptRes)
            connection.query("INSERT INTO roles SET ?", {
                title: deptRes.addRo,
                salary: deptRes.addSal,
            })
            start();
        })

};

function removeEmployee() {

};

// connection.query("SELECT * FROM employees WHERE role_id = 'Supervisor'", function(err, results) {
//             if (err) throw err;
//             inquirer
//                 .prompt([{
//                     name: "choice",
//                     type: "rawlist",
//                     message: "Who is the Employee's Manager?",
//                     choices: function() {
//                         var choiceArray = [];
//                         for (var i = 0; i < results.length; i++) {
//                             choiceArray.push(results[i].first_name + " " + results[i].last_name);
//                             console.log(choiceArray);
//                         }
//                         return choiceArray;
//                     }

//                 }])

function updateRole() {
    connection.query("SELECT * FROM employees", function(err, results) {
        if (err) throw err;
        inquirer
            .prompt([{
                name: "choice",
                type: "rawlist",
                message: "Update which Employee's Role?",
                choices: function() {
                    var choiceArray = [];
                    for (var i = 0; i < results.length; i++) {
                        choiceArray.push(results[i].first_name);
                    }
                    return choiceArray;
                }
            }])
            .then(function(nameList) {
                connection.query("SELECT title FROM roles", function(err, results) {
                    if (err) throw err;
                    inquirer
                        .prompt([{
                            name: "choice",
                            type: "rawlist",
                            message: `What is ${nameList.choice}'s new Role?`,
                            choices: function() {
                                var choiceArray = [];
                                for (var i = 0; i < results.length; i++) {
                                    choiceArray.push(results[i].title);
                                }
                                return choiceArray;
                            }

                        }])

                    .then(function(roleList) {
                        connection.query("UPDATE employees SET ? WHERE ?", [{
                                role_id: roleList.choice
                            },
                            {
                                first_name: nameList.choice,
                            }
                        ], () => {
                            console.log('Updating data base...');
                            console.log('.....................');
                            console.log('.....................')
                            start();
                        })
                    })
                })
            })
    })


};

function updateManager() {

};