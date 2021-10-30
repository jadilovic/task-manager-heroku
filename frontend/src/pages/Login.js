import React, { useState, useEffect } from 'react';
import axios from 'axios';

import {
	BrowserRouter as Router,
	Route,
	Switch,
	Link,
	useHistory,
} from 'react-router-dom';
import { Box, Alert, Avatar } from '@mui/material';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Grid from '@mui/material/Grid';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { login, isAuthenticated } from '../auth/Authentication';
import Navbar from '../components/Navbar';

function Copyright(props) {
	return (
		<Typography
			variant="body2"
			color="text.secondary"
			align="center"
			{...props}
		>
			{'Copyright © '}
			<a color="inherit" href="https://mui.com/">
				Tika MERN Task Manager
			</a>
			{` ${new Date().getFullYear()}.`}
		</Typography>
	);
}

const theme = createTheme();

const Login = () => {
	const history = useHistory();
	const serverURL = 'http://localhost:5000';
	const [error, setError] = useState(null);

	const handleSubmit = (event) => {
		event.preventDefault();
		const data = new FormData(event.currentTarget);
		// eslint-disable-next-line no-console
		const userData = {
			email: data.get('email'),
			password: data.get('password'),
		};
		submitData(userData);
	};

	const submitData = async (userData) => {
		try {
			await axios({
				method: 'POST',
				url: `${serverURL}/api/v1/auth/login`,
				data: {
					email: userData.email,
					password: userData.password,
				},
				headers: new Headers({ 'Content-Type': 'application/json' }),
			}).then((res) => {
				login(res.data.token, res.data.user.email);
				history.push('/home');
			});
		} catch (err) {
			console.log(err.response);
			setError(err.response.data.msg);
		}
	};

	return (
		<ThemeProvider theme={theme}>
			<Navbar isAuthenticated={isAuthenticated()} />
			<Container component="main" maxWidth="xs">
				<CssBaseline />
				<Box
					sx={{
						marginTop: 8,
						display: 'flex',
						flexDirection: 'column',
						alignItems: 'center',
					}}
				>
					<Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
						<LockOutlinedIcon />
					</Avatar>
					<Typography component="h1" variant="h5">
						Task Manager Login
					</Typography>
					<Box
						component="form"
						onSubmit={handleSubmit}
						noValidate
						sx={{ mt: 1 }}
					>
						{error && (
							<Box
								sx={{
									paddingTop: 2,
									paddingBottom: 2,
									bgcolor: 'background.paper',
								}}
							>
								<Alert severity="error">{error}</Alert>
							</Box>
						)}
						<TextField
							margin="normal"
							required
							fullWidth
							id="email"
							label="Email Address"
							name="email"
							autoComplete="email"
							autoFocus
						/>
						<TextField
							margin="normal"
							required
							fullWidth
							name="password"
							label="Password"
							type="password"
							id="password"
							autoComplete="current-password"
						/>
						<Button
							type="submit"
							fullWidth
							variant="contained"
							sx={{ mt: 3, mb: 2 }}
						>
							Sign In
						</Button>
						<Grid container>
							<Grid item xs={12}>
								<Link to="/signup" variant="body2">
									{"Don't have an account? Sign Up"}
								</Link>
							</Grid>
						</Grid>
					</Box>
				</Box>
				<Copyright sx={{ mt: 8, mb: 4 }} />
			</Container>
		</ThemeProvider>
	);
};

export default Login;
