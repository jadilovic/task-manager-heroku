import React, { useState } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import Login from './pages/Login';
import Signup from './pages/Signup';
import Home from './pages/Home';
import Edit from './pages/Edit';
import Error from './pages/Error';
import PrivateRoute from './components/PrivateRoute';

const App = () => {
	return (
		<BrowserRouter>
			<Switch>
				<Route component={Login} path="/" exact />
				<Route component={Signup} path="/signup" exact />
				<PrivateRoute component={Home} path="/home" exact />
				<PrivateRoute component={Edit} path="/edit" exact />
				<Route component={Error} path="/*" />
			</Switch>
		</BrowserRouter>
	);
};

export default App;
