import * as types from '../constants/ActionTypes';
import axios from 'axios';
import { API_URL } from '../config';

export function saveLocation(localisation) {
  return async function (dispatch) {
    try {

      await axios.post(`${API_URL}/api/information/save`, localisation);
    } catch (e) {
      //throw new Error(e);
    }
  };
}

export function saveMyLocationInStore(localisation) {
  return async function (dispatch) {
    return dispatch({
      type: types.SAVE_MYLOCALISATION,
      payload: localisation
    });
  };
}


export function loadLocation(localisation) {
  return async function (dispatch) {
    try {
      const response = await axios.get(`${API_URL}/api/localisation/load`);
      return dispatch({
        type: types.LOAD_LOCALISATION,
        payload: response.data.data
      });

    } catch (e) {
      //throw new Error(e);
    }
  };
}

