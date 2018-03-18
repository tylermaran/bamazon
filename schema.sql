-- SQL schema
DROP DATABASE IF EXISTS bamazon;
CREATE DATABASE bamazon;
-- Creat and use database
USE bamazon;

-- Create table within database
CREATE TABLE products(
  -- auto-incrementing id
  item_id INT AUTO_INCREMENT NOT NULL,
  -- create rows in table, not null, and assign type
  product_name VARCHAR(45) NOT NULL,
  department_name VARCHAR(45) NOT NULL,
  stock_quantity INT(10) NOT NULL,
  -- the decimal function (10,2) gives up to a 10 digit number, and up to two decimal places
  price DECIMAL(10,2) NOT NULL,
  primary key(item_id)
);

-- insert dummy data into the SQL table
INSERT INTO products (product_name, department_name, stock_quantity, price)
VALUES ("Bruce Lee Punching Bag", "Misc", 1 , 204.15),
    ("Snuggie", "Clothes", 45, 19.99),
    ("Frozen Pears", "Food", 12, 4.52),
    ("Tuxedo T-Shirt", "Clothes", 50, 40.00),
    ("Piano", "Entertainment", 15, 299.99),
    ("Misc DVDs", "Entertainment", 200, 5.99),
    ("Girl Scout Cookier", "Food", 45, 19.99),
    ("Espresso Maker", "Food", 25, 89.95),
    ("Bear Trap", "Misc", 1, 56.50);
  
  SELECT * FROM products;
