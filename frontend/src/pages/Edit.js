import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import useAxiosRequest from '../utils/useAxiosRequest';
import { styled } from '@mui/material/styles';
import { withStyles } from '@mui/styles';
import EditIcon from '@mui/icons-material/Edit';
// material
import {
	Grid,
	Stack,
	Box,
	TextField,
	Container,
	Button,
	Typography,
	Chip,
	Card,
	FormControl,
	InputLabel,
	Select,
	MenuItem,
	Alert,
} from '@mui/material';
import LoadingPage from '../components/LoadingPage';

// ----------------------------------------------------------------------
const SectionStyle = styled(Card)(({ theme }) => ({
	width: '100%',
	display: 'flex',
	flexDirection: 'column',
	justifyContent: 'center',
	padding: theme.spacing(2),
}));

const ContentStyle = styled('div')(({ theme }) => ({
	margin: 'auto',
	display: 'flex',
	flexDirection: 'column',
	justifyContent: 'center',
	padding: theme.spacing(2),
}));

export default function Edit() {
	const history = useHistory();
	const mongoDB = useAxiosRequest();
	const [taskValues, setTaskValues] = useState({
		currentStatus: '',
		description: '',
		name: '',
		updatedAt: '',
		_id: '',
	});
	const [statuses, setStatuses] = useState([]);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState('');
	const [selectColor, setSelectColor] = useState('warning');

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
	}, []); // eslint-disable-line react-hooks/exhaustive-deps

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

	const getStatusColor = (statusId) => {
		return statuses.find((status) => status._id === statusId);
	};

	// -----------------------------------------------
	const getBackgroundColor = () => {
		if (selectColor === 'warning') {
			return '#ff9800';
		} else if (selectColor === 'info') {
			return '#03a9f4';
		} else {
			return '#4caf50';
		}
	};

	const MyMenuItem = withStyles({
		root: {
			'&:hover': {
				backgroundColor: `${getBackgroundColor()}`,
				// color: 'black',
			},
		},
	})(MenuItem);

	// -------------------------------------------------

	if (loading) {
		return <LoadingPage />;
	}
	return (
		<Container maxWidth="sm">
			<Grid padding={2} item xs={12}>
				<SectionStyle>
					<form autoComplete="off" noValidate onSubmit={handleSubmit}>
						<ContentStyle>
							<Stack spacing={1} alignItems="center">
								<Chip
									style={{ minWidth: 300, minHeight: 40, fontSize: 19 }}
									size="medium"
									icon={<EditIcon />}
									label="Edit Selected Task"
									color="default"
								/>
							</Stack>
						</ContentStyle>
						<ContentStyle>
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
								fullWidth
								style={{ minWidth: 300 }}
								id="name-input"
								name="name"
								label="Name"
								type="text"
								value={taskValues.name}
								onChange={handleInputChange}
							/>
						</ContentStyle>
						<ContentStyle>
							<FormControl style={{ minWidth: 300 }}>
								<InputLabel>Select current status</InputLabel>
								<Select
									sx={{
										backgroundColor: `${
											getStatusColor(taskValues?.currentStatus)
												?.colorNotification
										}.main`,
									}}
									value={taskValues?.currentStatus}
									label="Task current status"
									onChange={handleTaskStatusChange}
								>
									{statuses.map((taskStatus, index) => {
										return (
											<MyMenuItem
												onMouseOver={() =>
													setSelectColor(
														(selectColor) =>
															(selectColor = `${taskStatus.colorNotification}`)
													)
												}
												sx={{
													backgroundColor: `${taskStatus.colorNotification}.main`,
												}}
												key={index}
												value={taskStatus._id}
											>
												{taskStatus.message}
											</MyMenuItem>
										);
									})}
								</Select>
							</FormControl>
						</ContentStyle>
						<ContentStyle>
							<TextField
								fullWidth
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
						</ContentStyle>
						<ContentStyle>
							<Typography>
								Last updated on {new Date(taskValues.updatedAt).toDateString()}
							</Typography>
						</ContentStyle>
						<ContentStyle>
							<Button
								style={{ minWidth: 300 }}
								variant="contained"
								color="primary"
								type="submit"
								size="large"
							>
								Submit
							</Button>
						</ContentStyle>
						<ContentStyle>
							<Button
								onClick={() => history.push('/home')}
								variant="contained"
								color="warning"
								size="large"
							>
								Back to home page
							</Button>
						</ContentStyle>
					</form>
				</SectionStyle>
			</Grid>
		</Container>
	);
}
