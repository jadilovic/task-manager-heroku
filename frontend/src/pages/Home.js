import React, { useState, useEffect } from 'react';
import useAxiosRequest from '../utils/useAxiosRequest';
import Page from '../components/Page';
import { Box, Grid, Container, Typography, Paper } from '@mui/material';
import TaskCard from '../components/TaskCard';
import CreateTask from '../components/CreateTask';
import PieChartTasks from '../components/PieChartTasks';
import SearchTasks from '../components/SearchTasks';
import Filter from '../components/Filter';
import Sort from '../components/Sort';

const Home = () => {
	const mongoDB = useAxiosRequest();
	const [tasks, setTasks] = useState([]);
	const [filteredTasks, setFilteredTasks] = useState([]);
	const [statuses, setStatuses] = useState([]);
	const [loading, setLoading] = useState(true);

	const displayTasks = async () => {
		try {
			const dbTasks = await mongoDB.getAllTasks();
			setTasks(dbTasks);
			setFilteredTasks(dbTasks);
			getTaskStatuses();
		} catch (err) {
			console.log(err.response);
		}
	};

	const getTaskStatuses = async () => {
		const statuses = await mongoDB.getTaskStatuses();
		setStatuses(statuses);
		setLoading(false);
	};

	useEffect(() => {
		displayTasks();
	}, []);
	// eslint-disable-line react-hooks/exhaustive-deps

	if (loading) {
		return (
			<Box sx={{ pb: 5 }}>
				<Typography variant="h6">Loading...</Typography>
			</Box>
		);
	}

	return (
		<Page title="Home | Task Manager">
			<Container maxWidth="xl">
				<Grid container spacing={3} padding={2}>
					<Grid item xs={12} md={6}>
						<CreateTask statuses={statuses} refreshTasks={displayTasks} />
					</Grid>
					<Grid item xs={12} md={6}>
						<PieChartTasks tasks={tasks} />
					</Grid>

					<Grid item xs={12} md={12} lg={3}>
						<Filter tasks={tasks} setFilteredTasks={setFilteredTasks} />
					</Grid>
					<Grid item xs={12} md={12} lg={3}>
						<Sort tasks={tasks} setFilteredTasks={setFilteredTasks} />
					</Grid>

					<Grid item xs={12} md={12} lg={6}>
						<SearchTasks tasks={tasks} setFilteredTasks={setFilteredTasks} />
					</Grid>

					{filteredTasks.length < 1 && (
						<Grid item xs={12} md={12} lg={12}>
							<Paper
								component="form"
								style={{ justifyContent: 'center' }}
								sx={{
									p: '2px 4px',
									display: 'flex',
									alignItems: 'center',
									width: '100%',
									height: 50,
								}}
							>
								<Typography variant="p">No tasks found</Typography>
							</Paper>
						</Grid>
					)}

					{filteredTasks.map((task, index) => {
						return (
							<Grid key={index} item xs={12} md={6} lg={4}>
								<TaskCard
									task={task}
									taskStatusObjects={statuses}
									refreshTasks={displayTasks}
								/>
							</Grid>
						);
					})}
				</Grid>
			</Container>
		</Page>
	);
};

export default Home;
