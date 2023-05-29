INSERT INTO department (name)
VALUES ("Crusaders"),
       ("Assassins");
       
INSERT INTO role (title, salary, department_id)
VALUES 
        ("Commander", 1000000, 1),
        ("Firefighter", 800000, 1),
        ("Electrician", 750000, 1),
        ("Hair Stylist", 450000, 2),
        ("Motivational Speaker", 100000, 2);

INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES 
        ("Kliff", "Undersn", 1, null),
        ("Sol", "Badguy", 2, 1),
        ("Ky", "Kiske", 3, 1),
        ("Millia", "Rage", 4, 2),
        ("Zato", "One", 5, 2);