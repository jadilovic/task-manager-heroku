import React from 'react';
import { Paper, TextField } from '@mui/material';
import Divider from '@mui/material/Divider';
import { Button } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';

export default function CustomizedInputBase(props) {
	const { tasks, setFilteredTasks } = props;

	const handleSearch = (event) => {
		let value = event.target.value.toLowerCase();
		let result = [];
		result = tasks.filter((task) => {
			return (
				task.name.search(value) !== -1 || task.description.search(value) !== -1
			);
		});
		setFilteredTasks(result);
	};

	const handleClear = () => {
		document.getElementById('standard-basic').value = '';
		setFilteredTasks(tasks);
	};

	return (
		<Paper
			component="form"
			sx={{
				paddingTop: 0,
				display: 'flex',
				alignItems: 'center',
				width: '100%',
			}}
		>
			<SearchIcon />
			<Divider sx={{ height: 45, m: 0.5 }} orientation="vertical" />
			<TextField
				fullWidth
				id="standard-basic"
				variant="standard"
				placeholder="Search tasks by name or description"
				onChange={(event) => handleSearch(event)}
			/>
			<Divider sx={{ height: 40, m: 0.5 }} orientation="vertical" />
			<Button variant="contained" onClick={() => handleClear()}>
				Clear
			</Button>
		</Paper>
	);
}
