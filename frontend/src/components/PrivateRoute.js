import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import { isAuthenticated } from '../auth/Authentication';

const PrivateRoute = ({ component: Component, ...rest }) => {
	return (
		// Show the component only when the user is logged in
		// Otherwise, redirect the user to Login page
		<Route
			{...rest}
			render={(props) =>
				isAuthenticated() ? <Component {...props} /> : <Redirect to="/" />
			}
		/>
	);
};

export default PrivateRoute;
