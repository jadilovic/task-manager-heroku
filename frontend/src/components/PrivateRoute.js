import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import { isAuthenticated } from '../auth/Authentication';

const PrivateRoute = ({ component: Component, ...rest }) => {
	console.log(rest);
	return (
		// Show the component only when the user is logged in
		// Otherwise, redirect the user to Login page
		<Route
			{...rest}
			render={(props) =>
				isAuthenticated() ? (
					<>
						{console.log('prps', rest)}
						<Component
							toggleFilter={rest.toggleFilter}
							setToggleFilter={rest.setToggleFilter}
							searchValue={rest.searchValue}
							{...props}
						/>
					</>
				) : (
					<Redirect to="/" />
				)
			}
		/>
	);
};

export default PrivateRoute;
