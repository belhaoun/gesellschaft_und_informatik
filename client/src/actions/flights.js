import * as types from '../constants/ActionTypes';
import axios from 'axios';
import { API_URL } from '../config';

export function saveFlight(flight) {
  return async function (dispatch) {
    try {
      await axios.post(`${API_URL}/api/flight/saveflight`, flight);
    } catch (e) {
      //throw new Error(e);
    }
  };
}


export function loadFlightInformation(myLocalisation) {
  return async function (dispatch) {
    try {
      const response = await axios.post(`${API_URL}/api/flight/load`, {lat: myLocalisation.latitude, lng: myLocalisation.longitude});
      return dispatch({
        type: types.LOAD_INFORMATION,
        payload: response.data.data
      });

    } catch (e) {
      //throw new Error(e);
    }
  };
}


