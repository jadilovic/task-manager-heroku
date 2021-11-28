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
			avatarColor: colors[0].name,
		});
		setLoading(false);
	}, []); // eslint-disable-line react-hooks/exhaustive-deps

	const getIconColor = (avatarIcon) => {
		if (avatarIcon === 'Home') {
			return 'Ming';
		} else if (avatarIcon === 'Business') {
			return 'Vegas Gold';
		} else if (avatarIcon === 'Group') {
			return 'Dark Cyan';
		} else {
			return 'Desert Sand';
		}
	};

	const handleTaskNameChange = (event) => {
		event.preventDefault();
		setNewTask({ ...newTask, name: event.target.value });
	};

	const handleSelectChange = (event) => {
		if (event.target.name === 'avatarIcon') {
			newTask.avatarColor = getIconColor(event.target.value);
		}
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
				avatarColor: colors[0].name,
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

	const getAvatarColor = () => {
		const color = colors.find((color) => color.name === newTask.avatarColor);
		return `${color.hex}`;
	};

	// have same standard for all colors
	const getStatusColor = () => {
		if (newTask.statusId === '6186378bf0d3d3150277b8d3') {
			return '#ff9800';
		} else if (newTask.statusId === '618637ddf0d3d3150277b8d5') {
			return '#03a9f4';
		} else {
			return '#4caf50';
		}
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
							size="small"
							required
							value={newTask.name}
							fullWidth
							label="New task name"
							id="fullWidth"
							onChange={handleTaskNameChange}
							variant="outlined"
							error={!!error}
						/>
					</ContentStyle>
					<ContentStyle>
						<FormControl fullWidth style={{ minWidth: 250 }}>
							<InputLabel>Select task status</InputLabel>
							<Select
								size="small"
								sx={{
									backgroundColor: getStatusColor(),
								}}
								required
								value={newTask.statusId}
								name="statusId"
								label="Task current status"
								onChange={handleSelectChange}
							>
								{statuses.map((taskStatus, index) => {
									return (
										<MenuItem
											sx={{
												backgroundColor: `${taskStatus.colorNotification}.main`,
											}}
											key={index}
											value={taskStatus._id}
										>
											{taskStatus.message}
										</MenuItem>
									);
								})}
							</Select>
						</FormControl>
					</ContentStyle>
					<ContentStyle>
						<FormControl fullWidth style={{ minWidth: 250 }}>
							<InputLabel>Select task icon</InputLabel>
							<Select
								labelId="demo-simple-select-error-label"
								id="demo-simple-select-error"
								size="small"
								required
								sx={{
									backgroundColor: getAvatarColor(),
									color: 'white',
								}}
								value={newTask.avatarIcon}
								name="avatarIcon"
								label="Task current icon"
								onChange={handleSelectChange}
							>
								{icons.map((icon, index) => {
									return (
										<MenuItem
											style={{
												backgroundColor: colors[index].hex,
												color: 'white',
											}}
											key={index}
											value={icon.name}
										>
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
					<SectionStyle>
						<Button
							style={{ margin: 5 }}
							variant="contained"
							color="primary"
							type="submit"
						>
							create task
						</Button>
					</SectionStyle>
				</CardContent>
			</form>
		</SectionStyle>
	);
};

export default CreateTask;
