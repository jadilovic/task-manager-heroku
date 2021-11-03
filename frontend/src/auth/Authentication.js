const TOKEN_KEY = 'jwt';
const USER_KEY = 'user';

export const login = (token, user) => {
	const userToken = {
		token,
		email: user.email,
	};
	const userData = {
		email: user.email,
		firstName: user.firstName,
		lastName: user.lastName,
	};
	localStorage.setItem(TOKEN_KEY, JSON.stringify(userToken));
	localStorage.setItem(USER_KEY, JSON.stringify(userData));
};

export const logout = () => {
	localStorage.removeItem(TOKEN_KEY);
	localStorage.removeItem(USER_KEY);
};

export const getUserToken = () => {
	const jsonUserToken = localStorage.getItem(TOKEN_KEY);
	return JSON.parse(jsonUserToken);
};

export const getUserData = () => {
	const jsonUserData = localStorage.getItem(USER_KEY);
	return JSON.parse(jsonUserData);
};

export const isAuthenticated = () => {
	if (localStorage.getItem(TOKEN_KEY)) {
		return true;
	}
	return false;
};
