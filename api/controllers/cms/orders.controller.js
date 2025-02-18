const { errorMessage, notFoundError } = require("@/library/functions");
const { Detail, Order } = require("@/models");

class OrderController {
  index = async (req, res, next) => {
    try {
      let orders = await Order.aggregate()
         .lookup({
         from: "users",
         localField: "userId",
         foreignField: "_id",
         as: "user",
      });
      for (let i in orders) {
        let details = await Detail.aggregate()
          .match({ orderId: orders[i]._id })
          .lookup({
            from: "products",
            localField: "productId",
            foreignField: "_id",
            as: "product",
          });

        for (let j in details) {
          details[j].product = details[j].product[0];
        }

        orders[i] = {
          ...orders[i],
          user: orders[i].user[0],
          details,
        };
      }

      res.send(orders);
    } catch (error) {
      errorMessage(next, error);
    }
  }


  update = async (req, res, next) => {
    try {
      const { id } = req.params;

      const order = await Order.findById(id);

      if (order) {
        const { status } = req.body;

        await Order.findByIdAndUpdate(
          id,
          { status },
          { runValidators: true }
        );

        res.send({
          message: "Order updated.",
        });
      } else {
        notFoundError(next, "Order");
      }
    } catch (error) {
      errorMessage(next, error);
    }
  };

  destroy = async (req, res, next) => {
    try {
      const { id } = req.params;

      const order = await Order.findById(id);

      if (order) {
        await Detail.deleteMany({orderId: id})
        await Order.findByIdAndDelete(id);

        res.send({
          message: "Order deleted.",
        });
      } else {
        notFoundError(next, "Order");
      }
    } catch (error) {
      errorMessage(next, error);
    }
  };
}

module.exports = new OrderController
