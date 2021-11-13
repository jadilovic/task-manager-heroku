// src/pages/Error.js
import React from 'react';
import { Link } from 'react-router-dom';
import { Button, CardMedia, CssBaseline } from '@mui/material';
import Grid from '@mui/material/Grid';
import image from '../images/Error404.png';

export default function Error() {
	return (
		<>
			<Grid
				padding={8}
				container
				spacing={0}
				direction="column"
				alignItems="center"
				justify="center"
				style={{ minHeight: '25vh' }}
			>
				<CssBaseline />
				<CardMedia
					component="img"
					alt="Error Page"
					src={image}
					style={{ width: '50%', height: '50%' }}
					title="Error Page"
				/>
				<div style={{ paddingTop: 20 }}>
					<Link to="/" className="btn">
						<Button size="large" variant="contained" color="primary" p={3}>
							back home or login page
						</Button>
					</Link>
				</div>
			</Grid>
		</>
	);
}
