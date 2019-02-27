DROP DATABASE IF EXISTS bamazon;

CREATE DATABASE bamazon;

USE bamazon;

CREATE TABLE products (

	item_id INT AUTO_INCREMENT NOT NULL,
    
    product_name VARCHAR(100) NOT NULL,
    
    department_name VARCHAR(50) NOT NULL,
    
    price DECIMAL(5,2) NOT NULL,
    
    stock_quantity INT(10) NOT NULL,

	PRIMARY KEY (item_id)
);

SELECT * FROM products;

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("Giant Gummy Bear", "novelty", 9.99, 10), ("Unicorn Mask", "costumes", 12.99, 15), ("Emergency Beard Guards", "survival-gear", 7.99, 25), ("Dog Lion Mane", "pet-supplies", 2.99, 500), ("Bread Slippers", "clothing", 24.99, 20), ("Flying RC Shark", "entertainment", 34.99, 10), 
("Salt Gun", "pest control", 45.99, 16), ("Exploding Kittins Game", "games", 29.99, 19), ("Earthwork Jerkly", "food", 4.75, 23), ("Sack of Shit", "mystery", 12.00, 27);