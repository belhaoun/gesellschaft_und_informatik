import { connect } from 'react-redux';
import React, { Component } from 'react';

import SingleFligthModal from './SingleFlightModal';

class Flight extends Component {
  constructor(props) {
    super(props);
    this.state = {
      open: false
    };
    this.handelClick = this.handelClick.bind(this);
  }
  
  handelClick() {
    this.setState({
      open: true
    });

  }

  render() {
    const { open } = this.state;
    const { flight } = this.props;

    return (
      <div onClick={this.handelClick}>
        <img src="./plan.png" width="40" height="40" />
        {open && <SingleFligthModal flight={flight} />}
      </div>
    );
  }
}

function mapStoreToProps(store) {
  return {
    
  };
}

export default connect(mapStoreToProps, {
})(Flight);
