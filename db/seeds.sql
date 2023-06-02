INSERT INTO department (name)
VALUES ("Pharmacy"),
       ("Front End"),
       ("Floral"),
       ("Prepared Foods");
       
INSERT INTO role (title, salary, department_id)
VALUES 
        ("Cashier", 1000000, 1),
        ("Cashier", 800000, 2),
        ("Cashier", 750000, 3),
        ("Cashier", 450000, 4),
        ("Chef", 100000, 4);

INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES 
        ("Squidward", "Tentacles", 1, 3),
        ("Sheldon", "Plankton", 2, 2),
        ("Eugene", "Krabs", 3, 3),
        ("Gary", "Snail", 4, 5),
        ("Spongebob", "Squarepants", 5, 3);