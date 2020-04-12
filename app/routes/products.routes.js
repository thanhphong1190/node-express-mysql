module.exports = app => {
    const products = require("../controllers/products.controller");
  
    // Create a new Customer
    app.post("/products", products.create);
  
    // Retrieve all products
    app.get("/products", products.findAll);
  
    // Retrieve a single Customer with customerId
    app.get("/products/:productId", products.findOne);

    // Retrieve a multi product with categoryId
    app.get("/products/bycategoryid/:cateId", products.findByCateId);
  
    // Update a Customer with customerId
    app.put("/products/:productId", products.update);
  
    // Delete a Customer with customerId
    app.delete("/products/:productId", products.delete);
  };
  