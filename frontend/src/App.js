import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Login from './pages/Login';
import Signup from './pages/Signup';
import Home from './pages/Home';
import Edit from './pages/Edit';
import Error from './pages/Error';
import PrivateRoute from './components/PrivateRoute';
import Navbar from './components/Navbar';

const App = () => {
	return (
		<Router>
			<Navbar />
			<Switch>
				<Route component={Login} path="/" exact />
				<Route component={Signup} path="/signup" exact />
				<PrivateRoute component={Home} path="/home" exact />
				<PrivateRoute component={Edit} path="/edit" exact />
				<Route component={Error} path="/*" />
			</Switch>
		</Router>
	);
};

export default App;
