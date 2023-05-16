const express = require('express');
const router = express.Router();
const knex = require('../db/connection');
const Validator = require('../utils/validation');
const axios = require("axios");

const API_KEY = 'a883f345-0347-4581-a380-b0289dfaf68e';

function distance(point1, point2) {
    const R = 6371e3; // metres
    const alpha1 = point1.lat * Math.PI / 180; // φ, λ in radians
    const alpha2 = point2.lat * Math.PI / 180;
    const deltaAlpha = (point2.lat - point1.lat) * Math.PI / 180;
    const deltaGama = (point2.lng - point1.lng) * Math.PI / 180;
    const a = Math.sin(deltaAlpha / 2) * Math.sin(deltaAlpha / 2) +
        Math.cos(alpha1) * Math.cos(alpha2) *
        Math.sin(deltaGama / 2) * Math.sin(deltaGama / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    const d = R * c; // in metres
    return d / 1000;
}

async function getObservation() {
    try {
        const response = await axios.get('https://meteor.nachtlicht-buehne.de/api/v1/sky_events?sort=observationTimestamp,desc&projection=inline&size=1');
        return response.data._embedded.sky_events[0].observations[0];
    } catch (e) {
        throw new Error(e);
    }
}

async function getFlightbyId(id, param) {
    try {
        const response = await axios.get(`https://airlabs.co/api/v9/flight?${param}=${id}&api_key=${API_KEY}`);
        return response.data.response;
    } catch (e) {
        throw new Error(e);
    }
}


router.post(
    '/saveflight',
    //Validator.informationValidator,
    async function (req, res, next) {
        try {
            const flight = req.body;
            let idFlight;
            let param;
            if (flight.flight_iata) {
                idFlight = flight.flight_iata;
                param = 'flight_iata';
            } else {
                idFlight = flight.flight_icao;
                param = 'flight_icao';
            }
            const updatedFlight = await getFlightbyId(idFlight, param);
            await knex('flights')
                .insert({
                    hex: updatedFlight.hex,
                    lng: updatedFlight.lng,
                    lat: updatedFlight.lat,
                    speed: updatedFlight.speed,
                    updated: updatedFlight.updated,
                    dir: updatedFlight.dir,
                    lng: updatedFlight.lng,
                    idflight: idFlight
                })
                .returning('*');
            // save information from Api
            const flightApi = await getObservation();
            await knex('flightapi')
                .insert({
                    observation: JSON.stringify(flightApi),
                    idflight: idFlight
                })
                .returning('*');
            res.json({
                message: 'flight is saved',
            });
        } catch (err) {
            throw new Error(err);
        }
    }
);

router.post(
    '/load',
    async function (req, res, next) {
        const myLocatlisation = req.body;
        try {

            const options = {
                method: 'GET',
                url: `https://airlabs.co/api/v9/flights?api_key=${API_KEY}`
            };

            const response = await axios.request(options);
            const filtredFlights = response.data.response.filter(
                flight => distance(myLocatlisation, { lat: flight.lat, lng: flight.lng }) < 1000
            );
            //const filtredFlights = response.data.response;
            res.json({
                data: filtredFlights
            });
            res.json({ data: [] });

        } catch (err) {
            throw new Error(err);
        }
    }
);

module.exports = router;


