import React from 'react';
import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';
import { store } from './store';
import { BrowserRouter } from 'react-router-dom';
import { JournalApp } from './JournalApp';
import './main.css';
import 'animate.css';

ReactDOM.createRoot(document.getElementById('root')).render(
	<React.StrictMode>
		<Provider store={store}>
			<BrowserRouter>
				<JournalApp />
			</BrowserRouter>
		</Provider>
	</React.StrictMode>
);
