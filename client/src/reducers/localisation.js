import {
  LOAD_LOCALISATION,
  SAVE_MYLOCALISATION
} from '../constants/ActionTypes';
const defaultState = {
  localisation: [],
  myLocalisation: null
};

export default function (state = defaultState, action) {
  switch (action.type) {
    case LOAD_LOCALISATION:
      return {
        ...state,
        localisation: [...action.payload]
      };
    case SAVE_MYLOCALISATION:
      return {
        ...state,
        myLocalisation: action.payload
      };
  }

  return state;
}