const Joi = require('joi');

const weatherSchema = Joi.object().keys({
  country: Joi.string().required(),
  humidity: Joi.number().required(),
  lat: Joi.number().required(),
  lon: Joi.number().required(),
  pressure: Joi.number().required(),
  temperature: Joi.number().required(),
  weatherdiscription: Joi.string().required(),
  wind: Joi.number().required(),
});

module.exports = {
  weatherValidator: function (req, res, next) {
    const result = Joi.validate(req.body, weatherSchema);
    if (result.error) {
      res.status(400);
      res.send('You have an error. weather');
    } else {
      next();
    }
  },
};
