import React from 'react';

import LogRocket from 'logrocket';

import { Signin } from './Signin';
import { Signup } from './Signup';

import './App.css';
LogRocket.init('6gzskl/cs-holdings-prod');

function App() {
	return (
		<div className="App">
			<h1>React App</h1>
			<Signup />
			<Signin />
		</div>
	);
}

export default App;
