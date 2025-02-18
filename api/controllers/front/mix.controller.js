const { errorMessage, notFoundError } = require("@/library/functions");
const { Category, Brand, Order, Product, Detail } = require("@/models");

class MixController {
  categories = async (req, res, next) => {
    try {
      const categories = await Category.find({ status: true });

      res.send(categories);
    } catch (error) {
      errorMessage(next, error);
    }
  }


  categoryById = async (req, res, next) => {
    try {
      const { id } = req.params;

      const category = await Category.findById(id).where({ status: true });

      if (category) {
        res.send(category);
      } else {
        notFoundError(next, "Category");
      }
    } catch (error) {
      errorMessage(next, error);
    }
  }

  

  brands = async (req, res, next) => {
    try {
      const brands = await Brand.find({ status: true });

      res.send(brands);
    } catch (error) {
      errorMessage(next, error);
    }
  };


  brandById = async (req, res, next) => {
    try {
      const { id } = req.params;

      const brand = await Brand.findById(id).where({ status: true });

      if (brand) {
        res.send(brand);
      } else {
        notFoundError(next, "Brand");
      }
    } catch (error) {
      errorMessage(next, error);
    }
  };


  checkout = async (req, res, next) => {
    try {
      const { cart } = req.body;

      const order = await Order.create({ userId: req.user._id });

      for (let item of cart) {
        const product = await Product.findById(item.productId);

        const price =
          product.discountedPrice > 0 ? product.discountedPrice : product.price;

        const total = price * item.qty;

        await Detail.create({
          productId: item.productId,
          orderId: order._id,
          price,
          total,
          qty: item.qty,
        });
        res.send({
          message: "Thank you for your order. ",
        });
      }
    } catch (error) {
      errorMessage(next, error);
    }
  };
}

module.exports = new MixController
