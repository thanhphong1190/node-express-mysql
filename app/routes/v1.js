const customerRoute = require("./customer.routes");
const categoryRoute = require("./categories.routes");
const productRoute = require("./products.routes");

module.exports = router => {
    customerRoute(router);
    categoryRoute(router);
    productRoute(router);
}