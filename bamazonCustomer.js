//ARRAY OF COMMAND TYPES
var products = ['my-tweets','spotify-this-song','movie-this','do-what-it-says','read-log','exit'];

//DEPENDENCY FOR INQUIRER NPM PACKAGE
var inquirer = require("inquirer");
var fs = require("fs");
var cliff = require("cliff");

require('console.table');

//import mysql
var mysql = require("mysql");

	//Create a connection to the database
var connection = mysql.createConnection({
    host: "localhost",
    port: "3306",
    user: "root",
    password: "bamcamlam87!",
    database: "bamazondb"
});
connection.connect(function (err){
    if (err) throw err;
    console.log("Connected as Id " + connection.threadId);
});



var runProgram = function(){
	var prodID = 0;
	var prodUnits = 0;
	
 	 inquirer.prompt([
            {
              name: "productID",
              type: "input",
              message: "Enter the ID of the product you would like to purchase",
              
            },
            {
              name: "productUnits",
              type: "input",
              message: "How many units of the product they would like to buy",
              
            }
          ]).then(function(answer) {
	            prodID = answer.productID;	
	            prodUnits = answer.productUnits;
	            updatedQuantity = 0;

	            if(prodID !== 0){
		          	connection.query("SELECT stock_quantity FROM products WHERE item_id =?",[prodID], function (err, response){
		          	//If the number of units and stock quantity is not 0 then do
		          	if(prodUnits !== 0 && response[0].stock_quantity >= prodUnits){

		          		//SUBTRACT THE NUMBER OF ORDERED UNITS FROM STOCK QUANTITY
		          		updatedQuantity =   response[0].stock_quantity - prodUnits;
		          		//QUERY FOR ITEM ID, PRODUCT NAME, AND PRICE
		          		connection.query("SELECT item_id,product_name,price FROM products WHERE item_id =?",[prodID], function (err, res){
		          			var totalPrice = 0;

		          			//TOTAL THE PRICE ACCORDING TO THE QUANTITY SELECTED
		          			for(var p = 0;p < prodUnits; p++  ){
		          				totalPrice += res[0].price;
		          			}

		          			//CONSOLE LOG NAME OF PRODUCTION AND TOTAL PURCHASE PRICE
		          			console.log("Thank you for purchasing " + res[0].product_name + ". You're order total is " + totalPrice);

		          			//CALL FUNCTION TO UPDATE QUNTITY OF ITEM JUST PURCHASED
		          			updateQuantity(res[0].item_id,updatedQuantity);

		          			//ASK USER IF THEY WOULD LIKE TO PLACE ANOTHER ORDER
		          			placeAnotherOrder();
		          		});
		          	}else{
		          		console.log("Insufficient quantity!");

		          		//ASK USER IF THEY WOULD LIKE TO PLACE ANOTHER ORDER
		          		placeAnotherOrder();

		          	}
	          	});
	          }				
	                                  
          });//END OF then(function(answer)
     
}; //END OF RunProgram FUNCTION


var displayProducts = function(){

	connection.query("SELECT * FROM products", function (err, res){
		//Array to hold objects with product info.
		var prodArray = [];   

		//Loop through the response  
	    for (var i = 0; i < res.length; i++){
	    	//capture product info into object
	    	var productObj = {
	    		ID: res[i].item_id,
	    		Product: res[i].product_name,
	    		Department: res[i].department_name,
	    		Price: res[i].price,
	    		Quantity: res[i].stock_quantity
	    	}

	    	//Push product object info to prodArray
	    	prodArray.push(productObj);
	        
	    }

	    //Console the infor out in a table
	    //Readable format for user
	    console.table(prodArray);
	   
	    console.log("------------------------------------------------------------------------")
	    runProgram();
	});
	
};

//UPDATES THE QUANTITY OF THE PURCHASED ITEM
var updateQuantity = function(itemId,updatedQuantity){
	connection.query("UPDATE products SET stock_quantity = ? WHERE item_id =?",[updatedQuantity,itemId], function (err, res){
		if (err) throw err;
    	
	});	
};

var placeAnotherOrder = function(){
	//ASK USER IF THEY WANT TO PLACE ANOTHER ORDER
	inquirer.prompt([							
		{
			name: "continue",
			type: "confirm",
			message: "Place another order?",
			default: "Y"
		}
	]).then(function(answer) {
		//IF TRUE THEN RUN THE PROGRAM (RECURSION)
		if(answer.continue === true){
			displayProducts();
		//ELSE EXIT PROGRAM
		}else{
			console.log("Bye!");
		}
	}); 				
};//END OF placeAnotherOrder FUNCTION
displayProducts();
