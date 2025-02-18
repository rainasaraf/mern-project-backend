const env = (key) => process.env[key] || null;

const validationError = (next, validation) => {
  next({
    message: "There is some data validation issue.",
    status: 422,
    validation,
  });
};
const errorMessage = (next, error) => {
  console.log(error);
  
  if ("errors" in error) {
    let validation = {};

    for (let k in error.errors) {
      validation = {
        ...validation,
        [k]: error.errors[k].message,
      };
    }

    validationError(next, validation);
  } else if ("code" in error && error.code == 11000) {
    validationError(next, {
      email: "The given email is already in this register.",
    });
  } else {
    next({
      message: "Error while processing request.",
    });
  }
};

const notFoundError = (next, name) => {
  next({
    message: `${name} not found.`,
    status: 404,
  });
};

module.exports = { env, validationError, errorMessage, notFoundError };
