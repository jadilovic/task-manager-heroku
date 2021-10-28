import React, { useState, useEffect } from 'react';
import { logout, isAuthenticated, getUserToken } from '../auth/Authentication';
// import useLocalStorageHook from '../utils/useLocalStorageHook';
import { useHistory } from 'react-router-dom';
import { styled } from '@mui/material/styles';
import {
	Box,
	Paper,
	Grid,
	Container,
	Typography,
	CardMedia,
	Card,
	CardContent,
	TextField,
	Button,
	CardActions,
	Alert,
} from '@mui/material';
import TaskCard from '../components/TaskCard';

const Item = styled(Paper)(({ theme }) => ({
	...theme.typography.body2,
	padding: theme.spacing(1),
	textAlign: 'center',
	color: theme.palette.text.secondary,
}));

const getAvatarColor = () => {
	var letters = '0123456789ABCDEF';
	var color = '#';
	for (var i = 0; i < 6; i++) {
		color += letters[Math.floor(Math.random() * 16)];
	}
	return color;
};

const Home = () => {
	// const data = useLocalStorageHook();
	const [tasksList, setTasksList] = useState([]);
	const [taskName, setTaskName] = useState('');
	const [errorMessage, setErrorMessage] = useState('');
	const [userToken, setUserToken] = useState(getUserToken());
	const history = useHistory();

	const handleLogout = () => {
		logout();
		history.push('/');
	};

	useEffect(() => {
		//	setTasksList([...data.getAllTasks()]);
		setUserToken(getUserToken());
	}, []);

	const handleChange = (e) => {
		e.preventDefault();
		setTaskName(e.target.value);
	};

	const checkIfTaskExists = (enteredTaskName) => {
		//	const tasksList = data.getAllTasks();
		return tasksList.find((task) => task.name === enteredTaskName);
	};

	const saveTaskObject = (enteredTaskName) => {
		const existingTask = checkIfTaskExists(enteredTaskName);
		if (existingTask) {
			setErrorMessage('Task name -' + enteredTaskName + '- aleready exists.');
		} else {
			const newTask = {
				// ON TOP OF THE LIST AND THEN CAN GO TO EDIT
				name: enteredTaskName,
				dateCreated: new Date().toDateString(),
				currentStatus: { id: 1, message: 'Idle task', severity: 'error' },
				description: '',
				avatarColor: getAvatarColor(),
			};
			//	data.addNewTaskObjectToArrayAndSave(newTask);
		}
	};

	const handleSubmit = (e) => {
		e.preventDefault();
		setErrorMessage('');
		const firstThreeCharacters = taskName.substring(0, 4);
		if (!firstThreeCharacters.match(/^[a-z0-9]+$/i) || taskName.length < 3) {
			setErrorMessage('You must enter task name to create new task');
		} else {
			saveTaskObject(taskName);
			//	setTasksList([...data.getAllTasks()]);
		}
	};

	useEffect(() => {
		setTaskName('');
	}, [tasksList]);

	return (
		<Container maxWidth="sm">
			<Box sx={{ flexGrow: 1 }}>
				<Grid
					style={{ textAlign: 'center' }}
					container
					alignItems="center"
					justify="center"
					spacing={2}
				>
					<Grid color="black" item xs={12}>
						<Typography
							bgcolor="yellow"
							gutterBottom
							variant="h6"
							component="div"
						>
							{`${userToken.userEmail} Task Manager`}
						</Typography>
					</Grid>
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
											{errorMessage && (
												<Box
													sx={{
														paddingTop: 2,
														paddingBottom: 2,
														bgcolor: 'background.paper',
													}}
												>
													<Alert severity="error">{errorMessage}</Alert>
												</Box>
											)}
											<TextField
												value={taskName}
												fullWidth
												label="New task"
												id="fullWidth"
												onChange={handleChange}
												variant="outlined"
												color="primary"
												error={!!errorMessage}
											/>
										</Box>
									</CardContent>
									<CardActions style={{ justifyContent: 'center' }}>
										<Button variant="contained" color="primary" type="submit">
											create task
										</Button>
									</CardActions>
									<CardActions>
										<button onClick={() => handleLogout()}>Logout</button>
									</CardActions>
								</form>
							</Card>
						</Item>
					</Grid>
					<Grid item xs={12}>
						{tasksList.map((task) => {
							return (
								<Item>
									<TaskCard task={task} setTasksList={setTasksList} />
								</Item>
							);
						})}
					</Grid>
				</Grid>
			</Box>
		</Container>
	);
};

export default Home;
