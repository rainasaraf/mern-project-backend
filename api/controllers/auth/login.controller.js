//const exp = require("constants")
const { errorMessage, validationError, env } = require("@/library/functions");
const { User } = require("@/models");
const bcryptjs = require("bcryptjs");
const jwt = require("jsonwebtoken");

class LoginController {
  login = async (req, res, next) => {
    try {
      const { email, password } = req.body;

      const user = await User.findOne({ email }).select("+password");

      if (user) {
        if (bcryptjs.compareSync(password, user.password)) {
          if (user.status) {
            const token = jwt.sign(
              {
                uid: user._id,
                iat: Math.floor(Date.now() / 1000),
                exp: Math.floor(Date.now() / 1000) + 30 * 24 * 60 * 60,
              },
              env("JWT_SECRET")
            );

            res.send({ token });
          } else {
            validationError(next, {
              email: "The account is deactivated.",
            });
          }
        } else {
          validationError(next, {
            password: "The password is incorrect.",
          });
        }
      } else {
        validationError(next, {
          email: "The given email is not registered.",
        });
      }
    } catch (error) {
      errorMessage(next, error);
    }
  };
}
module.exports = new LoginController();
