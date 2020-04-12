const sql = require("./db.js");

// constructor
const Product = function (product) {
    this.name = product.name;
    this.description = product.description;
    this.price = product.price;
    this.active = product.active;
    this.category_id = product.category_id;
};

Product.create = (newProduct, result) => {
    sql.query("INSERT INTO products SET ?", newProduct, (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(err, null);
            return;
        }

        console.log("created Product: ", { id: res.insertId, ...newProduct });
        result(null, { id: res.insertId, ...newProduct });
    });
};

Product.findById = (productId, result) => {
    sql.query(`SELECT * FROM products WHERE id = ${productId}`, (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(err, null);
            return;
        }

        if (res.length) {
            console.log("found Product: ", res[0]);
            result(null, res[0]);
            return;
        }

        // not found Product with the id
        result({ kind: "not_found" }, null);
    });
};

Product.findByCateId = (cateId, result) => {
    sql.query(`SELECT * FROM products WHERE category_id = ${cateId}`, (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(err, null);
            return;
        }

        if (res.length) {
            console.log("found Product: ", res);
            result(null, res);
            return;
        }

        // not found Product with the id
        result({ kind: "not_found" }, null);
    });
};

Product.getAll = result => {
    sql.query("SELECT * FROM products", (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(null, err);
            return;
        }

        console.log("products: ", res);
        result(null, res);
    });
};

Product.updateById = (id, Product, result) => {
    sql.query(
        "UPDATE products SET name = ? WHERE id = ?",
        [Product.name, id],
        (err, res) => {
            if (err) {
                console.log("error: ", err);
                result(null, err);
                return;
            }

            if (res.affectedRows == 0) {
                // not found Product with the id
                result({ kind: "not_found" }, null);
                return;
            }

            console.log("updated Product: ", { id: id, ...Product });
            result(null, { id: id, ...Product });
        }
    );
};


Product.remove = (id, result) => {
    sql.query("DELETE FROM products WHERE id = ?", id, (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(null, err);
        return;
      }
  
      if (res.affectedRows == 0) {
        // not found Product with the id
        result({ kind: "not_found" }, null);
        return;
      }
  
      console.log("deleted Product with id: ", id);
      result(null, res);
    });
  };

  
module.exports = Product;