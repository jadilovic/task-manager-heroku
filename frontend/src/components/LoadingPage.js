import React from 'react';
import { Grid, Stack, Typography } from '@mui/material';
import CircularProgress from '@mui/material/CircularProgress';

export default function App() {
	return (
		<Grid
			container
			spacing={0}
			direction="column"
			alignItems="center"
			justifyContent="center"
			style={{ minHeight: '80vh' }}
		>
			<Grid item xs={12}>
				<Stack sx={{ color: 'grey.500' }} spacing={2} direction="row">
					<CircularProgress color="secondary" />
					<CircularProgress color="success" />
					<CircularProgress color="inherit" />
				</Stack>
			</Grid>
			<Grid item xs={12}>
				<Typography variant="h5">Loading...</Typography>
			</Grid>
		</Grid>
	);
}
