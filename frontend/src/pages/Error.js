// src/pages/Error.js
import React from 'react';
import { Link } from 'react-router-dom';
import { Button, CardMedia } from '@mui/material';
import Grid from '@mui/material/Grid';
import image from '../images/Error404.png';
import Navbar from '../components/Navbar';
import { isAuthenticated } from '../auth/Authentication';

export default function Error() {
	return (
		<>
			<Navbar isAuthenticated={isAuthenticated()} />
			<Grid
				container
				spacing={0}
				direction="column"
				alignItems="center"
				justify="center"
				style={{ minHeight: '25vh' }}
			>
				<CardMedia
					component="img"
					alt="Error Page"
					src={image}
					style={{ width: '50%', height: '50%' }}
					title="Error Page"
				/>
				<p />
				<Link to="/" className="btn">
					<Button size="large" variant="contained" color="primary" p={3}>
						back home or login page
					</Button>
				</Link>
			</Grid>
		</>
	);
}
