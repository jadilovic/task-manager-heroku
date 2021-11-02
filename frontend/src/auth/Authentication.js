const TOKEN_KEY = 'jwt';

export const login = (token, user) => {
	console.log('user: ', user);
	const userToken = {
		userToken: token,
		userEmail: user.email,
		userFirstName: user.firstName,
		userLastName: user.lastName,
	};
	localStorage.setItem(TOKEN_KEY, JSON.stringify(userToken));
};

export const logout = () => {
	localStorage.removeItem(TOKEN_KEY);
};

export const getUserToken = () => {
	const jsonUserToken = localStorage.getItem(TOKEN_KEY);
	return JSON.parse(jsonUserToken);
};

export const isAuthenticated = () => {
	if (localStorage.getItem(TOKEN_KEY)) {
		return true;
	}

	return false;
};
