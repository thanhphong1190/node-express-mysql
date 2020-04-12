const Category = require("../models/categories.model");


// Create and Save a new Customer
exports.create = (req, res) => {
    // Validate request
    if (!req.body) {
        res.status(400).send({
            message: "Content can not be empty!"
        });
    }

    // Create a Category
    const category = new Category({
        name: req.body.name
    });

    // Save Category in the database
    Category.create(category, (err, data) => {
        if (err)
            res.status(500).send({
                message:
                    err.message || "Some error occurred while creating the Category."
            });
        else res.send(data);
    });
};

// Retrieve all Categories from the database.
exports.findAll = (req, res) => {
    Category.getAll((err, data) => {
        if (err)
            res.status(500).send({
                message:
                    err.message || "Some error occurred while retrieving categories."
            });
        else res.send(data);
    });
};

// Find a single Category with a customerId
exports.findOne = (req, res) => {
    Category.findById(req.params.categoryId, (err, data) => {
        if (err) {
            if (err.kind === "not_found") {
                res.status(404).send({
                    message: `Not found Category with id ${req.params.categoryId}.`
                });
            } else {
                res.status(500).send({
                    message: "Error retrieving Category with id " + req.params.categoryId
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

    Category.updateById(
        req.params.categoryId,
        new Category(req.body),
        (err, data) => {
            if (err) {
                if (err.kind === "not_found") {
                    res.status(404).send({
                        message: `Not found Category with id ${req.params.categoryId}.`
                    });
                } else {
                    res.status(500).send({
                        message: "Error updating Category with id " + req.params.categoryId
                    });
                }
            } else res.send(data);
        }
    );
};

// Delete a Category with the specified customerId in the request
exports.delete = (req, res) => {
    Category.remove(req.params.categoryId, (err, data) => {
        if (err) {
            if (err.kind === "not_found") {
                res.status(404).send({
                    message: `Not found Category with id ${req.params.categoryId}.`
                });
            } else {
                res.status(500).send({
                    message: "Could not delete Category with id " + req.params.categoryId
                });
            }
        } else res.send({ message: `Category was deleted successfully!` });
    });
};