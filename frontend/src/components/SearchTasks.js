import { Icon } from '@iconify/react';
import { useState } from 'react';
import searchFill from '@iconify/icons-eva/search-fill';
// material
import { styled, alpha } from '@mui/material/styles';
import {
	Box,
	Input,
	Slide,
	Button,
	InputAdornment,
	ClickAwayListener,
	IconButton,
} from '@mui/material';

// ----------------------------------------------------------------------

const APPBAR_MOBILE = 64;
const APPBAR_DESKTOP = 92;

const SearchbarStyle = styled('div')(({ theme }) => ({
	top: 0,
	left: 0,
	zIndex: 99,
	width: '100%',
	display: 'flex',
	position: 'absolute',
	alignItems: 'center',
	height: APPBAR_MOBILE,
	backdropFilter: 'blur(6px)',
	WebkitBackdropFilter: 'blur(6px)', // Fix on Mobile
	padding: theme.spacing(0, 3),
	backgroundColor: `${alpha(theme.palette.background.default, 0.72)}`,
	[theme.breakpoints.up('md')]: {
		height: APPBAR_DESKTOP,
		padding: theme.spacing(0, 5),
	},
}));

// ----------------------------------------------------------------------

export default function Searchbar(props) {
	const [isOpen, setOpen] = useState(false);
	const { tasks, setFilteredTasks } = props;

	const handleOpen = () => {
		setOpen((prev) => !prev);
	};

	const handleClose = () => {
		setOpen(false);
	};

	const handleSearch = (event) => {
		let value = event.target.value.toLowerCase();
		let result = [];
		console.log(value);
		result = tasks.filter((task) => {
			return (
				task.name.search(value) !== -1 || task.description.search(value) !== -1
			);
		});
		setFilteredTasks(result);
	};

	return (
		<ClickAwayListener onClickAway={handleClose}>
			<div>
				{!isOpen && (
					<IconButton onClick={handleOpen}>
						<Icon icon={searchFill} width={20} height={20} />
					</IconButton>
				)}

				<Slide direction="down" in={isOpen} mountOnEnter unmountOnExit>
					<SearchbarStyle>
						<Input
							autoFocus
							fullWidth
							disableUnderline
							placeholder="Search…"
							onChange={(event) => handleSearch(event)}
							startAdornment={
								<InputAdornment position="start">
									<Box
										component={Icon}
										icon={searchFill}
										sx={{ color: 'text.disabled', width: 20, height: 20 }}
									/>
								</InputAdornment>
							}
							sx={{ mr: 1, fontWeight: 'fontWeightBold' }}
						/>
						<Button variant="contained" onClick={handleClose}>
							Close
						</Button>
					</SearchbarStyle>
				</Slide>
			</div>
		</ClickAwayListener>
	);
}
