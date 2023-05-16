import {
  LOAD_INFORMATION,
} from '../constants/ActionTypes';
const defaultState = {
  flights: null
};

export default function (state = defaultState, action) {
  switch (action.type) {
    case LOAD_INFORMATION:
      return {
        ...state,
        flights: [...action.payload]
      };
  }

  return state;
}