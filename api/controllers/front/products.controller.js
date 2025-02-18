const { errorMessage, notFoundError } = require("@/library/functions");
const { Product, Review } = require("@/models");
const { Types } = require("mongoose");

class ProductsController {
  featured = async (req, res, next) => {
    try {
      const products = await Product.find({ status: true, featured: true });

      res.send(products);
    } catch (error) {
      errorMessage(next, error);
    }
  };


  latest = async (req, res, next) => {
    try {
      const products = await Product.find({ status: true }).sort({
        createAt: "desc",
      });

      res.send(products);
    } catch (error) {
      errorMessage(next, error);
    }
  };


  topSelling = async (req, res, next) => {
    try {
      const products = await Product.aggregate()
        .match({ status: true })
        .lookup({
          from: "details",
          localField: "_id",
          foreignField: "productId",
          as: "detail_count",
        })
        .addFields({ detail_count: { $size: "$detail_count" } })
        .sort({ detail_count: "desc" });

      res.send(products);
    } catch (error) {
      errorMessage(next, error);
    }
  };


  byId = async (req, res, next) => {
    try {
      const { id } = req.params;

      const product = await Product.aggregate()
        .match({ status: true, _id: new Types.ObjectId(id) })
        .lookup({
          from: "reviews",
          localField: "_id",
          foreignField: "productId",
          as: "reviews",
        })
        .lookup({
          from: "brands",
          localField: "brandId",
          foreignField: "_id",
          as: "brand",
        });

      if (product.length > 0) {
        product[0].brand = product[0].brand[0];
        res.send(product[0]);
      } else {
        notFoundError(next, "Product");
      }
    } catch (error) {
      errorMessage(next, error);
    }
  };


  byCategoryId = async (req, res, next) => {
    try {
      const { id } = req.params;

      const products = await Product.find({ status: true, categoryId: id });

      res.send(products);
    } catch (error) {
      errorMessage(next, error);
    }
  };


  byBrandId = async (req, res, next) => {
    try {
      const { id } = req.params;

      const products = await Product.find({ status: true, brandId: id });

      res.send(products);
    } catch (error) {
      errorMessage(next, error);
    }
  };


  similar = async (req, res, next) => {
    try {
      const { id } = req.params;

      const product = await Product.findById(id).where({ status: true });

      if (product) {
        const product = await Product.find({
          status: true,
          categoryId: product.categoryId,
          _id: { $ne: id },
        });
        res.send(product);
      } else {
        notFoundError(next, "Product");
      }
    } catch (error) {
      errorMessage(next, error);
    }
  };


  review = async (req, res, next) => {
    try {
      const { id } = req.params;
      const product = await Product.findById(id).where({ status: true });

      if (product) {
        const { comment, rating} = req.body;
        await Review.create({
          comment,
          rating,
          productId: id,
          userId: req.user._id,
        });

        res.send({
          message: "Thank you for your review",
        });
      } else {
        notFoundError(next, "Product");
      }
    } catch (error) {
      errorMessage(next, error);
    }
  };
}

module.exports = new ProductsController();
