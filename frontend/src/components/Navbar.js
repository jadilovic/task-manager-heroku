import React, { useEffect, useState } from 'react';
import { styled, alpha } from '@mui/material/styles';

import { isAuthenticated } from '../auth/Authentication';
import { useHistory } from 'react-router-dom';
import { AppBar, Button } from '@mui/material';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import AddTaskIcon from '@mui/icons-material/AddTask';
import UserMenu from './UserMenu';
import Brightness4Icon from '@mui/icons-material/Brightness4';
import Brightness7Icon from '@mui/icons-material/Brightness7';
import IconButton from '@mui/material/IconButton';
import Link from '@mui/material/Link';
import InputBase from '@mui/material/InputBase';
import SearchIcon from '@mui/icons-material/Search';
import FilterListIcon from '@mui/icons-material/FilterList';
import SortByAlphaIcon from '@mui/icons-material/SortByAlpha';
import UserWindow from '../utils/UserWindow';

const Search = styled('div')(({ theme }) => ({
	position: 'relative',
	borderRadius: theme.shape.borderRadius,
	backgroundColor: alpha(theme.palette.common.white, 0.15),
	'&:hover': {
		backgroundColor: alpha(theme.palette.common.white, 0.25),
	},
	marginLeft: 0,
	width: '100%',
	[theme.breakpoints.up('sm')]: {
		marginLeft: theme.spacing(1),
		width: 'auto',
	},
}));

const SearchIconWrapper = styled('div')(({ theme }) => ({
	padding: theme.spacing(0, 2),
	height: '100%',
	position: 'absolute',
	pointerEvents: 'none',
	display: 'flex',
	alignItems: 'center',
	justifyContent: 'center',
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
	color: 'inherit',
	'& .MuiInputBase-input': {
		padding: theme.spacing(1, 1, 1, 0),
		// vertical padding + font size from searchIcon
		paddingLeft: `calc(1em + ${theme.spacing(4)})`,
		transition: theme.transitions.create('width'),
		width: '100%',
		[theme.breakpoints.up('sm')]: {
			width: '12ch',
			'&:focus': {
				width: '20ch',
			},
		},
	},
}));

const Navbar = (props) => {
	const {
		setDarkMode,
		darkMode,
		toggleFilter,
		setToggleFilter,
		setSearchValue,
	} = props;
	const screen = UserWindow();
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
					{screen.dynamicWidth > 900 && (
						<>
							<Button
								variant="contained"
								color="secondary"
								endIcon={<SortByAlphaIcon />}
								onClick={() => setToggleFilter(!toggleFilter)}
								style={{ marginRight: 10, minWidth: 120 }}
								id="demo-customized-button"
								aria-controls="demo-customized-menu"
								aria-haspopup="true"
							>
								{`Sort`}
							</Button>
							<Button
								variant="outlined"
								color="inherit"
								endIcon={<FilterListIcon />}
								onClick={() => setToggleFilter(!toggleFilter)}
								style={{ minWidth: 120 }}
								id="demo-customized-button"
								aria-controls="demo-customized-menu"
								aria-haspopup="true"
							>
								{`Filters`}
							</Button>
							<Search>
								<SearchIconWrapper>
									<SearchIcon />
								</SearchIconWrapper>
								<StyledInputBase
									placeholder="Search…"
									onChange={(event) =>
										setSearchValue(event.target.value.toLowerCase())
									}
								/>
								<Button variant="contained" onClick={() => setSearchValue('')}>
									Clear
								</Button>
							</Search>
						</>
					)}
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
