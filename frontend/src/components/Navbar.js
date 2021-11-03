import React, { useEffect, useState } from 'react';
import { isAuthenticated } from '../auth/Authentication';
import { useHistory } from 'react-router-dom';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import AddTaskIcon from '@mui/icons-material/AddTask';
import UserMenu from './UserMenu';

const Navbar = () => {
	const history = useHistory();
	const [authenticated, setAuthenticated] = useState(null);
	console.log('authenticated ', authenticated);

	if (authenticated === null) {
		setAuthenticated(isAuthenticated());
	}

	useEffect(() => {
		const unlisten = history.listen(() => {
			console.log(window.location.pathname);
			setAuthenticated(isAuthenticated());
		});
		return unlisten();
	}, []);

	return (
		<Box sx={{ flexGrow: 1 }} padding={2}>
			<AppBar position="static">
				<Toolbar>
					<Typography variant="h6" component="div" paddingRight={2}>
						<AddTaskIcon />
					</Typography>
					<Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
						MERN Task Manager
					</Typography>

					{authenticated ? (
						<UserMenu />
					) : (
						<Typography variant="h6" component="div">
							{''}
						</Typography>
					)}
				</Toolbar>
			</AppBar>
		</Box>
	);
};

export default Navbar;
