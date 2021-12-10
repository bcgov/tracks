import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import {setupStore} from "../state/store";

import( /* webpackChunkName: "tracks_configuration" */ '../state/config').then(({CONFIG}) => {

  const store = setupStore(CONFIG);


  ReactDOM.render(
    <App store={store} />,
    document.getElementById('root'),
  );

});
