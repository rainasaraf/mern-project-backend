const { validationError, errorMessage } = require("@/library/functions");
const bcrypt = require("bcryptjs");
const { User } = require("@/models");

class RegisterController {
  register = async (req, res, next) => {
    try {
      const { name, email, password, confirmPassword, phone, address } =
        req.body;
      //  const user = await User.findOne({ email });

      // if(user) {
      //     return res.status(409).send({ message: "Email already exists."});
      // }

      if (password == confirmPassword) {
        const hash = bcrypt.hashSync(password);

        await User.create({ name, email, phone, address, password: hash });

        res.status(201).send({
          message: "Thank you for registering. Proceed to log in.",
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
}

module.exports = new RegisterController();
