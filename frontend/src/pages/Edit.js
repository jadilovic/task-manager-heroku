import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import useLocalStorageHook from '../utils/useLocalStorageHook';
import useAxiosRequest from '../utils/useAxiosRequest';
import { styled } from '@mui/material/styles';
import {
	Grid,
	TextField,
	FormControl,
	Select,
	MenuItem,
	Container,
	Button,
	Box,
	Paper,
	InputLabel,
	Typography,
	Stack,
	Chip,
	Alert,
} from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';

const Item = styled(Paper)(({ theme }) => ({
	...theme.typography.body2,
	padding: theme.spacing(1),
	textAlign: 'center',
	color: theme.palette.text.secondary,
}));

const Edit = () => {
	const history = useHistory();
	const data = useLocalStorageHook();
	const mongoDB = useAxiosRequest();
	const [taskValues, setTaskValues] = useState({
		currentStatus: '',
	});
	const [statuses, setStatuses] = useState([]);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState('');

	const getTaskObject = async (taskId) => {
		try {
			const editingTaskObject = await mongoDB.getTask(taskId);
			setTaskValues(editingTaskObject.task);
		} catch (error) {
			console.log('get task object error: ', error);
		}
	};

	const getTaskStatuses = async () => {
		const statuses = await mongoDB.getTaskStatuses();
		setStatuses(statuses);
		setLoading(false);
	};

	useEffect(() => {
		const taskId = localStorage.getItem('currentTaskId');
		getTaskObject(taskId);
		getTaskStatuses();
	}, []);

	const handleInputChange = (e) => {
		const { name, value } = e.target;
		setTaskValues({
			...taskValues,
			[name]: value,
		});
	};

	const handleSubmit = async (event) => {
		event.preventDefault();
		try {
			console.log('new task values : ', taskValues);
			const editedTask = await mongoDB.updateTask(taskValues);
			console.log('edited task values : ', editedTask);
			history.push('/home');
		} catch (error) {
			console.log(error);
			setError(error.response.data.msg);
		}
	};

	const handleTaskStatusChange = (event) => {
		setTaskValues({
			...taskValues,
			currentStatus: event.target.value,
		});
	};

	if (loading) {
		return <Typography>Loading...</Typography>;
	}
	return (
		<Container style={{ backgroundColor: 'lightgray' }} maxWidth="sm">
			<Box sx={{ flexGrow: 1 }} padding={2}>
				<Grid item xs={12}>
					<Item>
						<form onSubmit={handleSubmit}>
							<Grid
								container
								alignItems="center"
								justify="center"
								direction="column"
								spacing={4}
							>
								<Grid color="green" item xs={12}>
									<Stack spacing={1} alignItems="center">
										<Chip
											style={{ minWidth: 300, minHeight: 40, fontSize: 19 }}
											size="medium"
											icon={<EditIcon />}
											label="Edit Selected Task"
											color="default"
										/>
									</Stack>
								</Grid>
								<Grid item xs={12}>
									<Box
										sx={{
											width: 300,
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
											style={{ minWidth: 300 }}
											id="name-input"
											name="name"
											label="Name"
											type="text"
											value={taskValues.name}
											onChange={handleInputChange}
										/>
									</Box>
								</Grid>
								<Grid item xs={12}>
									<FormControl style={{ minWidth: 300 }}>
										<InputLabel>Select current status</InputLabel>
										<Select
											value={taskValues?.currentStatus}
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
								</Grid>
								<Grid item xs={12}>
									<TextField
										multiline
										minRows={4}
										inputProps={{ maxLength: 120 }}
										style={{ minWidth: 300 }}
										id="description-input"
										name="description"
										label="Description"
										type="text"
										value={taskValues.description}
										onChange={handleInputChange}
									/>
								</Grid>
								<Grid item xs={12}>
									<Typography>
										Task created on{' '}
										{new Date(taskValues.dateCreated).toDateString()}
									</Typography>
								</Grid>
								<Grid item xs={12}>
									<Button
										style={{ minWidth: 300 }}
										variant="contained"
										color="primary"
										type="submit"
										size="large"
									>
										Submit
									</Button>
								</Grid>
								<Grid item xs={12}>
									<Button
										onClick={() => history.push('/home')}
										variant="contained"
										color="warning"
										size="large"
									>
										Back to home page
									</Button>
								</Grid>
							</Grid>
						</form>
					</Item>
				</Grid>
			</Box>
		</Container>
	);
};
export default Edit;
