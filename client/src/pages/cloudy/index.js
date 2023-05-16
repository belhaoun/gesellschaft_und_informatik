import { Component } from 'react';
import Button from '@mui/material/Button';
import './index.css';

class Cloudy extends Component {

    constructor(props) {
        super(props);
        this.state = {
        };
    }

    goToHome() {
        window.location.href = '/';
    }

    goToFlights() {
        window.location.href = '/flights';
    }

    render() {
        return (
            <div className='cloudy'>
                <div className='home-paragraph'>
                    <div>
                        Keine geeigneten
                        Wetterbedingungen
                        für die Beobachtung.
                    </div>
                    <br />
                    <div>
                        Versuchen Sie es
                        später noch einmal.
                    </div>

                </div>
                <div className="home-button">
                    <Button
                        onClick={this.goToHome}
                        variant="outlined"
                    >
                        Back to home
                    </Button>
                </div>
                <div className="home-button">
                    <Button
                        onClick={this.goToFlights}
                        variant="outlined"
                    >
                        Go to Flights
                    </Button>
                </div>
            </div>
        );
    }
}

export default Cloudy;