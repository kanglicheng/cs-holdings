import React from 'react';
import './App.css';
import { Signup } from './Signup';
import { Signin } from './Signin';

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
