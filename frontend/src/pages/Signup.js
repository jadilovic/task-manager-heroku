import React, { useState } from 'react';
import axios from 'axios';
import { BrowserRouter as Router, Link, useHistory } from 'react-router-dom';
import { login } from '../auth/Authentication';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Grid from '@mui/material/Grid';
import { Box, Alert } from '@mui/material';
import { PersonAdd } from '@mui/icons-material';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';

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

const Signup = () => {
	const history = useHistory();
	const serverURL = 'http://localhost:5000';
	const [error, setError] = useState(null);
	const [fieldErrors, setFieldErrors] = useState({});

	const handleSubmit = (event) => {
		event.preventDefault();
		const data = new FormData(event.currentTarget);
		// eslint-disable-next-line no-console
		const newUserData = {
			firstName: data.get('firstName'),
			lastName: data.get('lastName'),
			email: data.get('email'),
			password: data.get('password'),
		};
		submitData(newUserData);
	};

	const handleErrors = (errors) => {
		const initialErrors = {
			firstName: { error: false, msg: '' },
			lastName: { error: false, msg: '' },
			email: { error: false, msg: '' },
			password: { error: false, msg: '' },
		};
		let errorsList = errors.replace('ValidationError: ', '');
		errorsList = errorsList.split(', ');
		errorsList.map((item) => {
			const errorItem = item.split('-');
			return (initialErrors[errorItem[0]] = {
				error: true,
				msg: errorItem[1],
			});
		});
		setFieldErrors(initialErrors);
		setError('');
	};

	const submitData = async (userData) => {
		try {
			await axios({
				method: 'POST',
				url: `${serverURL}/api/v1/auth/signup`,
				data: {
					firstName: userData.firstName,
					lastName: userData.lastName,
					email: userData.email,
					password: userData.password,
				},
				headers: new Headers({ 'Content-Type': 'application/json' }),
			}).then((res) => {
				login(res.data.token, res.data.user);
				history.push('/home');
			});
		} catch (err) {
			console.log(err.response);
			if (err.response.data.msg.startsWith('ValidationError: ')) {
				handleErrors(err.response.data.msg);
			} else {
				setFieldErrors({});
				setError(err.response.data.msg);
			}
		}
	};

	console.log(fieldErrors);

	return (
		<ThemeProvider theme={theme}>
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
					<Avatar sx={{ m: 1, bgcolor: 'green' }}>
						<PersonAdd />
					</Avatar>
					<Typography component="h1" variant="h5">
						Task Manager Sign up
					</Typography>
					<Box
						component="form"
						noValidate
						onSubmit={handleSubmit}
						sx={{ mt: 3 }}
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
						<Grid container spacing={2}>
							<Grid item xs={12} sm={6}>
								<TextField
									error={fieldErrors?.firstName?.error ? true : false}
									helperText={fieldErrors?.firstName?.msg}
									autoComplete="given-name"
									name="firstName"
									required
									fullWidth
									id="firstName"
									label="First Name"
									autoFocus
								/>
							</Grid>
							<Grid item xs={12} sm={6}>
								<TextField
									error={fieldErrors?.lastName?.error ? true : false}
									helperText={fieldErrors?.lastName?.msg}
									required
									fullWidth
									id="lastName"
									label="Last Name"
									name="lastName"
									autoComplete="family-name"
								/>
							</Grid>
							<Grid item xs={12}>
								<TextField
									error={fieldErrors?.email?.error ? true : false}
									helperText={fieldErrors?.email?.msg}
									required
									fullWidth
									id="email"
									label="Email Address"
									name="email"
									autoComplete="email"
								/>
							</Grid>
							<Grid item xs={12}>
								<TextField
									error={fieldErrors?.password?.error ? true : false}
									helperText={fieldErrors?.password?.msg}
									required
									fullWidth
									name="password"
									label="Password"
									type="password"
									id="password"
									autoComplete="new-password"
								/>
							</Grid>
						</Grid>
						<Button
							type="submit"
							fullWidth
							variant="contained"
							sx={{ mt: 3, mb: 2 }}
						>
							Sign Up
						</Button>
						<Grid container justifyContent="flex-end">
							<Grid item>
								<Link to="/" variant="body2">
									Already have an account? Log in
								</Link>
							</Grid>
						</Grid>
					</Box>
				</Box>
				<Copyright sx={{ mt: 5 }} />
			</Container>
		</ThemeProvider>
	);
};

export default Signup;
