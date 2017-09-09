# bamazon

### The app displays all the products in a table format and then prompts the user
### for the item id they would like to order. 
![first image](https://larcmo87.github.io/bamazon/images/tablePromt1.jpg)

### Then the user is promted for the quantity of the item the user would like to purchase.
![second image](https://larcmo87.github.io/bamazon/images/promt2.jpg)

### Logic will check to see if the quantity of item being purchases is greater than or equal 
### to the quantity of the item in the database. If the quantity is not enough then the user
### recieve a console log message of *'Insufficient quantity!'*
![console response](https://larcmo87.github.io/bamazon/images/insufficientResponse.jpg)

### Else the user will recieve a console log messege thanking them for the purchase of the selected item and the order total.
![console response](https://larcmo87.github.io/bamazon/images/consoleresponse1.jpg)

### The item's quantity in the database table will updated accordingly.
### Before Update:
![before update](https://larcmo87.github.io/bamazon/images/tableBeforeUpdate.jpg)

### After Update:
![after update](https://larcmo87.github.io/bamazon/images/tableAfterUpdate.jpg)


#### ****************Create MySQL Table*********************
DROP DATABASE IF EXISTS bamazonDB;

CREATE DATABASE bamazonDB;

USE bamazonDB;

CREATE TABLE products (
	item_id INT NOT NULL AUTO_INCREMENT,
	product_name VARCHAR(45) NOT NULL,
	department_name VARCHAR(45) NOT NULL,
    price DECIMAL(5,2) NOT NULL,
    stock_quantity INTEGER(4) NOT NULL,   
	PRIMARY KEY (item_id)
);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES('17 Inch Laptop Back Pack','Accessories', 34.89, 40);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES('Samsung 50 Inch TV','Electronics', 640.99, 12);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES('Bose Headphones','Audible', 150.78, 10);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES('3 Piece Dining Set','Dining', 355.89, 8);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES('FitBit Activity Band','Smart Wear', 129.88, 20);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES('9.5 Inch Portable DVD Player','Electronics', 65.00, 15);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES('USB 3.0 Cable (3ft)','Accessories', 21.99, 14);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES('Electric Drill','Tools', 32.99, 5);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES('1500 Lumens LCD Mini Projector','Electronics', 89.99, 8);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES('NetGear Smart WiFi Router','Electronics', 130.69, 30);