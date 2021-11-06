import React, { useState, useEffect } from 'react';
import { styled } from '@mui/material/styles';
import useAxiosRequest from '../utils/useAxiosRequest';
import {
	Box,
	Paper,
	Grid,
	Container,
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
	Typography,
} from '@mui/material';
import TaskCard from '../components/TaskCard';

const Item = styled(Paper)(({ theme }) => ({
	...theme.typography.body2,
	padding: theme.spacing(1),
	textAlign: 'center',
	color: theme.palette.text.secondary,
}));

const Home = () => {
	const mongoDB = useAxiosRequest();
	const [tasksList, setTasksList] = useState([]);
	const [taskStatusList, setTaskStatusList] = useState([]);
	const [taskStatus, setTaskStatus] = useState({
		colorNotification: '',
		message: '',
		_id: '',
	});
	const [newTask, setNewTask] = useState({ name: '', statusId: '' });
	const [error, setError] = useState('');

	const displayTasks = async () => {
		try {
			const dbTasks = await mongoDB.getAllTasks();
			setTasksList(dbTasks);
		} catch (err) {
			console.log(err.response);
			setError(err.response.data.msg);
		}
	};

	const getTaskStatuses = async () => {
		const statuses = await mongoDB.getTaskStatuses();
		setTaskStatusList(statuses);
		setTaskStatus(statuses[0]);
		setNewTask({ ...newTask, statusId: statuses[0]._id });
	};

	useEffect(() => {
		displayTasks();
		getTaskStatuses();
	}, []);

	const handleChange = (e) => {
		e.preventDefault();
		setNewTask({ ...newTask, name: e.target.value });
	};

	const handleTaskStatusChange = (event) => {
		setNewTask({
			...newTask,
			statusId: event.target.value,
		});
		const statusIndex = taskStatusList.findIndex(
			(status) => status._id === event.target.value
		);
		setTaskStatus(taskStatusList[statusIndex]);
	};

	const submitData = async (newTask) => {
		try {
			await mongoDB.createTask(newTask);
			setNewTask({ name: '', statusId: taskStatusList[0]._id });
			setTaskStatus(taskStatusList[0]);
			displayTasks();
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
		<Container maxWidth="sm" component="main">
			<Box sx={{ flexGrow: 1 }} padding={2}>
				<Grid justifyItems="center" item xs={12}>
					<Item>
						<Card>
							<form noValidate autoComplete="off" onSubmit={handleSubmit}>
								<CardContent>
									<Box
										sx={{
											width: 500,
											maxWidth: '100%',
										}}
									>
										{error && (
											<Box
												sx={{
													paddingTop: 2,
													paddingBottom: 2,
													bgcolor: 'background.paper',
												}}
											>
												<Alert severity="error">{error}</Alert>
											</Box>
										)}
										<TextField
											value={newTask.name}
											fullWidth
											label="New task"
											id="fullWidth"
											onChange={handleChange}
											variant="outlined"
											color="primary"
											error={!!error}
										/>
									</Box>
									<Box
										sx={{
											width: 500,
											maxWidth: '100%',
											paddingTop: 2,
											bgcolor: 'background.paper',
										}}
									>
										<FormControl fullWidth style={{ minWidth: 300 }}>
											<InputLabel>Select task status</InputLabel>
											<Select
												value={taskStatus._id}
												label="Task current status"
												onChange={handleTaskStatusChange}
											>
												{taskStatusList.map((taskStatus, index) => {
													return (
														<MenuItem key={index} value={taskStatus._id}>
															{taskStatus.message}
														</MenuItem>
													);
												})}
											</Select>
										</FormControl>
									</Box>
								</CardContent>
								<CardActions style={{ justifyContent: 'center' }}>
									<Button variant="contained" color="primary" type="submit">
										create task
									</Button>
								</CardActions>
							</form>
						</Card>
					</Item>
				</Grid>
				{taskStatusList.length > 0 ? (
					<Grid item xs={12}>
						{tasksList.map((task, index) => {
							return (
								<Item key={index}>
									<TaskCard
										task={task}
										taskStatusObjects={taskStatusList}
										refreshTasks={displayTasks}
									/>
								</Item>
							);
						})}
					</Grid>
				) : (
					<Grid item xs={12}>
						<Typography>No tasks created</Typography>
					</Grid>
				)}
			</Box>
		</Container>
	);
};

export default Home;
