CREATE DATABASE employee_tracker_db;



USE employee_tracker_db;

CREATE TABLE clients
(
	id int NOT NULL AUTO_INCREMENT,
	client_name varchar(255) NOT NULL,
	PRIMARY KEY (id)
);

CREATE TABLE departments
(
	id int NOT NULL AUTO_INCREMENT,
	dept_name varchar(30) NOT NULL,
	PRIMARY KEY (id)
);
CREATE TABLE roles
(
	id int NOT NULL AUTO_INCREMENT,
	title varchar(30) NOT NULL,
    salary DECIMAL(10,2) NOT NULL,
    dept_id INT,
	PRIMARY KEY (id),
	FOREIGN KEY (dept_id) REFERENCES departments(id)
);
CREATE TABLE employees
(
	id int NOT NULL AUTO_INCREMENT,
	first_name varchar(30) NOT NULL,
    last_name varchar(30) NOT NULL,
    role_id varchar(20),
    manager_id INT DEFAULT NULL REFERENCES roles(title),
	PRIMARY KEY (id)
)