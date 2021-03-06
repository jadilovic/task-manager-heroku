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
	Select,
	MenuItem,
	Alert,
} from '@mui/material';
import LoadingPage from '../components/LoadingPage';
import colors from '../data/colors';
import icons from '../data/icons';

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
		avatarIcon: '',
		avatarColor: '',
	});
	const [statuses, setStatuses] = useState([]);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState('');
	const [selectColor, setSelectColor] = useState('warning');

	const getTaskObject = async (taskId) => {
		try {
			const editingTaskObject = await mongoDB.getTask(taskId);
			setTaskValues(editingTaskObject.task);
			getTaskStatuses();
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

	const getIconColor = (avatarIcon) => {
		if (avatarIcon === 'Home') {
			return '#5E6D71';
		} else if (avatarIcon === 'Business') {
			return '#C8AD55';
		} else if (avatarIcon === 'Group') {
			return '#368F8B';
		} else {
			return '#DDBEA8';
		}
	};

	const handleSelectChange = (event) => {
		if (event.target.name === 'avatarIcon') {
			taskValues.avatarColor = getIconColor(event.target.value);
		}
		setTaskValues({
			...taskValues,
			[event.target.name]: event.target.value,
		});
	};

	const getStatusColor = (statusId) => {
		const status = statuses.find((status) => status._id === statusId);
		return status.colorNotification;
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
								id="name-input"
								name="name"
								label="Name"
								type="text"
								value={taskValues.name}
								onChange={handleInputChange}
							/>
						</ContentStyle>
						<ContentStyle>
							<Select
								label="Task current status"
								sx={{
									backgroundColor: `${getStatusColor(
										taskValues?.currentStatus
									)}`,
								}}
								name="currentStatus"
								value={taskValues?.currentStatus}
								onChange={handleSelectChange}
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
												backgroundColor: `${taskStatus.colorNotification}`,
											}}
											key={index}
											value={taskStatus._id}
										>
											{taskStatus.message}
										</MyMenuItem>
									);
								})}
							</Select>
						</ContentStyle>
						<ContentStyle>
							<TextField
								fullWidth
								multiline
								minRows={4}
								inputProps={{ maxLength: 120 }}
								id="description-input"
								name="description"
								label="Description"
								type="text"
								value={taskValues.description}
								onChange={handleInputChange}
							/>
						</ContentStyle>
						<ContentStyle>
							<Select
								required
								sx={{ backgroundColor: taskValues.avatarColor, color: 'white' }}
								value={taskValues.avatarIcon}
								name="avatarIcon"
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
						</ContentStyle>
						{/* <ContentStyle>
							<Select
								sx={{ backgroundColor: getAvatarColor(), color: 'white' }}
								required
								value={taskValues.avatarColor}
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
						</ContentStyle> */}
						<ContentStyle>
							<Typography>
								Last updated on {new Date(taskValues.updatedAt).toDateString()}
							</Typography>
						</ContentStyle>
						<ContentStyle>
							<Button
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
