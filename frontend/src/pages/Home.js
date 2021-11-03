import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { getUserToken } from '../auth/Authentication';
import { useHistory } from 'react-router-dom';
import { styled } from '@mui/material/styles';
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
} from '@mui/material';
import TaskCard from '../components/TaskCard';

const Item = styled(Paper)(({ theme }) => ({
	...theme.typography.body2,
	padding: theme.spacing(1),
	textAlign: 'center',
	color: theme.palette.text.secondary,
}));

const Home = () => {
	const [tasksList, setTasksList] = useState([]);
	const [taskName, setTaskName] = useState('');
	const [error, setError] = useState('');
	const [userToken, setUserToken] = useState({});
	const serverURL = 'http://localhost:5000';

	const getAllTasks = async () => {
		console.log('get all tasks: ', userToken);
		try {
			await axios({
				method: 'GET',
				url: `${serverURL}/api/v1/tasks`,
				headers: {
					authorization: `Bearer ${getUserToken().token}`,
				},
			}).then((res) => {
				const dbTasks = res.data.tasks;
				setTasksList(dbTasks);
				setTaskName('');
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

	const submitData = async (newTask) => {
		try {
			await axios({
				method: 'POST',
				url: `${serverURL}/api/v1/tasks`,
				data: {
					name: newTask,
				},
				headers: {
					authorization: `Bearer ${userToken.token}`,
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
		const trimedTaskName = taskName.trim();
		if (trimedTaskName.length < 3) {
			setError(
				'You must enter task name with minimum three letters to create new task'
			);
		} else {
			submitData(trimedTaskName);
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
