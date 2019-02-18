DROP DATABASE IF EXISTS bamazon;
CREATE DATABASE bamazon;

USE bamazon;

CREATE TABLE products (
    id INTEGER(11) AUTO_INCREMENT NOT NULL,
    product_name VARCHAR(100) NOT NULL,
    department_name VARCHAR(100) NOT NULL,
    price DECIMAL(10,4) NOT NULL,
    stock_quantity INT(16) NULL,
    PRIMARY KEY (id)
);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("E.T. The Extra-Terrestrial", "Blu-ray",8.70, 100),("Dilly Dilly Drinking Funny Baby Onesie","Clothing", 10.99, 150),("The Beautiful Poetry of Donald Trump (Canons)","Books", 9.30, 15),("Funfetti Cake Mix","Food",4.53,25),("Pet MD - Dog Ear Cleaner Wipes","Pet Supplies",10.00,40),("PURELL Multi Surface Disinfectant Spray","Health and Household",10.96, 50),("Bissell ProHeat 2X Revolution Pet Pro Full-Size Carpet Cleaner","Industrial and Scientific",239.99, 5),("Potty Putter Toilet Time Golf Game","Sports and Outdoors",10.99, 70),("Energizer MAX AA Batteries","Health and Household",19.95, 200),("KDLINKS XVIS-10 Full-HD Wide Angle Dashboard Car DVR Vehicle Dash Cam with G-Sensor","Electronics",69.98,20),("Sunstar 540RYC GUM Fine Unwaxed Floss","Campaigns",5.09,10)