const Ajv = require("ajv");
const ajv = new Ajv({ allErrors: true });

const validation = (schemaName) => {
  return validationAjv = (req, res, next) => {
    const schema = require(`../validator/schemas/${schemaName}`); // Add validation schema
    const validate = ajv.compile(schema);
    const valid = validate(req.body);

    if (!valid) {
      req.body.validateError = validate.errors.map(el => {
        return {
          path: el.instancePath.slice(1),
          keyword: el.keyword,
          message: el.message
        };
      });
      next();
    } else {
      next();
    };
  };
}

module.exports = {
  validation,
};
