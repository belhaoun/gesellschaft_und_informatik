import React, { Component } from 'react';
import GoogleMap from 'google-map-react';
import { connect } from 'react-redux';
import Flight from './Flight';
import FligthsModal from './FligthsModal';

const MyLocalisationIcon = () => <img src="../localisation.png" width="40" height="40" />;

class Map extends Component {
  constructor(props) {
    super(props);
  }

  static defaultProps = {
    zoom: 9
  };

  render() {
    const { flights, myLocalisation } = this.props;
    return (
      <div>
        {myLocalisation && <GoogleMap
          defaultCenter={{ lat: myLocalisation.latitude, lng: myLocalisation.longitude }}
          defaultZoom={this.props.zoom}
        >
          {myLocalisation && <MyLocalisationIcon
            lat={myLocalisation.latitude}
            lng={myLocalisation.longitude}
          />}
          {flights.map(flight => (
             <Flight
               key={flight.hex}
               idFlight={flight.hex}
               flight={flight}
               lat={flight.lat}
               lng={flight.lng} />
           ))}
        </GoogleMap>}
        <FligthsModal />
      </div>
    );
  }
}

export default Map;
