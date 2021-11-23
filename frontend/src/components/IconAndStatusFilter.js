import React, { useState } from 'react';
import { styled } from '@mui/material/styles';
import useAxiosRequest from '../utils/useAxiosRequest';
import {
	Card,
	CardContent,
	Button,
	Checkbox,
	FormControl,
	InputLabel,
	Select,
	MenuItem,
} from '@mui/material';
import colors from '../data/colors';
import icons from '../data/icons';
import OutlinedInput from '@mui/material/OutlinedInput';
import ListItemText from '@mui/material/ListItemText';

const SectionStyle = styled(Card)(({ theme }) => ({
	width: '100%',
	//	maxWidth: 464,
	display: 'flex',
	flexDirection: 'column',
	justifyContent: 'center',
	paddingTop: 3,
}));

const ContentStyle = styled('div')(({ theme }) => ({
	margin: 'auto',
	display: 'flex',
	flexDirection: 'column',
	justifyItems: 'center',
	padding: theme.spacing(2, 0),
}));

const IconAndStatusFilter = (props) => {
	const mongoDB = useAxiosRequest();
	const { tasks, setFilteredTasks, statuses } = props;
	const [selectedIcons, setSelectedIcons] = useState([]);
	const [selectedStatuses, setSelectedStatus] = useState([]);

	const handleChange = (event) => {
		const {
			target: { value, name },
		} = event;
		if (name === 'status') {
			setSelectedStatus(
				// On autofill we get a the stringified value.
				typeof value === 'string' ? value.split(',') : value
			);
		} else {
			setSelectedIcons(
				// On autofill we get a the stringified value.
				typeof value === 'string' ? value.split(',') : value
			);
		}
	};

	const getStatusId = (statusMessage) => {
		const selectedStatus = statuses.find(
			(status) => status.message === statusMessage
		);
		return selectedStatus._id;
	};

	const handleFilter = async () => {
		if (selectedIcons.length > 0 || selectedStatuses.length > 0) {
			const selectedStatusesIds = selectedStatuses.map((status) =>
				getStatusId(status)
			);
			const filteredTasks = await mongoDB.filterTasks(
				selectedIcons,
				selectedStatusesIds
			);
			setFilteredTasks(filteredTasks);
		}
	};

	const clearFilter = () => {
		setSelectedStatus([]);
		setSelectedIcons([]);
		setFilteredTasks(tasks);
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
		<SectionStyle>
			<CardContent>
				<ContentStyle>
					<FormControl sx={{ m: 1 }}>
						<InputLabel id="demo-multiple-checkbox-label">
							Group filter
						</InputLabel>
						<Select
							labelId="demo-multiple-checkbox-label"
							id="demo-multiple-checkbox"
							multiple
							name="icon"
							value={selectedIcons}
							onChange={handleChange}
							input={<OutlinedInput label="Icons filter" />}
							renderValue={(selected) => selected.join(', ')}
						>
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
										checked={
											selectedIcons.findIndex((i) => i === icon.name) > -1
										}
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
						</Select>
					</FormControl>
				</ContentStyle>
				<ContentStyle>
					<FormControl sx={{ m: 1 }}>
						<InputLabel id="demo-multiple-checkbox-label">
							Status filter
						</InputLabel>
						<Select
							labelId="demo-multiple-checkbox-label"
							id="demo-multiple-checkbox"
							multiple
							name="status"
							value={selectedStatuses}
							onChange={handleChange}
							input={<OutlinedInput label="Status filter" />}
							renderValue={(selected) => selected.join(', ')}
						>
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
										checked={
											selectedStatuses.findIndex((s) => s === status.message) >
											-1
										}
									/>
									<ListItemText primary={status.message} />
								</MenuItem>
							))}
						</Select>
					</FormControl>
				</ContentStyle>
				<SectionStyle>
					<Button
						style={{ margin: 10 }}
						variant="contained"
						color="primary"
						onClick={() => handleFilter()}
					>
						Start filter
					</Button>
					<Button
						style={{ margin: 10 }}
						variant="contained"
						color="primary"
						onClick={() => clearFilter()}
					>
						Clear filter
					</Button>
				</SectionStyle>
			</CardContent>
		</SectionStyle>
	);
};

export default IconAndStatusFilter;
