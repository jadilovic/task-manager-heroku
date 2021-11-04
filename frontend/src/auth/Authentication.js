export const login = (token, user) => {
	localStorage.setItem('token', token);
	localStorage.setItem('user', JSON.stringify(user));
};

export const logout = () => {
	localStorage.removeItem('token');
	localStorage.removeItem('user');
};

export const getUserToken = () => {
	const userToken = localStorage.getItem('token');
	return userToken;
};

export const getUserData = () => {
	const jsonUserData = localStorage.getItem('user');
	return JSON.parse(jsonUserData);
};

export const isAuthenticated = () => {
	if (localStorage.getItem('token')) {
		return true;
	}
	return false;
};
