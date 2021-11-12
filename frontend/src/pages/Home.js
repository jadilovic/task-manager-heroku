import React, { useState, useEffect } from 'react';
import useAxiosRequest from '../utils/useAxiosRequest';
import Page from '../components/Page';
import { Box, Grid, Container, Typography } from '@mui/material';
import TaskCard from '../components/TaskCard';
import CreateTask from '../components/CreateTask';
import PieChartTasks from '../components/PieChartTasks';
import SearchFilter from '../components/SearchFilter';
import SearchTasks from '../components/SearchTasks';

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
		} catch (err) {
			console.log(err.response);
		}
	};

	const getTaskStatuses = async () => {
		const statuses = await mongoDB.getTaskStatuses();
		setStatuses(statuses);
		setLoading(false);
	};

	// to explore why is this happening
	useEffect(() => {
		displayTasks();
		getTaskStatuses();
	}, []);

	if (loading) {
		return (
			<Box sx={{ pb: 5 }}>
				<Typography variant="h4">Loading...</Typography>
			</Box>
		);
	}

	return (
		<Page title="Home | Task Manager">
			<Container maxWidth="xl">
				<Grid container spacing={3} padding={2}>
					<Grid item xs={12} md={8} lg={5}>
						<CreateTask statuses={statuses} refreshTasks={displayTasks} />
					</Grid>

					<Grid item xs={12} md={4} lg={4}>
						<PieChartTasks />
					</Grid>
					<Grid item xs={12} md={4} lg={3}>
						<SearchFilter tasks={tasks} />
					</Grid>

					<Grid item xs={12} sm={12} md={12}>
						<SearchTasks tasks={tasks} setFilteredTasks={setFilteredTasks} />
					</Grid>

					{filteredTasks.map((task, index) => {
						return (
							<Grid key={index} item xs={12} sm={8} md={6} lg={4}>
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
