import React, { useEffect, useState } from 'react';
import { isAuthenticated } from '../auth/Authentication';
import { useHistory } from 'react-router-dom';
import { AppBar } from '@mui/material';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import AddTaskIcon from '@mui/icons-material/AddTask';
import UserMenu from './UserMenu';
import Brightness4Icon from '@mui/icons-material/Brightness4';
import Brightness7Icon from '@mui/icons-material/Brightness7';
import IconButton from '@mui/material/IconButton';
import Link from '@mui/material/Link';
const Navbar = (props) => {
	const { setDarkMode, darkMode } = props;
	const history = useHistory();
	const [authenticated, setAuthenticated] = useState(null);

	if (authenticated === null) {
		setAuthenticated(isAuthenticated());
	}

	useEffect(() => {
		history.listen(() => {
			console.log(window.location.pathname);
			setAuthenticated(isAuthenticated());
		});
	}, []); // eslint-disable-line react-hooks/exhaustive-deps

	const toggleTheme = () => {
		if (darkMode) {
			setDarkMode(false);
		} else {
			setDarkMode(true);
		}
	};

	return (
		<Box sx={{ flexGrow: 1 }}>
			<AppBar position="static">
				<Toolbar>
					<Typography variant="h6" component="div" paddingRight={2}>
						<AddTaskIcon />
					</Typography>
					<Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
						<Link underline="none" href="/home" color="white">
							MERN Task Manager
						</Link>
					</Typography>
					<Typography>
						<IconButton
							sx={{ ml: 1 }}
							onClick={() => toggleTheme()}
							color="inherit"
						>
							{darkMode ? <Brightness7Icon /> : <Brightness4Icon />}
						</IconButton>
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
