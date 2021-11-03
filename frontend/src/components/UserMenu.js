import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import { logout, getUserToken, getUserData } from '../auth/Authentication';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import AccountCircle from '@mui/icons-material/AccountCircle';
import Button from '@mui/material/Button';
import MenuItem from '@mui/material/MenuItem';
import Menu from '@mui/material/Menu';

const UserMenu = () => {
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
			<IconButton
				size="large"
				aria-label="account of current user"
				aria-controls="menu-appbar"
				aria-haspopup="true"
				onClick={handleMenu}
				color="inherit"
			>
				<AccountCircle />
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
					<Typography component="div" paddingRight={2}>
						{`${getUserData()?.firstName} ${getUserData()?.lastName}`}
					</Typography>
				</MenuItem>
				<MenuItem onClick={handleClose}>
					<Typography component="div" paddingRight={2}>
						{`${getUserData()?.email}`}
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
	);
};

export default UserMenu;
