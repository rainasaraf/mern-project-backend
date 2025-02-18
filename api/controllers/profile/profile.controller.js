const { errorMessage, validationError } = require("@/library/functions");
const { User, Review, Order, Detail } = require("@/models");
const bcrypt = require("bcryptjs");
const { Types } = require("mongoose");

class ProfileController {
  show = async (req, res, next) => {
    res.send(req.user);
  };

  update = async (req, res, next) => {
    try {
      const { name, phone, address } = req.body;

      await User.findByIdAndUpdate(
        req.user._id,
        { name, phone, address },
        { runValidators: true }
      );

      res.send({
        message: "Profile updated.",
      });
    } catch (error) {
      errorMessage(next, error);
    }
  };

  password = async (req, res, next) => {
    try {
      const { oldPassword, password, confirmPassword } = req.body;

      const user = await User.findById(req.user._id).select("+password");

      if (bcrypt.compareSync(oldPassword, user.password)) {
        if (password == confirmPassword) {
          const hash = bcrypt.hashSync(password);

          await User.findByIdAndUpdate(user._id, { password: hash });

          res.send({
            message: "Password updated.",
          });
        } else {
          validationError(next, {
            password: "The password is not confirmed.",
          });
        }
      } else {
        validationError(next, {
          oldPassword: "The password is incorrect.",
        });
      }
    } catch (error) {
      errorMessage(next, error);
    }
  }

  reviews = async ( req, res, next) => {
    try {
      let reviews = await Review.aggregate()
          .match({userId: new Types.ObjectId(req.user._id)})
          .lookup({from: 'products', localField: 'productId', foreignField: '_id', as: 'product'})

        for(let i in reviews) {
          reviews[i].product = reviews[i].product[0]
        }

        res.send(reviews)
    } catch (error) {
        errorMessage(next, error)
    }
  }

  orders = async (req, res, next) => {
    try {
      let orders = await Order.find({userId: req.user._id})

      for (let i in orders) { 
        let details = await Detail.aggregate()
            .match({orderId: orders[i]._id})
            .lookup({ from: 'products', localField: 'productId', foreignField: '_id', as: 'product'})

        for (let j in details) {
          details[j].product = details[j].product[0];
        }

        orders[i] = {
          ...orders[i].toObject(),
          details,
        }
      
      }

      res.send(orders);
    } catch (error) {
      errorMessage(next, error);
    }
  }
}

module.exports = new ProfileController();
