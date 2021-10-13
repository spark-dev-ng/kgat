
import { BrowserRouter } from 'react-router-dom';
import React from 'react';
import ReactDOM from 'react-dom'
import { Provider } from 'react-redux'
import './index.css';
import Application from './Application';
import ThemeProvider from './components/Theme';
import * as serviceWorker from './serviceWorker';
import store from './store'

ReactDOM.render(
  <BrowserRouter>
    <ThemeProvider>
    	<Provider store={store}>
      		<Application />
      	</Provider>
    </ThemeProvider>
  </BrowserRouter>,
  document.querySelector('#root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();
