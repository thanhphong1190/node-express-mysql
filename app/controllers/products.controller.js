const Product = require("../models/products.model");


// Create and Save a new Customer
exports.create = (req, res) => {
    // Validate request
    if (!req.body) {
        res.status(400).send({
            message: "Content can not be empty!"
        });
    }

    // Create a Product
    const product = new Product({
        name: req.body.name,
        description: req.body.description,
        price: req.body.price,
        active: req.body.active,
        category_id: req.body.category_id
    });

    // Save Product in the database
    Product.create(product, (err, data) => {
        if (err)
            res.status(500).send({
                message:
                    err.message || "Some error occurred while creating the Product."
            });
        else res.send(data);
    });
};

// Retrieve all products from the database.
exports.findAll = (req, res) => {
    Product.getAll((err, data) => {
        if (err)
            res.status(500).send({
                message:
                    err.message || "Some error occurred while retrieving products."
            });
        else res.send(data);
    });
};

// Find a single Product with a customerId
exports.findOne = (req, res) => {
    Product.findById(req.params.productId, (err, data) => {
        if (err) {
            if (err.kind === "not_found") {
                res.status(404).send({
                    message: `Not found Product with id ${req.params.productId}.`
                });
            } else {
                res.status(500).send({
                    message: "Error retrieving Product with id " + req.params.productId
                });
            }
        } else res.send(data);
    });
};

// Find a some Product with a categoryId
exports.findByCateId = (req, res) => {
    Product.findByCateId(req.params.cateId, (err, data) => {
        if (err) {
            if (err.kind === "not_found") {
                res.status(404).send({
                    message: `Not found Product with cateId ${req.params.cateId}.`
                });
            } else {
                res.status(500).send({
                    message: "Error retrieving Product with cateId " + req.params.cateId
                });
            }
        } else res.send(data);
    });
};


// Update a Customer identified by the customerId in the request
exports.update = (req, res) => {
    // Validate Request
    if (!req.body) {
        res.status(400).send({
            message: "Content can not be empty!"
        });
    }

    console.log(req.body);

    Product.updateById(
        req.params.productId,
        new Product(req.body),
        (err, data) => {
            if (err) {
                if (err.kind === "not_found") {
                    res.status(404).send({
                        message: `Not found Product with id ${req.params.productId}.`
                    });
                } else {
                    res.status(500).send({
                        message: "Error updating Product with id " + req.params.productId
                    });
                }
            } else res.send(data);
        }
    );
};

// Delete a Product with the specified customerId in the request
exports.delete = (req, res) => {
    Product.remove(req.params.productId, (err, data) => {
        if (err) {
            if (err.kind === "not_found") {
                res.status(404).send({
                    message: `Not found Product with id ${req.params.productId}.`
                });
            } else {
                res.status(500).send({
                    message: "Could not delete Product with id " + req.params.productId
                });
            }
        } else res.send({ message: `Product was deleted successfully!` });
    });
};