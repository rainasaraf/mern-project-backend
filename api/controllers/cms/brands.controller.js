const { errorMessage, notFoundError } = require("@/library/functions");
const { Brand } = require("@/models");

class BrandsController {
  index = async (req, res, next) => {
    try {
      const brands = await Brand.find();

      res.send(brands);
    } catch (error) {
      errorMessage(next, error);
    }
  };

  create = async (req, res, next) => {
    try {
      const { name, status } = req.body;

      await Brand.create({ name, status });

      res.status(201).send({
        message: "Brand added.",
      });
    } catch (error) {
      errorMessage(next, error);
    }
  };

  show = async (req, res, next) => {
    try {
      const { id } = req.params;

      const customer = await Brand.findById(id);

      if (customer) {
        res.send(customer);
      } else {
        notFoundError(next, "Brand");
      }
    } catch (error) {
      errorMessage(next, error);
    }
  };

  update = async (req, res, next) => {
    try {
      const { id } = req.params;

      const customer = await Brand.findById(id);

      if (customer) {
        const { name, status } = req.body;

        await Brand.findByIdAndUpdate(
          id,
          { name, status },
          { runValidators: true }
        );

        res.send({
          message: "Brand updated.",
        });
      } else {
        notFoundError(next, "Brand");
      }
    } catch (error) {
      errorMessage(next, error);
    }
  };

  destroy = async (req, res, next) => {
    try {
      const { id } = req.params;

      const customer = await Brand.findById(id);

      if (customer) {
        await Brand.findByIdAndDelete(id);

        res.send({
          message: "Brand deleted.",
        });
      } else {
        notFoundError(next, "Brand");
      }
    } catch (error) {
      errorMessage(next, error);
    }
  };
}

module.exports = new BrandsController();
