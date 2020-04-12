module.exports = app => {
    const categories = require("../controllers/categories.controller");
  
    // Create a new Customer
    app.post("/categories", categories.create);
  
    // Retrieve all categories
    app.get("/categories", categories.findAll);
  
    // Retrieve a single Customer with customerId
    app.get("/categories/:categoryId", categories.findOne);
  
    // Update a Customer with customerId
    app.put("/categories/:categoryId", categories.update);
  
    // Delete a Customer with customerId
    app.delete("/categories/:categoryId", categories.delete);
  };
  