var mysql = require("mysql");
var inquirer = require("inquirer");

var connection = mysql.createConnection({
  host: "localhost",

  // Your port; if not 3306
  port: 8889,

  // Your username
  user: "root",

  // Your password
  password: "root",
  database: "Bamazon"
});

connection.connect(function(err) {
    if (err) throw err;
    console.log("connected as id " + connection.threadId + "\n");
    inventory();
  });

  function inventory() {
    console.log("ID | Product | Price | Stock Quantity");
    connection.query("SELECT * FROM products", function(err, res){
        for(var i = 0; i < res.length; i++){
            console.log(res[i].id + " | " + res[i].product_name + " | " + res[i].department_name + " | "
            + res[i].price + " | " + res[i].stock_quanity);

        }
        console.log("------------");
        setTimeout(purchaseItem, 4000);

    });
    
};

function purchaseItem(){
    inquirer.prompt([{
        name: "itemId",
        type: "input",
        message: "What is the item Id of the product you would like to buy?"
    },{
        name: "Quantity",
        type: "input",
        message: "How many would you like to purchase?"
    }]).then(function(response) {
        connection.query("SELECT * FROM products WHERE products.id = ?", [response.itemId], function(err, res) {

            if(res[0].id == response.itemId && res[0].stock_quanity >= parseInt(response.Quantity)) {
                var totalPrice = res[0].price * parseInt(response.Quantity);
                console.log("Successfully Purchase!");
                connection.query("UPDATE products SET ? WHERE ?", [{
                    stock_quanity: res[0].stock_quantity - parseInt(response.Quantity)
                }, {
                    id: res[0].id
                }], function (err, res) {
                    setTimeout(inventory, 1000);
                    setTimeout(function() {console.log("You spent: $" + totalPrice)}, 2000);
                });
            } else {
                res[0].id == response.itemId && res[0].stock_quanity < parseInt(response.Quantity);
                setTimeout(function() {console.log("Insufficient quantity!")}, 2000);
                inventory();
            }
        });
    });
};

