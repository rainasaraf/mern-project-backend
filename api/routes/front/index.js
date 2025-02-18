const { Router } = require("express");
const productsRoutes = require("./products.routes");
const mixRoutes = require("./mix.routes");

const router = Router();

router.use(productsRoutes);
router.use(mixRoutes);

module.exports = router;
