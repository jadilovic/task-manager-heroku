import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import useLocalStorageHook from '../utils/useLocalStorageHook';
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
} from '@mui/material';
import taskStatusObjects from '../utils/taskStatusObjects';
// const data = useLocalStorageHook();

const Item = styled(Paper)(({ theme }) => ({
	...theme.typography.body2,
	padding: theme.spacing(1),
	textAlign: 'center',
	color: theme.palette.text.secondary,
}));

const Edit = () => {
	const history = useHistory();
	const data = useLocalStorageHook();
	const [formValues, setFormValues] = useState({
		// currentStatus: { id: '', message: '', severity: '' },
	});

	useEffect(() => {
		const taskName = localStorage.getItem('currentTaskName');
		const editingTaskObject = data.getCurrentTaskObject(taskName);
		setFormValues({
			...editingTaskObject,
		});
	}, []);

	const handleInputChange = (e) => {
		const { name, value } = e.target;
		setFormValues({
			...formValues,
			[name]: value,
		});
	};

	const handleSubmit = (event) => {
		event.preventDefault();
		data.addUpdatedCurrentTaskToArrayAndSave(formValues);
		console.log(formValues);
		history.push('/');
	};

	const handleTaskStatusChange = (event) => {
		setFormValues({
			...formValues,
			currentStatus: taskStatusObjects[event.target.value - 1],
		});
	};

	console.log('form values name', formValues.name);
	console.log('form values dateCreated', formValues.dateCreated);
	console.log('form values status', formValues.currentStatus);

	return (
		<Container maxWidth="sm">
			<Box sx={{ flexGrow: 1 }}>
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
									<Typography
										bgcolor="yellow"
										gutterBottom
										variant="h6"
										component="div"
									>
										Edit task
									</Typography>
								</Grid>
								<Grid item xs={12}>
									<TextField
										style={{ minWidth: 300 }}
										id="name-input"
										name="name"
										label="Name"
										type="text"
										value={formValues.name}
										onChange={handleInputChange}
									/>
								</Grid>
								<Grid item xs={12}>
									<TextField
										style={{ minWidth: 300 }}
										id="dateCreatedt"
										name="dateCreated"
										label="Date Created"
										type="string"
										value={formValues.dateCreated}
										onChange={handleInputChange}
										disabled
									/>
								</Grid>
								<Grid item xs={12}>
									<FormControl style={{ minWidth: 300 }}>
										<InputLabel>Select current status</InputLabel>
										<Select
											value={formValues?.currentStatus?.id}
											label="Task current status"
											onChange={handleTaskStatusChange}
										>
											{taskStatusObjects.map((taskStatus) => {
												return (
													<MenuItem value={taskStatus.id}>
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
										value={formValues.description}
										onChange={handleInputChange}
									/>
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
							</Grid>
						</form>
					</Item>
				</Grid>
			</Box>
		</Container>
	);
};
export default Edit;
