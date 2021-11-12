import React, { useState, useEffect } from 'react';
import { styled } from '@mui/material/styles';
import useAxiosRequest from '../utils/useAxiosRequest';
import {
	Box,
	Card,
	CardContent,
	TextField,
	Button,
	CardActions,
	Alert,
	FormControl,
	InputLabel,
	Select,
	MenuItem,
} from '@mui/material';

const SectionStyle = styled(Card)(({ theme }) => ({
	width: '100%',
	maxWidth: 464,
	display: 'flex',
	flexDirection: 'column',
	justifyContent: 'center',
}));

const ContentStyle = styled('div')(({ theme }) => ({
	maxWidth: 480,
	margin: 'auto',
	display: 'flex',
	flexDirection: 'column',
	justifyContent: 'center',
	padding: theme.spacing(2, 0),
}));

const CreateTask = (props) => {
	const mongoDB = useAxiosRequest();
	const [newTask, setNewTask] = useState({ name: '', statusId: '' });
	const [error, setError] = useState('');
	const { statuses, refreshTasks } = props;

	// to explore why is this happening
	useEffect(() => {
		setNewTask({ ...newTask, statusId: statuses[0]._id });
	}, []);

	const handleTaskNameChange = (event) => {
		event.preventDefault();
		setNewTask({ ...newTask, name: event.target.value });
	};

	const handleTaskStatusChange = (event) => {
		setNewTask({
			...newTask,
			statusId: event.target.value,
		});
	};

	const submitData = async (newTask) => {
		try {
			await mongoDB.createTask(newTask);
			setNewTask({ name: '', statusId: statuses[0]._id });
			refreshTasks();
		} catch (err) {
			console.log(err.response);
			setError(err.response.data.msg);
		}
	};

	const handleSubmit = (e) => {
		e.preventDefault();
		setError('');
		const trimedTaskName = newTask.name.trim();
		if (trimedTaskName.length < 3) {
			setError(
				'You must enter task name with minimum three letters to create new task'
			);
		} else {
			newTask.name = trimedTaskName;
			submitData(newTask);
		}
	};
	return (
		<SectionStyle>
			<form noValidate autoComplete="off" onSubmit={handleSubmit}>
				<CardContent>
					{error && (
						<Box
							sx={{
								paddingTop: 2,
							}}
						>
							<Alert severity="error">{error}</Alert>
						</Box>
					)}
					<ContentStyle>
						<TextField
							required
							value={newTask.name}
							fullWidth
							label="New task"
							id="fullWidth"
							onChange={handleTaskNameChange}
							variant="outlined"
							error={!!error}
						/>
					</ContentStyle>
					<ContentStyle>
						<FormControl fullWidth style={{ minWidth: 300 }}>
							<InputLabel>Select task status</InputLabel>
							<Select
								required
								value={newTask.statusId}
								label="Task current status"
								onChange={handleTaskStatusChange}
							>
								{statuses.map((taskStatus, index) => {
									return (
										<MenuItem key={index} value={taskStatus._id}>
											{taskStatus.message}
										</MenuItem>
									);
								})}
							</Select>
						</FormControl>
					</ContentStyle>
				</CardContent>
				<CardActions style={{ justifyContent: 'center' }}>
					<Button variant="contained" color="primary" type="submit">
						create task
					</Button>
				</CardActions>
			</form>
		</SectionStyle>
	);
};

export default CreateTask;
