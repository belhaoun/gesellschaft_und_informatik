import { Component } from 'react';
import Button from '@mui/material/Button';
import Map from '../../components/map';
import { geolocated } from 'react-geolocated';
import './index.css';
import { connect } from 'react-redux';
import {
    loadFlightInformation,
} from '../../actions/flights';

class Flights extends Component {
    constructor(props) {
        super(props);
        this.state = {
        };
    }

    componentDidUpdate(prevProps) {
        if(prevProps.coords !== this.props.coords) {
            this.props.loadFlightInformation(this.props.coords);
        }
    } 

    goToHome() {
        window.location.href = '/';
    }

    render() {
        const myLocalisation = this.props.coords;
        const { flights } = this.props;
        return (
            <div className='flights'>
                <div className='flights-map-container'>
                    {flights !== null && flights.length > 0 && <Map flights={flights} myLocalisation={myLocalisation} />}
                    {flights !== null && flights.length === 0 && <div className='home-paragraph-container'>
                        <div className='home-paragraph'>
                            <p>Zur Zeit sind keine Flugzeuge in Ihrer Nähe.</p>
                            <p>Versuchen Sie es später noch einmal.</p>
                        </div>
                    </div>}

                </div>

                <div className="flights-button">
                    <Button
                        onClick={this.goToHome}
                        variant="outlined"
                    >
                        Back to home
                    </Button>
                </div>
            </div>
        );
    }
}

function mapStoreToProps(store) {
    return {
        myLocalisation: store.localisation.myLocalisation,
        flights: store.flight.flights,
    };
}

const MyLocalisationFlights = geolocated({
    positionOptions: {
        enableHighAccuracy: false,
    },
    userDecisionTimeout: 8000,
})(Flights);

export default connect(mapStoreToProps, {
    loadFlightInformation,
})(MyLocalisationFlights);