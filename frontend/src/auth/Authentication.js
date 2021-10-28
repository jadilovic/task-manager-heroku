const TOKEN_KEY = 'jwt';

export const login = (token, email) => {
	const userToken = { userToken: token, userEmail: email };
	localStorage.setItem(TOKEN_KEY, JSON.stringify(userToken));
};

export const logout = () => {
	localStorage.removeItem(TOKEN_KEY);
};

export const getUserToken = () => {
	const jsonUserToken = localStorage.getItem(TOKEN_KEY);
	console.log(JSON.parse(jsonUserToken));
	return JSON.parse(jsonUserToken);
};

export const isAuthenticated = () => {
	if (localStorage.getItem(TOKEN_KEY)) {
		return true;
	}

	return false;
};
