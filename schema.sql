CREATE DATABASE bamazon;
USE bamazon;

CREATE TABLE products (
	id INT NOT NULL AUTO_INCREMENT,
    product_name VARCHAR(50) NULL,
    department_name VARCHAR(50) NULL,
    price DECIMAL(10, 4) NULL,
    stock_quanity INTEGER (10) NULL,
    PRIMARY KEY(id)
);

INSERT INTO products (product_name, department_name, price, stock_quanity)
VALUES ("Toliet Paper", "Household Supplies", 5.00, 100), ("Firestick", "Electronics", 29.99, 1000), ("Nitendo Switch", "Electronics", 200.00, 500),
("Sheets", "Bedroom", 20.00, 200), ("Sharpies", "Office Supplies", 6.50, 100), ("Diffuser", "Wellness & Relaxtion", 15.99, 40),
("Beard Oil", "Personal Care", 14.88, 50), ("Air Freshners", "Household Supplies", 4.99, 30), ("Camelbak", "Sports & Outdoors", 12.72, 80),
("Sunglasses", "Sports & Outdoors", 59.99, 40);


SELECT * FROM products;