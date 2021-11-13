import React, { useState } from 'react';
import { styled, alpha } from '@mui/material/styles';
import { Paper, Button } from '@mui/material';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import Divider from '@mui/material/Divider';
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import FilterAltIcon from '@mui/icons-material/FilterAlt';
import HourglassEmpty from '@mui/icons-material/HourglassEmpty';
import { CheckCircleOutline, ArrowForward } from '@mui/icons-material';

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

export default function Filter(props) {
	const { tasks, setFilteredTasks } = props;
	const [anchorEl, setAnchorEl] = useState(null);
	const open = Boolean(anchorEl);

	const handleClick = (event) => {
		setAnchorEl(event.currentTarget);
	};

	const handleClose = (statusId) => {
		if (statusId !== 'all' && typeof statusId === 'string') {
			const filteredTasks = tasks.filter(
				(task) => task.currentStatus === statusId
			);
			setFilteredTasks(filteredTasks);
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
			<FilterAltIcon />
			<Divider sx={{ height: 40, m: 2.5 }} orientation="vertical" />
			<Button
				id="demo-customized-button"
				aria-controls="demo-customized-menu"
				aria-haspopup="true"
				aria-expanded={open ? 'true' : undefined}
				variant="contained"
				disableElevation
				onClick={handleClick}
				endIcon={<KeyboardArrowDownIcon />}
			>
				{` Filter options`}
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
				<MenuItem
					onClick={() => handleClose('6186378bf0d3d3150277b8d3')}
					disableRipple
				>
					<HourglassEmpty />
					Initiated
				</MenuItem>
				<MenuItem
					onClick={() => handleClose('618637ddf0d3d3150277b8d5')}
					disableRipple
				>
					<ArrowForward />
					Ongoing
				</MenuItem>
				<MenuItem
					onClick={() => handleClose('618637f9f0d3d3150277b8d7')}
					disableRipple
				>
					<CheckCircleOutline />
					Completed
				</MenuItem>
				<Divider sx={{ my: 0.5 }} />
				<MenuItem onClick={() => handleClose('all')} disableRipple>
					<MoreHorizIcon />
					All tasks
				</MenuItem>
			</StyledMenu>
		</Paper>
	);
}
