const express = require('express');
const router = express.Router();
const knex = require('../db/connection');
const Validator = require('../utils/validation');

router.post(
  '/save',
  Validator.weatherValidator,
  async function (req, res, next) {
    try {
      const weather = req.body;
      await knex('weather')
        .insert({
          location: weather.country,
          humidity: weather.humidity,
          latitude: weather.lat,
          longitude: weather.lon,
          pressure: weather.pressure,
          temperature: weather.temperature,
          weatherdiscription: weather.weatherdiscription,
          wind: weather.wind,
        })
        .returning('*');
      res.json({
        message: 'Weather Information is saved',
      });
    } catch (err) {
      throw new Error(err);
    }
  }
);

module.exports = router;
