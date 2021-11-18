import React, { useState, useEffect } from 'react';
import { styled } from '@mui/material/styles';
import useAxiosRequest from '../utils/useAxiosRequest';
import {
	Box,
	Card,
	CardContent,
	TextField,
	Button,
	Alert,
	FormControl,
	InputLabel,
	Select,
	MenuItem,
	Typography,
} from '@mui/material';
import colors from '../data/colors';
import icons from '../data/icons';
import LoadingPage from '../components/LoadingPage';

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

const CreateTask = (props) => {
	const mongoDB = useAxiosRequest();
	const [newTask, setNewTask] = useState({
		name: '',
		statusId: '',
		avatarIcon: '',
		avatarColor: '',
	});
	const [error, setError] = useState('');
	const [loading, setLoading] = useState(true);
	const { statuses, refreshTasks } = props;

	// to explore why is this happening
	useEffect(() => {
		setNewTask({
			...newTask,
			statusId: statuses[0]._id,
			avatarIcon: icons[0].name,
			avatarColor: colors[4].name,
		});
		setLoading(false);
	}, []); // eslint-disable-line react-hooks/exhaustive-deps

	const handleTaskNameChange = (event) => {
		event.preventDefault();
		setNewTask({ ...newTask, name: event.target.value });
	};

	const handleSelectChange = (event) => {
		setNewTask({
			...newTask,
			[event.target.name]: event.target.value,
		});
	};

	const submitData = async (newTask) => {
		try {
			await mongoDB.createTask(newTask);
			setNewTask({
				name: '',
				statusId: statuses[0]._id,
				avatarIcon: icons[0].name,
				avatarColor: colors[4].name,
			});
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

	const getColor = () => {
		const color = colors.find((color) => color.name === newTask.avatarColor);
		return `${color.hex}`;
	};

	if (loading) {
		return <LoadingPage />;
	}

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
								name="statusId"
								label="Task current status"
								onChange={handleSelectChange}
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
					<ContentStyle>
						<FormControl fullWidth style={{ minWidth: 300 }}>
							<InputLabel>Select avatar icon</InputLabel>
							<Select
								required
								value={newTask.avatarIcon}
								name="avatarIcon"
								label="Avatar current icon"
								onChange={handleSelectChange}
							>
								{icons.map((icon, index) => {
									return (
										<MenuItem key={index} value={icon.name}>
											<div
												style={{
													display: 'flex',
													alignItems: 'center',
													flexWrap: 'wrap',
												}}
											>
												{icon.icon}
												<div style={{ marginLeft: 20 }}>{icon.name}</div>
											</div>
										</MenuItem>
									);
								})}
							</Select>
						</FormControl>
					</ContentStyle>
					<ContentStyle>
						<FormControl fullWidth style={{ minWidth: 300 }}>
							<InputLabel>Select avatar color</InputLabel>
							<Select
								sx={{ backgroundColor: getColor(), color: 'white' }}
								required
								value={newTask.avatarColor}
								name="avatarColor"
								label="Avatar current color"
								onChange={handleSelectChange}
							>
								{colors.map((color, index) => {
									return (
										<MenuItem
											style={{ backgroundColor: color.hex, color: 'white' }}
											key={index}
											value={color.name}
										>
											{color.name}
										</MenuItem>
									);
								})}
							</Select>
						</FormControl>
					</ContentStyle>
					<SectionStyle>
						<Button variant="contained" color="primary" type="submit">
							create task
						</Button>
					</SectionStyle>
				</CardContent>
			</form>
		</SectionStyle>
	);
};

export default CreateTask;
