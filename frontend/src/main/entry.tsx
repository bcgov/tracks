import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import {setupStore} from "../state/store";
import { createRoot } from 'react-dom/client';

import( /* webpackChunkName: "tracks_configuration" */ '../state/config').then(({CONFIG}) => {

	const store = setupStore(CONFIG);
	const container = document.getElementById('root');
	const root = createRoot(container!);

	root.render(
		<App store={store}/>
	);

});
