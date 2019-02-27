
var mysql = require("mysql");
var inquirer = require("inquirer");
var Table = require("easy-table");


var connection = mysql.createConnection({
    host: "localhost",
    port: 8889,
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


function showProducts() {

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

    purchaseProduct(res);
  })
}

function purchaseProduct(productData) {

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
          //for loop through productData until find product ID matches what user puts in
          // save to var "chosen item" use that var to write if else (if chosen item.stock quangtity is < answer2.quantity then console log insufficent stock)
          //
          var chosenItem;
          for (var i = 0; i < productData.length; i++) {
            if (parseInt(answer.purchase) === productData[i].item_id) {
              chosenItem = productData[i];
            } 

          }
          if (parseInt(answer2.quantity) > chosenItem.stock_quantity) {
            console.log("Insufficient quantitiy");
            showProducts ();
          } else {
            connection.query("UPDATE products SET stock_quantity = stock_quantity - ? WHERE item_id = ?", [parseInt(answer2.quantity)
              , answer.purchase], function (err, res) {
                console.log("You have sucessfully purchased " + answer2.quantity + " of " + chosenItem.product_name);
                console.log("Your total is " + answer2.quantity * chosenItem.price);
                
              })
          }
          
        })
    });
}


