const express = require('express');
const router = express.Router();
const weatherRoutes = require('./weather');
const flightRoutes = require('./flight');

router.use('/weather', weatherRoutes);
router.use('/flight', flightRoutes);

module.exports = router;
