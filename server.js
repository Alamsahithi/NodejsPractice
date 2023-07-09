const express = require("express");
const mysql = require("mysql2");
const cors = require("cors");

const app = express();
const port = 3000;

// Create a MySQL connection
const connection = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "SriSahi@22",
  database: "restaurantordering",
});

// Connect to the MySQL database
connection.connect((err) => {
  if (err) {
    console.error("Error connecting to MySQL:", err);
    return;
  }
  console.log("Connected to MySQL database");

  // Create the orders table if it doesn't exist
  const createTableQuery = `
    CREATE TABLE IF NOT EXISTS orders (
      id INT AUTO_INCREMENT PRIMARY KEY,
      price DECIMAL(10,2) NOT NULL,
      dish VARCHAR(255) NOT NULL,
      table_no INT NOT NULL
    )
  `;
  connection.query(createTableQuery, (err) => {
    if (err) {
      console.error("Error creating orders table:", err);
      return;
    }
    console.log("Orders table created");
  });
});

// Enable CORS
app.use(cors());

// Parse JSON requests
app.use(express.json());

// Handle POST requests to /order
app.post("/order", (req, res) => {
  const { price, dish, tableNo } = req.body;

  // Insert the order details into the database
  const query = "INSERT INTO orders (price, dish, table_no) VALUES (?, ?, ?)";
  connection.query(query, [price, dish, tableNo], (err, results) => {
    if (err) {
      console.error("Error storing order:", err);
      res.status(500).json({ error: "Failed to store order" });
      return;
    }

    const orderId = results.insertId;

    // Retrieve the stored order from the database
    const selectQuery = "SELECT * FROM orders WHERE id = ?";
    connection.query(selectQuery, [orderId], (err, rows) => {
      if (err) {
        console.error("Error retrieving order:", err);
        res.status(500).json({ error: "Failed to retrieve order" });
        return;
      }

      const order = rows[0];
      res.status(200).json({ order });
    });
  });
});

// Handle GET requests to /orders
app.get("/orders", (req, res) => {
  // Retrieve all orders from the database
  const query = "SELECT * FROM orders";
  connection.query(query, (err, rows) => {
    if (err) {
      console.error("Error retrieving orders:", err);
      res.status(500).json({ error: "Failed to retrieve orders" });
      return;
    }

    res.status(200).json(rows);
  });
});

// Handle DELETE requests to /order/:id
app.delete("/order/:id", (req, res) => {
  const orderId = req.params.id;

  // Delete the order from the database
  const query = "DELETE FROM orders WHERE id = ?";
  connection.query(query, [orderId], (err, result) => {
    if (err) {
      console.error("Error deleting order:", err);
      res.status(500).json({ error: "Failed to delete order" });
      return;
    }

    res.status(200).json({ message: "Order deleted successfully" });
  });
});

// Handle PUT requests to /order/:id
app.put("/order/:id", (req, res) => {
  const orderId = req.params.id;
  const { price, dish, tableNo } = req.body;

  // Update the order details in the database
  const query = "UPDATE orders SET price = ?, dish = ?, table_no = ? WHERE id = ?";
  connection.query(query, [price, dish, tableNo, orderId], (err, result) => {
    if (err) {
      console.error("Error updating order:", err);
      res.status(500).json({ error: "Failed to update order" });
      return;
    }

    res.status(200).json({ message: "Order updated successfully" });
  });
});

// Define the /orders/:id route for fetching a single order's details
app.get("/orders/:id", (req, res) => {
  const orderId = req.params.id;

  connection.query(
    "SELECT * FROM orders WHERE id = ?",
    [orderId],
    (err, result) => {
      if (err) {
        console.error(err);
        res.status(500).send("Error fetching order details");
      } else {
        if (result.length === 0) {
          res.status(404).send("Order not found");
        } else {
          res.json(result[0]);
        }
      }
    }
  );
});
// Handle PUT requests to /order/:id
app.put("/order/:id", (req, res) => {
    const orderId = req.params.id;
    const { price, dish, tableNo } = req.body;
  
    // Check if the order exists in the database
    const checkOrderQuery = "SELECT * FROM orders WHERE id = ?";
    connection.query(checkOrderQuery, [orderId], (err, rows) => {
      if (err) {
        console.error("Error checking order:", err);
        res.status(500).json({ error: "Failed to update order" });
        return;
      }
  
      if (rows.length === 0) {
        res.status(404).json({ error: "Order not found" });
        return;
      }
  
      // Update the order details in the database
      const updateQuery = "UPDATE orders SET price = ?, dish = ?, table_no = ? WHERE id = ?";
      connection.query(updateQuery, [price, dish, tableNo, orderId], (err, result) => {
        if (err) {
          console.error("Error updating order:", err);
          res.status(500).json({ error: "Failed to update order" });
          return;
        }
  
        res.status(200).json({ message: "Order updated successfully" });
      });
    });
  });
  

// Start the server
app.listen(port, () => {
  console.log(`Server is listening on port ${port}`);
});
