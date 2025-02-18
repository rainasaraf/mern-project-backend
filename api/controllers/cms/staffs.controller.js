const { errorMessage, notFoundError } = require("@/library/functions");
const { User } = require("@/models");
const bcrypt = require("bcryptjs");

class StaffsController {
  index = async (req, res, next) => {
    try {
      const staffs = await User.find({ role: "Staff" });

      res.send(staffs);
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
          role: "Staff",
        });

        res.status(201).send({
          message: "Staff added.",
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

      const staff = await User.findById(id);

      if (staff && staff.role == "Staff") {
        res.send(staff);
      } else {
        notFoundError(next, "Staff");
      }
    } catch (error) {
      errorMessage(next, error);
    }
  };

  update = async (req, res, next) => {
    try {
      const { id } = req.params;

      const staff = await User.findById(id);

      if (staff && staff.role == "Staff") {
        const { name, phone, address, status } = req.body;

        await User.findByIdAndUpdate(
          id,
          { name, phone, address, status },
          { runValidators: true }
        );

        res.send({
          message: "Staff updated.",
        });
      } else {
        notFoundError(next, "Staff");
      }
    } catch (error) {
      errorMessage(next, error);
    }
  };

  destroy = async (req, res, next) => {
    try {
      const { id } = req.params;

      const staff = await User.findById(id);

      if (staff && staff.role == "Staff") {
        await User.findByIdAndDelete(id);

        res.send({
          message: "Staff deleted.",
        });
      } else {
        notFoundError(next, "Staff");
      }
    } catch (error) {
      errorMessage(next, error);
    }
  };
}

module.exports = new StaffsController();
