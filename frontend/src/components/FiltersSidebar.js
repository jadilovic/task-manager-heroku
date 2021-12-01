import React, { useState } from 'react';
import useAxiosRequest from '../utils/useAxiosRequest';
// material
import {
	Box,
	Stack,
	Button,
	Drawer,
	Divider,
	Checkbox,
	FormControl,
	Paper,
	Typography,
	MenuItem,
	ListItemText,
} from '@mui/material';
import colors from '../data/colors';
import icons from '../data/icons';
import FilterListIcon from '@mui/icons-material/FilterList';
// ----------------------------------------------------------------------

export default function FiltersSidebar(props) {
	const mongoDB = useAxiosRequest();
	const {
		tasks,
		setFilteredTasks,
		statuses,
		isOpenFilter,
		onOpenFilter,
		onCloseFilter,
		setSelectedFilters,
	} = props;
	const [selectedIcons, setSelectedIcons] = useState([]);
	const [selectedStatuses, setSelectedStatus] = useState([]);

	const handleChange = (name, value) => {
		if (name === 'status') {
			if (selectedStatuses.findIndex((i) => i === value) > -1) {
				const index = selectedStatuses.indexOf(value);
				selectedStatuses.splice(index, 1);
				setSelectedStatus([...selectedStatuses]);
			} else {
				setSelectedStatus([...selectedStatuses, value]);
			}
		} else {
			if (selectedIcons.findIndex((i) => i === value) > -1) {
				const index = selectedIcons.indexOf(value);
				selectedIcons.splice(index, 1);
				setSelectedIcons([...selectedIcons]);
			} else {
				setSelectedIcons([...selectedIcons, value]);
			}
		}
	};

	const getStatusId = (statusMessage) => {
		const selectedStatus = statuses.find(
			(status) => status.message === statusMessage
		);
		return selectedStatus._id;
	};

	const handleFilter = async () => {
		// console.log(selectedIcons, selectedStatuses);
		if (selectedIcons.length > 0 || selectedStatuses.length > 0) {
			const selectedStatusesIds = selectedStatuses.map((status) =>
				getStatusId(status)
			);

			// const filteredTasks = await mongoDB.filterTasks( --- this is post request
			const filteredTasks = await mongoDB.getAllTasks(
				// --- this is get request
				selectedIcons,
				selectedStatusesIds
			);
			setFilteredTasks(filteredTasks);
			let filtersMessage = '';
			if (selectedIcons.join('')) {
				filtersMessage = filtersMessage.concat(
					'Group filters: ' + selectedIcons.join(', ') + ' | '
				);
			}
			if (selectedStatuses.join('')) {
				filtersMessage = filtersMessage.concat(
					'Status filters: ' + selectedStatuses.join(', ')
				);
			}
			setSelectedFilters(filtersMessage);
		}
		onCloseFilter();
	};

	const clearFilter = () => {
		setSelectedStatus([]);
		setSelectedIcons([]);
		setFilteredTasks(tasks);
		setSelectedFilters('');
		onCloseFilter();
	};

	const getStatusColor = (statusId) => {
		if (statusId === '6186378bf0d3d3150277b8d3') {
			return '#ff9800';
		} else if (statusId === '618637ddf0d3d3150277b8d5') {
			return '#03a9f4';
		} else {
			return '#4caf50';
		}
	};

	return (
		<>
			<Paper
				component="form"
				style={{ justifyContent: 'center' }}
				sx={{
					display: 'flex',
					alignItems: 'center',
					width: '100%',
					height: 50,
				}}
			>
				<FilterListIcon />
				<Divider sx={{ height: 40, m: 2.5 }} orientation="vertical" />
				<Button
					style={{ minWidth: 100 }}
					variant="outlined"
					color="inherit"
					onClick={onOpenFilter}
				>
					Filters&nbsp;
				</Button>
			</Paper>
			<Drawer
				anchor="right"
				open={isOpenFilter}
				onClose={onCloseFilter}
				PaperProps={{
					sx: { width: 280, border: 'none', overflow: 'hidden' },
				}}
			>
				<Stack spacing={3} sx={{ p: 2 }}>
					<Typography variant="subtitle1" sx={{ ml: 1 }}>
						Group filters
					</Typography>
					<FormControl sx={{ m: 1 }}>
						{icons.map((icon, index) => (
							<MenuItem
								style={{
									backgroundColor: colors[index].hex,
									color: 'white',
								}}
								key={icon.name}
								value={icon.name}
							>
								<Checkbox
									onChange={() => handleChange('icon', icon.name)}
									checked={selectedIcons.findIndex((i) => i === icon.name) > -1}
								/>
								<div
									style={{
										display: 'flex',
										alignItems: 'center',
										flexWrap: 'wrap',
									}}
								>
									{icon.icon}
									<div style={{ marginLeft: 20 }}>
										<ListItemText primary={icon.name} />
									</div>
								</div>
							</MenuItem>
						))}
					</FormControl>
				</Stack>

				<Divider />

				<Stack spacing={3} sx={{ p: 2 }}>
					<Typography variant="subtitle1" sx={{ ml: 1 }}>
						Status filters
					</Typography>
					<FormControl sx={{ m: 1 }}>
						{statuses.map((status) => (
							<MenuItem
								key={status._id}
								value={status.message}
								style={{
									backgroundColor: getStatusColor(status._id),
									color: 'white',
								}}
							>
								<Checkbox
									onChange={() => handleChange('status', status.message)}
									checked={
										selectedStatuses.findIndex((s) => s === status.message) > -1
									}
								/>
								<ListItemText primary={status.message} />
							</MenuItem>
						))}
					</FormControl>
				</Stack>
				<Divider />

				<Box sx={{ p: 2 }}>
					<Button
						fullWidth
						size="large"
						type="submit"
						color="inherit"
						variant="outlined"
						onClick={() => handleFilter()}
					>
						Start Filter
					</Button>
				</Box>
				<Box sx={{ p: 2 }}>
					<Button
						fullWidth
						size="large"
						type="submit"
						color="inherit"
						variant="outlined"
						onClick={() => clearFilter()}
					>
						Clear All
					</Button>
				</Box>
			</Drawer>
		</>
	);
}
