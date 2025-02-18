// const { Router } = require("express")
// const { Cms } = require("@/controllers")
// const {upload} = require('@/library/middleware')

// const router = Router();

// router.route("/")
//   .get(Cms.ProductsCtrl.index)
//   .post(upload().array('images'),Cms.ProductsCtrl.create)

// router
//   .route("/:id")
//   .get(Cms.ProductsCtrl.show)
//   .put(upload().array("images"), Cms.ProductsCtrl.update)
//   .patch(upload().array("images"), Cms.ProductsCtrl.update)
//   .delete(Cms.ProductsCtrl.destroy)

// module.exports = router

const { Router } = require("express");
const { Cms } = require("@/controllers");
const { upload } = require("@/library/middlewares");

const router = Router();

router
  .route("/")
  .get(Cms.ProductsCtrl.index)
  .post(upload().array("images"), Cms.ProductsCtrl.create);

router
  .route("/:id")
  .get(Cms.ProductsCtrl.show)
  .put(upload().array("images"), Cms.ProductsCtrl.update)
  .patch(upload().array("images"), Cms.ProductsCtrl.update)
  .delete(Cms.ProductsCtrl.destroy);

router.delete("/:id/images/:filename", Cms.ProductsCtrl.image);

module.exports = router;
