import React, { useState } from 'react';
// import { HashRouter, Switch, Route } from 'react-router-dom';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Login from './pages/Login';
import Signup from './pages/Signup';
import Home from './pages/Home';
import Edit from './pages/Edit';
import Error from './pages/Error';
import PrivateRoute from './components/PrivateRoute';
import Navbar from './components/Navbar';
import CssBaseline from '@mui/material/CssBaseline';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import ScrollToTop from './utils/ScrollToTop';
import GlobalStyles from './theme/GlobalStyles';

const App = () => {
	const [darkMode, setDarkMode] = useState(true);
	const theme = createTheme({
		palette: {
			mode: `${darkMode ? 'dark' : 'light'}`,
			primary: {
				main: `${darkMode ? '#575761' : '#648381'}`,
			},
			secondary: {
				main: `${darkMode ? '#575761' : '#FFBF46'}`,
			},
		},
	});

	return (
		<ThemeProvider theme={theme}>
			{/* <HashRouter> */}
			<Router>
				<CssBaseline />
				<ScrollToTop />
				<GlobalStyles />
				<Navbar setDarkMode={setDarkMode} darkMode={darkMode} />
				<Switch>
					<Route component={Login} path="/" exact />
					<Route component={Signup} path="/signup" exact />
					<PrivateRoute component={Home} path="/home" exact />
					<PrivateRoute component={Edit} path="/edit" exact />
					<Route component={Error} path="/*" />
				</Switch>
			</Router>
			{/* </HashRouter> */}
		</ThemeProvider>
	);
};

export default App;
