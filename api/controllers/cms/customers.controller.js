const { errorMessage, notFoundError } = require("@/library/functions");
const { User } = require("@/models");
const bcrypt = require("bcryptjs");

class CustomersController {
  index = async (req, res, next) => {
    try {
      const customers = await User.find({ role: "Customer" });

      res.send(customers);
    } catch (error) {
      errorMessage(next, error);
    }
  };

  create = async (req, res, next) => {
    try {
      const { name, email, password, confirmPassword, phone, address, status } =
        req.body;

      if (password == confirmPassword) {
        const hash = bcrypt.hashSync(password);

        await User.create({
          name,
          email,
          phone,
          address,
          password: hash,
          status,
          role: "Customer",
        });

        res.status(201).send({
          message: "Customer added.",
        });
      } else {
        validationError(next, {
          password: "The password is not confirmed.",
        });
      }
    } catch (error) {
      errorMessage(next, error);
    }
  };

  show = async (req, res, next) => {
    try {
      const { id } = req.params;

      const customer = await User.findById(id);

      if (customer && customer.role == "Customer") {
        res.send(customer);
      } else {
        notFoundError(next, "Customer");
      }
    } catch (error) {
      errorMessage(next, error);
    }
  };

  update = async (req, res, next) => {
    try {
      const { id } = req.params;

      const customer = await User.findById(id);

      if (customer && customer.role == "Customer") {
        const { name, phone, address, status } = req.body;

        await User.findByIdAndUpdate(
          id,
          { name, phone, address, status },
          { runValidators: true }
        );

        res.send({
          message: "Customer updated.",
        });
      } else {
        notFoundError(next, "Customer");
      }
    } catch (error) {
      errorMessage(next, error);
    }
  };

  destroy = async (req, res, next) => {
    try {
      const { id } = req.params;

      const customer = await User.findById(id);

      if (customer && customer.role == "Customer") {
        await User.findByIdAndDelete(id);

        res.send({
          message: "Customer deleted.",
        });
      } else {
        notFoundError(next, "Customer");
      }
    } catch (error) {
      errorMessage(next, error);
    }
  };
}

module.exports = new CustomersController();
