import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { getUserToken } from '../auth/Authentication';
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

const Home = () => {
	// const data = useLocalStorageHook();
	const [tasksList, setTasksList] = useState([]);
	const [taskName, setTaskName] = useState('');
	const [error, setError] = useState('');
	const [userToken, setUserToken] = useState({});
	const history = useHistory();
	const serverURL = 'http://localhost:5000';

	const getAllTasks = async () => {
		try {
			await axios({
				method: 'GET',
				url: `${serverURL}/api/v1/tasks`,
				headers: {
					authorization: `Bearer ${getUserToken().userToken}`,
				},
			}).then((res) => {
				const dbTasks = res.data.tasks.reverse();
				setTasksList(dbTasks);
				setTaskName('');
				history.push('/home');
			});
		} catch (err) {
			console.log(err.response);
			setError(err.response.data.msg);
		}
	};

	useEffect(() => {
		getAllTasks();
		setUserToken(getUserToken());
	}, []);

	const handleChange = (e) => {
		e.preventDefault();
		setTaskName(e.target.value);
	};

	const saveTaskObject = (enteredTaskName) => {
		const newTask = {
			name: enteredTaskName,
		};
		submitData(newTask);
	};

	// go directly to submitData from handle submit
	const submitData = async (newTask) => {
		try {
			await axios({
				method: 'POST',
				url: `${serverURL}/api/v1/tasks`,
				data: {
					name: newTask.name,
				},
				headers: {
					authorization: `Bearer ${getUserToken().userToken}`,
				},
			}).then((res) => {
				console.log('task created: ', res.data);
				setTaskName('');
				getAllTasks();
			});
		} catch (err) {
			console.log(err.response);
			setError(err.response.data.msg);
		}
	};

	const handleSubmit = (e) => {
		e.preventDefault();
		setError('');
		const firstThreeCharacters = taskName.substring(0, 4);
		// use trim for space
		if (!firstThreeCharacters.match(/^[a-z0-9]+$/i) || taskName.length < 3) {
			setError('You must enter task name to create new task');
		} else {
			saveTaskObject(taskName);
			//	setTasksList([...data.getAllTasks()]);
		}
	};

	return (
		<>
			<Container maxWidth="sm">
				<Box sx={{ flexGrow: 1 }}>
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
												value={taskName}
												fullWidth
												label="New task"
												id="fullWidth"
												onChange={handleChange}
												variant="outlined"
												color="primary"
												error={!!error}
											/>
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
					<Grid item xs={12}>
						{tasksList.map((task, index) => {
							return (
								<Item key={index}>
									<TaskCard task={task} refreshTasks={getAllTasks} />
								</Item>
							);
						})}
					</Grid>
				</Box>
			</Container>
		</>
	);
};

export default Home;
