import React from 'react';
import Paper from '@mui/material/Paper';
import InputBase from '@mui/material/InputBase';
import Divider from '@mui/material/Divider';
import { Button } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';

export default function CustomizedInputBase(props) {
	const { tasks, setFilteredTasks } = props;

	const handleSearch = (event) => {
		let value = event.target.value.toLowerCase();
		console.log('value : ', value);
		let result = [];
		console.log(value);
		result = tasks.filter((task) => {
			return (
				task.name.search(value) !== -1 || task.description.search(value) !== -1
			);
		});
		setFilteredTasks(result);
	};

	const handleClear = () => {
		document.getElementById('searchValue').value = '';
		setFilteredTasks(tasks);
	};

	return (
		<Paper
			component="form"
			sx={{
				p: '2px 4px',
				display: 'flex',
				alignItems: 'center',
				width: '100%',
			}}
		>
			<SearchIcon />
			<Divider sx={{ height: 40, m: 0.5 }} orientation="vertical" />
			<InputBase
				id="searchValue"
				sx={{ ml: 1, flex: 1, height: 50 }}
				placeholder="Search tasks by name and description"
				onChange={(event) => handleSearch(event)}
			/>
			<Divider sx={{ height: 40, m: 0.5 }} orientation="vertical" />
			<Button variant="contained" onClick={() => handleClear()}>
				Clear search
			</Button>
		</Paper>
	);
}
