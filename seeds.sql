INSERT INTO departments (dept_name) VALUES ('Service');
INSERT INTO departments (dept_name) VALUES ('Warehouse');
INSERT INTO departments (dept_name) VALUES ('Parts');

INSERT INTO roles (title, salary, dept_id) VALUES ('Stock Clerk II', 40000, 3);
INSERT INTO roles (title, salary, dept_id) VALUES ('Stock Clerk I', 35000, 3);
INSERT INTO roles (title, salary, dept_id) VALUES ('Forklift driver', 35000, 2);
INSERT INTO roles (title, salary, dept_id) VALUES ('Shipping Dock', 28000, 2);
INSERT INTO roles (title, salary, dept_id) VALUES ('Technician', 85000, 1);
INSERT INTO roles (title, salary, dept_id) VALUES ('Quality Assurance', 50000, 1);
INSERT INTO roles (title, salary, dept_id) VALUES ('Supervisor', 60000, null);



INSERT INTO employees (first_name, last_name, role_id, manager_id) VALUES ('Sam', 'Near', 5, 3);
INSERT INTO employees (first_name, last_name, role_id, manager_id) VALUES ('Tina', 'Rich', 7, null);
INSERT INTO employees (first_name, last_name, role_id, manager_id) VALUES ('Curtis', 'King', 7, 2);
INSERT INTO employees (first_name, last_name, role_id, manager_id) VALUES ('Brent', 'Willey', 7, null);
INSERT INTO employees (first_name, last_name, role_id, manager_id) VALUES ('Hazel', 'Tuxhorn', 1, 2);
INSERT INTO employees (first_name, last_name, role_id, manager_id) VALUES ('Tyler', 'Waughn', 4, 4);
INSERT INTO employees (first_name, last_name, role_id, manager_id) VALUES ('Larry', 'Tipton', 5, 3);