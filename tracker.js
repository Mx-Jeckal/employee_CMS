var mysql = require("mysql");
var inquirer = require("inquirer");
var pw = require('./pw')
var Font = require('ascii-art-font')
    // var consoleTable = require('console.table');



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
                "View all Employees by Deparment",
                "View all Employees by Manager",
                "Add Employee",
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

                case "View all Employees by Deparment":
                    employeeByDeparment();
                    break;

                case "View all Employees by Manager":
                    employeeByManager();
                    break;

                case "Add Employee":
                    addEmployee();
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


        // for (var i = 0; i < res.length; i++) {

        //     console.table([1, 2, 1, 2])
        // }

    });
    start()

};

function employeeByDeparment() {
    connection.query(`SELECT * FROM departments`, function(err, res) {
        if (err) throw err;
        console.log("-----------------------------");
        console.log("-----------------------------");
        console.log(res)
    });
    start()
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
    const cTable = require('console.table');
    const table = cTable.getTable([{
        name: 'foo',
        age: 10
    }, {
        name: 'bar',
        age: 20
    }]);

    console.log(table);

};

function removeEmployee() {

};

function updateRole() {

};

function updateManager() {

};