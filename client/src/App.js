// routes
import React, { Component } from 'react';
import { Provider } from 'react-redux';
import AdapterDateFns from '@mui/lab/AdapterDateFns';
import LocalizationProvider from '@mui/lab/LocalizationProvider';
import Router from './routes';
import NavBar from './components/NavBar';
import configureStore from './store/configureStore';
import './index.css';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    const store = configureStore();
    return (
      <div className='application-container'>
        <NavBar />
        <Provider store={store}>
          <LocalizationProvider dateAdapter={AdapterDateFns}>
            <Router />
          </LocalizationProvider>
        </Provider>
      </div>
    );
  }
}

export default App;
