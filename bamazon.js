// Require SQL
var mysql = require("mysql");
// Require console.table (allows you to print stuff in a table format)
require("console.table");
// require inquirer (allows you to solicit user input)
var inquirer = require("inquirer");
// require the clear console package
var clear = require('clear');

var cart = 0;
var totalPurchase = 0;


// Connect to MySQL
var connection = mysql.createConnection({
  host: "localhost",
  port: 3306,
  user: "root",
  // Password (removed for submission)
  password: "Readyplayer1",
  database: "bamazon"
});

// call the database
function loadDatabase(outofstock) {
    connection.query("SELECT * FROM products", function(err, res) {
    if (err) throw err;
    clear();
    
    console.log("-------------------------------------------------------------");
    console.log("Current Cart Balance: $" + totalPurchase.toFixed(2))
    console.log("-------------------------------------------------------------");
    console.table(res)
    if (outofstock) {
      console.log("Sorry, that item was out of stock");
    }
    productNumber(res);
  });
}

// get item selection from customer (Inquirer)
function productNumber(inventory) {
   inquirer.prompt([
      {
        type: "input",
        name: "choice",
        message: "Enter id number of product you wish to purchase:",
      }]).then(function(val) {
        // parse id from user choice

        var choiceId = parseInt(val.choice);


        var product = checkinventory(inventory, choiceId)      
        if (product) {
          selectQuantity(product);
        }
        else {
          
          console.log("\nSorry, that does not match an inventory number.");
          loadDatabase();
        }
      });
}

function checkinventory(inventory, choiceId) {
        // cycle through inventory to check for match
        for (var i = 0; i < inventory.length; i++) {
          if (inventory[i].item_id === choiceId) {
            console.log("You selected item: " + inventory[i].product_name);
            // If matching -> set product equal to inventory number
            var product = inventory[i];
            // passes back the product number
            return product;
          }
        }
        return null;
}

function selectQuantity(product) {
  // prompt user to select quantity
  inquirer.prompt([
      {
        type: "input",
        name: "quantity",
        message: "How many would you like to buy?",
      }
  ]).then(function(val) {

    var quantity = parseInt(val.quantity);

      
    if (quantity > product.stock_quantity) {
      loadDatabase(true);
    }
    else {
      makePurchase(product, quantity);
    }
  });
}


function makePurchase(product, quantity) {
  connection.query(
    "UPDATE products SET stock_quantity = stock_quantity - ? WHERE item_id = ?",
    [quantity, product.item_id],
    function(err, res) {

      cart = product.price * quantity;
      totalPurchase = totalPurchase + cart;


      console.log("You added " + quantity + " " + product.product_name + " to your cart." + "($" + cart.toFixed(2) + ")");

      console.log("\nYour Total is:  $" + totalPurchase.toFixed(2) + "\r\n");
      continueshopping(totalPurchase);
    }
  );
}

function  continueshopping(totalPurchase) {
inquirer.prompt([
      {
        type: "list",
        name: "continue",
        message: "Would you like to continue shopping?",
        choices: ['Yes', 'No'],
      }
  ]).then(function(val) {
    
    if (val.continue === 'Yes') {
      loadDatabase(false);
    }
    else{
      checkout(totalPurchase);
    }
  
  });

}

function checkout(totalPurchase) {
  clear();
  console.log("-------------------------------------------------------------");
  console.log("Your cart-total is: $" + totalPurchase);

  console.log("   Plus tax: $" + (totalPurchase*0.07).toFixed(2));
  console.log("   Plus shipping and handling: $5.95");
  var total = totalPurchase*1.07 + 5.95;
  console.log("Total: $" + total.toFixed(2) + "\n");
  console.log("Please provide payment information to checkout.");
  console.log("-------------------------------------------------------------");
  process.exit();
}


// callback function
connection.connect(function(err) {
  if (err) {
    console.error("error connecting: " + err.stack);
  }
  loadDatabase(false);
});
