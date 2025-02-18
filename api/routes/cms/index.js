const { Router } = require("express");
const staffsRoutes = require("./staffs.routes");
const { adminOnly } = require("@/library/middlewares");
const categoriesRoutes = require("./categories.routes");
const brandsRoutes = require("./brands.routes");
const customersRoutes = require("./customer.routes");
const productsRoutes = require("./products.routes");
const reviewsRoutes = require("./reviews.routes");
const ordersRoutes = require("./orders.routes");

const router = Router();

router.use("/staffs", adminOnly, staffsRoutes);

router.use("/categories", categoriesRoutes);

router.use("/brands", brandsRoutes);

router.use("/customers", customersRoutes);

router.use("/products", productsRoutes);

router.use("/reviews", reviewsRoutes);

router.use("/orders", ordersRoutes);


module.exports = router;
