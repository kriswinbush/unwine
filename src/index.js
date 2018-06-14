import React from 'react';
import ReactDOM from 'react-dom';
import 'typeface-roboto';
import registerServiceWorker from './registerServiceWorker';

import ThemeContainer  from "./containers/ThemeContainer";

import { Provider } from 'react-redux';

import configureStore from './configureStore';


const store = configureStore();

ReactDOM.render(
    <Provider store={store}>
        <ThemeContainer />
    </Provider>
    , document.getElementById('root'));
registerServiceWorker();
