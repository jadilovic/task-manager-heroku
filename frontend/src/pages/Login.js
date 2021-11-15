import React, { useState } from 'react';
import useAxiosRequest from '../utils/useAxiosRequest';
import { Link, useHistory } from 'react-router-dom';
import { Box, Alert, Avatar } from '@mui/material';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Grid from '@mui/material/Grid';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { login } from '../auth/Authentication';
import Page from '../components/Page';
import { styled } from '@mui/material/styles';
import { Card, Stack } from '@mui/material';
import MHidden from '../components/MHidden';
import back from '../images/back.jpg';

const RootStyle = styled(Page)(({ theme }) => ({
	[theme.breakpoints.up('md')]: {
		display: 'flex',
	},
}));

const SectionStyle = styled(Card)(({ theme }) => ({
	width: '100%',
	maxWidth: 464,
	display: 'flex',
	flexDirection: 'column',
	justifyContent: 'center',
	margin: theme.spacing(2, 0, 2, 2),
}));

const ContentStyle = styled('div')(({ theme }) => ({
	maxWidth: 480,
	margin: 'auto',
	display: 'flex',
	flexDirection: 'column',
	justifyContent: 'center',
	padding: theme.spacing(3, 0),
}));

function Copyright(props) {
	return (
		<Typography variant="body2" align="center" {...props}>
			{'Copyright © '}
			<a href="https://mui.com/">Tika MERN Task Manager</a>
			{` ${new Date().getFullYear()}.`}
		</Typography>
	);
}

const Login = () => {
	const history = useHistory();
	const mongoDB = useAxiosRequest();
	const [error, setError] = useState(null);

	const handleSubmit = (event) => {
		event.preventDefault();
		const data = new FormData(event.currentTarget);
		const userData = {
			email: data.get('email'),
			password: data.get('password'),
		};
		submitData(userData);
	};

	const submitData = async (userData) => {
		try {
			const loggedIn = await mongoDB.userLogin(userData);
			login(loggedIn.token, loggedIn.user);
			history.push('/home');
		} catch (err) {
			console.log(err);
			console.log(err);
			if (err.response) {
				setError(err.response.data.msg);
			} else {
				setError('Network error. Try again later');
			}
		}
	};

	return (
		<RootStyle title="Login | Task Manager Aki Heroku">
			<CssBaseline />
			<MHidden width="mdDown">
				<SectionStyle>
					<Typography variant="h6" sx={{ px: 5, mt: 5, mb: 5 }}>
						Hi, Welcome Back
					</Typography>
					<img src={back} alt="login" />
				</SectionStyle>
			</MHidden>
			<Container maxWidth="sm">
				<ContentStyle>
					<Stack sx={{ mb: 2 }}>
						<Typography sx={{ color: 'text.secondary' }}>
							Login to your task manager.
						</Typography>
					</Stack>
					<Box
						sx={{
							marginTop: 2,
							display: 'flex',
							flexDirection: 'column',
							alignItems: 'center',
						}}
					>
						<Avatar sx={{ m: 1, bgcolor: '#FFBF46' }}>
							<LockOutlinedIcon />
						</Avatar>
						<Typography component="h1" variant="h5">
							Login
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
									<Link
										style={{ color: '#648381' }}
										to="/signup"
										variant="body2"
									>
										{"Don't have an account? Sign Up"}
									</Link>
								</Grid>
							</Grid>
						</Box>
					</Box>
					<Copyright sx={{ mt: 8, mb: 4 }} />
				</ContentStyle>
			</Container>
		</RootStyle>
	);
};

export default Login;
