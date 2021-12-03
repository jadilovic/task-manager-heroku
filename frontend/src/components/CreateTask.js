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
import { makeStyles } from '@mui/styles';
import UserWindow from '../utils/UserWindow';
import { useHistory } from 'react-router-dom';
import HourglassEmpty from '@mui/icons-material/HourglassEmpty';
import { CheckCircleOutline, ArrowForward } from '@mui/icons-material';
import InputBase from '@mui/material/InputBase';

const BootstrapInput = styled(InputBase)(({ theme }) => ({
	'label + &': {
		marginTop: theme.spacing(1),
	},
	'& .MuiInputBase-input': {
		borderRadius: 4,
		// position: 'relative',
		border: '1px solid #ced4da',
		// fontSize: 16,
		padding: '10px 26px 10px 12px',
	},
}));

const useStyles = makeStyles((theme) => ({
	root: {
		'& .MuiFormLabel-root': {
			color: '#9AD5CA', // or orange
		},
	},
	inputLabel: {
		// offset
		color: '#9AD5CA',
		'&.Mui-focused': {
			color: '#9AD5CA',
		},
	},
	select: {
		color: 'white',
	},
}));

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
	padding: theme.spacing(1, 0),
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
	const classes = useStyles();
	const screen = UserWindow();
	const history = useHistory();

	useEffect(() => {
		setNewTask({
			...newTask,
			statusId: statuses[0]._id,
			avatarIcon: icons[0].name,
			avatarColor: colors[0].hex,
		});
		setLoading(false);
	}, []); // eslint-disable-line react-hooks/exhaustive-deps

	const getIconColor = (avatarIcon) => {
		if (avatarIcon === 'Home') {
			return colors[0].hex;
		} else if (avatarIcon === 'Business') {
			return colors[1].hex;
		} else if (avatarIcon === 'Group') {
			return colors[2].hex;
		} else if (avatarIcon === 'Person') {
			return colors[3].hex;
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
				avatarColor: colors[0].hex,
			});
			if (screen.dynamicWidth < 900) {
				history.push('/home');
			} else {
				refreshTasks();
			}
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

	const getStatusColor = () => {
		const statusObject = statuses.find(
			(status) => newTask.statusId === status._id
		);
		return statusObject.colorNotification;
	};

	const getStatusIcon = (message) => {
		if (message === 'Initiated') {
			return <HourglassEmpty />;
		} else if (message === 'Ongoing') {
			return <ArrowForward />;
		} else {
			return <CheckCircleOutline />;
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
							size="medium"
							required
							value={newTask.name}
							fullWidth
							label="New task name"
							id="fullWidth"
							onChange={handleTaskNameChange}
							error={!!error}
						/>
					</ContentStyle>
					<ContentStyle>
						<FormControl fullWidth style={{ minWidth: 250 }} variant="outlined">
							<InputLabel>Select task status</InputLabel>
							<Select
								className={classes.select}
								input={<BootstrapInput />}
								size="small"
								sx={{
									backgroundColor: getStatusColor(),
									borderRadius: 1,
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
												backgroundColor: `${taskStatus.colorNotification}`,
												borderRadius: 1,
											}}
											key={index}
											value={taskStatus._id}
										>
											<div
												style={{
													display: 'flex',
													alignItems: 'center',
													flexWrap: 'wrap',
												}}
											>
												{getStatusIcon(taskStatus.message)}
												<div style={{ marginLeft: 20 }}>
													{taskStatus.message}
												</div>
											</div>
										</MenuItem>
									);
								})}
							</Select>
						</FormControl>
					</ContentStyle>
					<ContentStyle>
						<FormControl fullWidth style={{ minWidth: 250 }} variant="outlined">
							<InputLabel>Select task icon</InputLabel>
							<Select
								className={classes.select}
								input={<BootstrapInput />}
								size="small"
								required
								sx={{
									backgroundColor: newTask.avatarColor,
									color: 'white',
									borderRadius: 1,
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
												borderRadius: 1,
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
							style={{ marginTop: 20 }}
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
