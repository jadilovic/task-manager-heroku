import React, { useState } from 'react';
import { styled, alpha } from '@mui/material/styles';
import { Paper, Button } from '@mui/material';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import Divider from '@mui/material/Divider';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import ArrowDownward from '@mui/icons-material/ArrowDownward';
import ArrowUpwardIcon from '@mui/icons-material/ArrowUpward';
import SortByAlphaIcon from '@mui/icons-material/SortByAlpha';

const StyledMenu = styled((props) => (
	<Menu
		elevation={0}
		anchorOrigin={{
			vertical: 'bottom',
			horizontal: 'right',
		}}
		transformOrigin={{
			vertical: 'top',
			horizontal: 'right',
		}}
		{...props}
	/>
))(({ theme }) => ({
	'& .MuiPaper-root': {
		borderRadius: 6,
		marginTop: theme.spacing(1),
		minWidth: 180,
		color:
			theme.palette.mode === 'light'
				? 'rgb(55, 65, 81)'
				: theme.palette.grey[300],
		boxShadow:
			'rgb(255, 255, 255) 0px 0px 0px 0px, rgba(0, 0, 0, 0.05) 0px 0px 0px 1px, rgba(0, 0, 0, 0.1) 0px 10px 15px -3px, rgba(0, 0, 0, 0.05) 0px 4px 6px -2px',
		'& .MuiMenu-list': {
			padding: '4px 0',
		},
		'& .MuiMenuItem-root': {
			'& .MuiSvgIcon-root': {
				fontSize: 18,
				color: theme.palette.text.secondary,
				marginRight: theme.spacing(1.5),
			},
			'&:active': {
				backgroundColor: alpha(
					theme.palette.primary.main,
					theme.palette.action.selectedOpacity
				),
			},
		},
	},
}));

export default function Sort(props) {
	const { tasks, setFilteredTasks } = props;
	const [anchorEl, setAnchorEl] = useState(null);
	const open = Boolean(anchorEl);

	const handleClick = (event) => {
		setAnchorEl(event.currentTarget);
	};

	const handleClose = (sortingSelection) => {
		if (
			sortingSelection === 'ascending' &&
			typeof sortingSelection === 'string'
		) {
			const sortedTasks = tasks.slice(0).sort((a, b) => {
				console.log(new Date(b.updatedAt));
				return new Date(a.updatedAt) - new Date(b.updatedAt);
			});
			setFilteredTasks(sortedTasks);
		} else {
			setFilteredTasks(tasks);
		}
		setAnchorEl(null);
	};

	return (
		<Paper
			component="form"
			style={{ justifyContent: 'center' }}
			sx={{
				p: '2px 4px',
				display: 'flex',
				alignItems: 'center',
				width: '100%',
				height: 50,
			}}
		>
			<SortByAlphaIcon />
			<Divider sx={{ height: 40, m: 2.5 }} orientation="vertical" />
			<Button
				style={{ minWidth: 175 }}
				id="demo-customized-button"
				aria-controls="demo-customized-menu"
				aria-haspopup="true"
				aria-expanded={open ? 'true' : undefined}
				variant="contained"
				disableElevation
				onClick={handleClick}
				endIcon={<KeyboardArrowDownIcon />}
			>
				{` Sort by date`}
			</Button>
			<StyledMenu
				id="demo-customized-menu"
				MenuListProps={{
					'aria-labelledby': 'demo-customized-button',
				}}
				anchorEl={anchorEl}
				open={open}
				onClose={handleClose}
			>
				<MenuItem onClick={() => handleClose('ascending')} disableRipple>
					<ArrowUpwardIcon />
					Ascending
				</MenuItem>
				<Divider sx={{ my: 0.5 }} />
				<MenuItem onClick={() => handleClose('descending')} disableRipple>
					<ArrowDownward />
					Descending
				</MenuItem>
			</StyledMenu>
		</Paper>
	);
}
