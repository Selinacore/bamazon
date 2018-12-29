
var mysql = require("mysql");
var inquirer = require("inquirer");
var Table = require("easy-table");


var connection = mysql.createConnection({
    host: "localhost",
    port: 8080,
    user: "root",
    password: "root",
    database: "bamazon"
  });

connection.connect(function (err) {
  if (err) throw err;
  console.log("connected as id " + connection.threadId + "\n");

    // console.log ("Welcome to the world of oddities!");
    showProducts();
});


function showAllProducts() {

  var query = "SELECT * FROM products";

  
  connection.query(query, function (err, res) {
    console.log(Object.values(res));

    var t = new Table

    res.forEach(function (res) {
      t.cell('Product ID', res.item_id)
      t.cell('Product', res.product_name)
      t.cell('Department', res.department_name)
      t.cell('Unit Price, USD', res.price, Table.number(2))
      t.cell('Stock Quantity', res.stock_quantity)
      t.newRow()
    })

    console.log(t.toString())

    purchaseProduct();
  })
}

function purchaseProduct() {

  inquirer
    .prompt({
      name: "purchase",
      type: "input",
      message: "What product ID would you like to purchase?",
      validate: function(value){
        if(isNaN(value)===false){
            return true
        }
        console.log("please enter a valid number");
    }
    })
    .then(function (answer) {

      inquirer
        .prompt({
          name: "quantity",
          type: "input",
          message: "You picked item " + answer.purchase + "! How many would you like?",
          validate: function(value){
            if(isNaN(value)===false){
                return true
            }
            console.log("please enter a valid number");
        }
        })
        .then(function (answer2) {

          connection.query("SELECT stock_quantity FROM products WHERE ?", {stock_quantity: answer2.quantity}, function (err, res) {

            for (var i = 0; i < res.length; i++);
            
          })
        })
    });
}

