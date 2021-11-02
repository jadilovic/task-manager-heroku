import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import { logout, getUserToken } from '../auth/Authentication';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import AccountCircle from '@mui/icons-material/AccountCircle';
import Button from '@mui/material/Button';
import MenuItem from '@mui/material/MenuItem';
import Menu from '@mui/material/Menu';

const UserMenu = () => {
	const [auth, setAuth] = useState(true);
	const [anchorEl, setAnchorEl] = useState(null);
	const history = useHistory();

	const handleMenu = (event) => {
		setAnchorEl(event.currentTarget);
	};

	const handleClose = () => {
		setAnchorEl(null);
	};

	const handleLogout = () => {
		logout();
		history.push('/');
	};

	return (
		<div>
			{auth && (
				<div>
					<IconButton
						size="large"
						aria-label="account of current user"
						aria-controls="menu-appbar"
						aria-haspopup="true"
						onClick={handleMenu}
						color="inherit"
					>
						<MenuIcon />
					</IconButton>
					<Menu
						id="menu-appbar"
						anchorEl={anchorEl}
						anchorOrigin={{
							vertical: 'top',
							horizontal: 'right',
						}}
						keepMounted
						transformOrigin={{
							vertical: 'top',
							horizontal: 'right',
						}}
						open={Boolean(anchorEl)}
						onClose={handleClose}
					>
						<MenuItem onClick={handleClose}>
							<Typography variant="h6" component="div" paddingRight={2}>
								{`${getUserToken().userFirstName} ${
									getUserToken().userLastName
								}`}
							</Typography>
						</MenuItem>
						<MenuItem onClick={handleClose}>
							<Typography variant="h6" component="div" paddingRight={2}>
								{`${getUserToken().userEmail}`}
							</Typography>
						</MenuItem>
						<MenuItem>
							<Button
								variant="contained"
								color="warning"
								onClick={() => handleLogout()}
							>
								Logout
							</Button>
						</MenuItem>
					</Menu>
				</div>
			)}
		</div>
	);
};

export default UserMenu;
