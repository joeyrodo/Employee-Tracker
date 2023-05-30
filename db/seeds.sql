INSERT INTO department (name)
VALUES ("sample_dpmt_1"),
       ("sample_dpmt_2"),
       ("sample_dpmt_3");
       
INSERT INTO role (title, salary, department_id)
VALUES 
        ("sample_role_1", 1000000, 1),
        ("sample_role_2", 800000, 1),
        ("sample_role_3", 750000, 1),
        ("sample_role_4", 450000, 2),
        ("sample_role_5", 100000, 2);

INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES 
        ("first1", "last1", 1, null),
        ("first2", "last2", 2, 1),
        ("first3", "last3", 3, 1),
        ("first4", "last4", 4, 2),
        ("first5", "last5", 5, 2);