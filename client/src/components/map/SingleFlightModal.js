import * as React from 'react';
import { Component } from 'react';

import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import { saveFlight } from '../../actions/flights';
import { connect } from 'react-redux';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};

class SingleFligthModal extends Component {

  constructor(props) {
    super(props);
    this.state = {
      open: true,
      dataSaved: false
    };
    this.handleOpen = this.handleOpen.bind(this);
    this.handleClose = this.handleClose.bind(this);
    this.saveFlightInDB = this.saveFlightInDB.bind(this);
  }

  handleOpen() {
    this.setState({
      open: true
    });
  }

  handleClose() {
    this.setState({
      open: false
    });
  }

  async saveFlightInDB(props) {
    const { flight } = this.props;
    await this.props.saveFlight(flight);
    this.setState({
      dataSaved: true
    })

  }

  render() {
    const { open, dataSaved } = this.state;
    return (
      <div>
        <Modal
          open={open}
          onClose={this.handleClose}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <div>
            {!dataSaved && <Box sx={style}>
              <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                Erfassen Sie nun die Flugbahn des Flugzeuges mit der Feuerkugel App.
              </Typography>
              <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                Wenn Sie fertig sind, drücken Sie bitte den Button.
              </Typography>
              <Button
                onClick={this.saveFlightInDB}
                variant="outlined"
              >
                Save Flight information
              </Button>
            </Box>}

            {dataSaved && <Box sx={style}>
              <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                Vielen danke
              </Typography>
              <Button
                onClick={this.handleClose}
                variant="outlined"
              >
                Close Modal
              </Button>
            </Box>}
          </div>

        </Modal>
      </div>
    );
  }
}

function mapStoreToProps(store) {
  return {};
}


export default connect(mapStoreToProps, {
  saveFlight
})(SingleFligthModal);