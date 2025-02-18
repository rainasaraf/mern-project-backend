const { errorMessage, notFoundError } = require("@/library/functions");
const { User, Category } = require("@/models");

class CategoryController {
  index = async (req, res, next) => {
    try {
      const category = await Category.find();

      res.send(category);
    } catch (error) {
      errorMessage(next, error);
    }
  };

  create = async (req, res, next) => {
    try {
      const { name, status } = req.body;

      await Category.create({
        name,
        status,
        role: "category",
      });

      res.status(201).send({
        message: "category added.",
      });
    } catch (error) {
      errorMessage(next, error);
    }
  };

  show = async (req, res, next) => {
    try {
      const { id } = req.params;

      const category = await Category.findById(id);

      if (category) {
        res.send(category);
      } else {
        notFoundError(next, "Category");
      }
    } catch (error) {
      errorMessage(next, error);
    }
  };

  update = async (req, res, next) => {
    try {
      const { id } = req.params;

      const category = await Category.findById(id);

      if (category) {
        const { name, status } = req.body;

        await User.findByIdAndUpdate(
          id,
          { name, status },
          { runValidators: true }
        );

        res.send({
          message: "category updated.",
        });
      } else {
        notFoundError(next, "Category");
      }
    } catch (error) {
      errorMessage(next, error);
    }
  };

  destroy = async (req, res, next) => {
    try {
      const { id } = req.params;

      const category = await Category.findById(id);

      if (category) {
        await Category.findByIdAndDelete(id);

        res.send({
          message: "category deleted.",
        });
      } else {
        notFoundError(next, "Category");
      }
    } catch (error) {
      errorMessage(next, error);
    }
  };
}

module.exports = new CategoryController();
