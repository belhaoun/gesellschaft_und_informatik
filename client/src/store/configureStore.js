import { createStore, compose, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import rootReducer from '../reducers';

const configureStore = (initialeState) =>
  createStore(
    rootReducer,
    initialeState,
    compose(
      applyMiddleware(thunk)
      // window.devToolsExtension ? window.devToolsExtension() : null
    )
  );

export default configureStore;
