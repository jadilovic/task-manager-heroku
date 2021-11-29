import React, { useState, useEffect } from 'react';
import useAxiosRequest from '../utils/useAxiosRequest';
import Page from '../components/Page';
import { Grid, Container, Typography, Paper, Stack } from '@mui/material';
import TaskCard from '../components/TaskCard';
import CreateTask from '../components/CreateTask';
import PieChartTasks from '../components/PieChartTasks';
import SearchTasks from '../components/SearchTasks';
import Sort from '../components/Sort';
import LoadingPage from '../components/LoadingPage';
import FiltersSidebar from '../components/FiltersSidebar';
import GroupsCount from '../components/GroupsCount';
import AppBar from '@mui/material/AppBar';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Box from '@mui/material/Box';
import UserWindow from '../utils/UserWindow';

function tabProps(index) {
	return {
		id: `full-width-tab-${index}`,
		'aria-controls': `full-width-tabpanel-${index}`,
	};
}

const Home = () => {
	const mongoDB = useAxiosRequest();
	const screen = UserWindow();
	const [tasks, setTasks] = useState([]);
	const [filteredTasks, setFilteredTasks] = useState([]);
	const [statuses, setStatuses] = useState([]);
	const [loading, setLoading] = useState(true);
	const [openFilter, setOpenFilter] = useState(false);
	const [value, setValue] = useState(0);
	const [selectedFilters, setSelectedFilters] = useState('');

	const displayTasks = async () => {
		try {
			const dbTasks = await mongoDB.getAllTasks([], []);
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
	}, []); // eslint-disable-line react-hooks/exhaustive-deps

	const handleOpenFilter = () => {
		setOpenFilter(true);
	};

	const handleCloseFilter = () => {
		setOpenFilter(false);
	};

	const handleTabChange = (event, newValue) => {
		setValue(newValue);
	};

	if (loading) {
		return <LoadingPage />;
	}

	return (
		<Page title="Home | Task Manager">
			<Container maxWidth="xl">
				{screen.dynamicWidth < 900 && (
					<Box paddingTop={2}>
						<AppBar position="static">
							<Tabs
								value={value}
								onChange={handleTabChange}
								indicatorColor="secondary"
								textColor="inherit"
								variant="fullWidth"
								aria-label="full width tabs example"
							>
								<Tab label="Search" {...tabProps(0)} />
								<Tab label="Create" {...tabProps(1)} />
								<Tab label="Stats" {...tabProps(2)} />
							</Tabs>
						</AppBar>
					</Box>
				)}
				{/* CREATE TASK */}
				<Grid container spacing={3} padding={2}>
					{screen.dynamicWidth < 900 ? (
						<Grid
							sx={{
								display: {
									xs: `${value === 1 ? 'block' : 'none'}`, // Hidden on smaller than md
									md: `${value === 1 ? 'none' : 'block'}`, // Visible on smaller than md
								},
							}}
							item
							xs={12}
							md={12}
							lg={12}
						>
							<CreateTask statuses={statuses} refreshTasks={displayTasks} />
						</Grid>
					) : (
						<Grid item xs={12} sm={6} lg={4}>
							<CreateTask statuses={statuses} refreshTasks={displayTasks} />
						</Grid>
					)}
					{/* TASKS STATS */}
					{screen.dynamicWidth < 900 ? (
						<Grid
							sx={{
								display: {
									xs: `${value === 2 ? 'block' : 'none'}`,
									md: `${value === 2 ? 'none' : 'block'}`,
								},
							}}
							item
							xs={12}
							sm={12}
							lg={4}
						>
							<PieChartTasks tasks={tasks} />
							<Box paddingTop={2}>
								<GroupsCount tasks={tasks} />
							</Box>
						</Grid>
					) : (
						<Grid item xs={12} sm={6} lg={4}>
							<PieChartTasks tasks={tasks} />
						</Grid>
					)}
					{/* SEARCH TASKS */}
					{screen.dynamicWidth < 900 ? (
						<Grid
							sx={{
								display: {
									xs: `${value === 0 ? 'block' : 'none'}`,
									md: `${value === 0 ? 'none' : 'block'}`,
								},
							}}
							item
							xs={12}
							sm={12}
							lg={12}
						>
							<Stack
								direction="row"
								flexWrap="wrap-reverse"
								alignItems="center"
								justifyContent="flex-end"
								sx={{ mb: 3 }}
							>
								<FiltersSidebar
									tasks={tasks}
									setFilteredTasks={setFilteredTasks}
									statuses={statuses}
									isOpenFilter={openFilter}
									onOpenFilter={handleOpenFilter}
									onCloseFilter={handleCloseFilter}
									setSelectedFilters={setSelectedFilters}
								/>
							</Stack>
							<Sort tasks={tasks} setFilteredTasks={setFilteredTasks} />
							<SearchTasks
								tasks={tasks}
								setFilteredTasks={setFilteredTasks}
								setSelectedFilters={setSelectedFilters}
							/>
						</Grid>
					) : (
						<Grid item xs={12} sm={12} lg={4}>
							<GroupsCount tasks={tasks} />
							<Stack
								paddingTop={3}
								direction="row"
								flexWrap="wrap-reverse"
								alignItems="center"
								justifyContent="flex-end"
								sx={{ mb: 3 }}
							>
								<FiltersSidebar
									tasks={tasks}
									setFilteredTasks={setFilteredTasks}
									statuses={statuses}
									isOpenFilter={openFilter}
									onOpenFilter={handleOpenFilter}
									onCloseFilter={handleCloseFilter}
									setSelectedFilters={setSelectedFilters}
								/>
							</Stack>
							<Sort tasks={tasks} setFilteredTasks={setFilteredTasks} />
							<SearchTasks
								tasks={tasks}
								setFilteredTasks={setFilteredTasks}
								setSelectedFilters={setSelectedFilters}
							/>
						</Grid>
					)}
					{filteredTasks.length < 1 && (
						<Grid item xs={12} sm={12} lg={12}>
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
					{selectedFilters && (
						<Grid item xs={12} sm={12} lg={12}>
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
								<Typography variant="p">{`Selected filters: ${selectedFilters}`}</Typography>
							</Paper>
						</Grid>
					)}
					{filteredTasks.map((task, index) => {
						return (
							<Grid key={index} item xs={12} sm={6} lg={4}>
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
