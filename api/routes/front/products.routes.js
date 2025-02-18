const { Router } = require("express");
const { Front } = require("@/controllers");
const { customerOnly, auth } = require("@/library/middlewares");

const router = Router();

router.get("/products/featured",Front.ProductsCtrl.featured);

router.get("/products/latest", Front.ProductsCtrl.latest);

router.get("/products/top-selling", Front.ProductsCtrl.topSelling);

router.get("/products/:id", Front.ProductsCtrl.byId);

router.get("/products/:id/similar", Front.ProductsCtrl.similar);

router.post(
  "/products/:id/review",
  auth,
  customerOnly,
  Front.ProductsCtrl.review
)

module.exports = router;
