const schemaValidator = async (dataToValidate, schema) => {
  try {
    // validate request body
    await schema.validate(dataToValidate);
    return {
      status: true,
    };
  } catch (err) {
    // console.log(err.errors);
    return {
      status: false,
      message: err.errors.join(", "),
    };
  }
};

module.exports = {
  schemaValidator,
};
