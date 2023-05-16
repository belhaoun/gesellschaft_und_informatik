import { Component } from 'react';
import Button from '@mui/material/Button';
import { geolocated } from 'react-geolocated';
import { saveMyLocationInStore } from '../../actions/localisation';
import { connect } from 'react-redux';
import './index.css';

const API_KEY = '7f2d8c18a7ed7e8a240c03800617a4b1';
const UNITS = 'Metric';
const LANG = 'en';

class Home extends Component {

    constructor(props) {
        super(props);
        this.state = {
            coordinates: null
        };
        this.loadWeatherWeatherInfo = this.loadWeatherWeatherInfo.bind(this);
    }

    loadWeatherFromApi() {
        const { latitude, longitude } = this.props.coords;
        const URL = `http://api.openweathermap.org/data/2.5/onecall?lat=${latitude}&lon=${longitude}&appid=${API_KEY}&units=${UNITS}&lang=${LANG}`;
        return fetch(URL)
            .then((response) => {
                if (response.ok) {
                    return response.json();
                } else {
                    throw new Error('SOMETHING WENT WRONG');
                }
            })
            .then((data) => {
                const weatherReport = {
                    coord: {
                        lon: data.lon,
                        lat: data.lat,
                    },
                    weather: data.current.weather,
                    main: {
                        temp: data.current.temp,
                        pressure: data.current.pressure,
                        humidity: data.current.humidity,
                    },
                    wind: {
                        speed: data.current.wind_speed,
                    },
                    sys: {
                        country: data.timezone,
                    },
                };
                this.setState({ weatherReport: weatherReport, isLoading: false });
                return weatherReport;
            })
            .catch((error) => this.setState({ error, isLoading: true }));
    }

    async loadWeatherWeatherInfo() {

        const coordinates = this.props.coords;
        this.setState({ coordinates });
        if (coordinates) {
            this.props.saveMyLocationInStore({
                lat: coordinates.latitude,
                lng: coordinates.longitude
            });
        }
        
        const weathReport = await this.loadWeatherFromApi();
        if (weathReport.weather[0].main === 'Clouds') {
            // If the the weather is cloudy go to cloudy weather page
            window.location.href = '/cloudy';
        } else  {
            // Go the the pages flight and show me the flights
            window.location.href = '/flights';
        }
    }

    render() {
        return (
            <div className='home'>
                <div className='home-paragraph'>
                    (1) Flugzeuge auswählen
                </div>
                <div className='home-paragraph'>
                    (2) Flugbahn mit der Feuerkugel - App erfassen
                </div>
                <div className='home-paragraph'>
                    (3) Meldung bestätigen
                </div>
                <div className="home-button">
                    <Button
                        onClick={this.loadWeatherWeatherInfo}
                        variant="outlined"
                    >
                        Flugzeuge in meiner Nähe finden
                    </Button>
                </div>
            </div>
        );
    }
}

const MyLocalisationHome = geolocated({
    positionOptions: {
        enableHighAccuracy: false,
    },
    userDecisionTimeout: 8000,
})(Home);



function mapStoreToProps(store) {
    return {

    };
}

export default connect(mapStoreToProps, {
    saveMyLocationInStore,
})(MyLocalisationHome);