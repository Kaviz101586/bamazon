var mysql = require("mysql");
var inquirer = require("inquirer");

var connection = mysql.createConnection({
    host: "localhost",
    port: 3306,
    user: "root",
    password: "root",
    database: "bamazon_db"
});

connection.connect(function (err) {
    if (err) throw err;
    console.log("Welcome to BAM-azon! Please select from the following:");
    start();
});

function start() {
    inquirer.prompt([{
        type: "list",
        name: "menu",
        message: "What would you like to do?",
        choices: ["Order a product","Exit"]
    }]).then(function(response) {
        if(response.menu ==="Order a product") {
            console.log("Please select a product to purchase");
            orderProduct();
        }
        else {
            console.log("Goodbye");
            connection.end();
        }
    })
}

function orderProduct() {
    connection.query("SELECT * FROM products", function(err, response) {
        if (err) throw (err);

        inquirer.prompt([
            {
                name: "selection",
                type: "rawlist",
                choices: function() {
                    var selectionArray = [];
                    for (var i = 0; i<response.length; i++) {
                        selectionArray.push(response[i].product_name);
                    }
                    return selectionArray;
                },
                message: "What would you like to purchase?"
            },
            {
                name: "selectQty",
                type: "input",
                message: "How many would you like to order?"
            }
        ])
        .then(function(answer) {
            var selectedItem;
            for (var i = 0; i <response.length; i++) {
                if (response[i].product_name === answer.selection) {
                    selectedItem = response[i];
                }
            }

            if(selectedItem.stock_quantity < parseInt(answer.selectQty)) {
                console.log("Sorry, we do not have that many - please reenter your order.")
            } else {
                connection.query(
                    "UPDATE products SET ? WHERE ?",
                    [
                        {
                            stock_quantity: selectedItem.stock_quantity - answer.selectQty
                        },
                        {
                            id: selectedItem.id
                        }
                    ],
                    function(err) {
                        if (err) throw (err); 
                        console.log("You have purchased "+JSON.stringify(selectedItem.product_name)+" for "+answer.selectQty*selectedItem.price+". Order successful!");
                        start();
                    }
                );
            }
        })
    })
}