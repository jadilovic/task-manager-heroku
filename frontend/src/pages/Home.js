import React, { useState, useEffect } from 'react';
import { Divider, Typography } from '@mui/material';
import useAxiosRequest from '../utils/useAxiosRequest';
import Page from '../components/Page';
import { Grid, Container, Paper } from '@mui/material';
import TaskCard from '../components/TaskCard';
import CreateTask from '../components/CreateTask';
import PieChartTasks from '../components/PieChartTasks';
import LoadingPage from '../components/LoadingPage';
import AppBar from '@mui/material/AppBar';
import Tabs from '@mui/material/Tabs';
import { Tab } from '@mui/material';
import Box from '@mui/material/Box';
import UserWindow from '../utils/UserWindow';
import GroupCount from '../components/GroupsCount';
import PropTypes from 'prop-types';
import FilterSortSearchBox from '../components/FilterSortSearchBox';

function TabPanel(props) {
	const { children, value, index, ...other } = props;

	return (
		<div
			role="tabpanel"
			hidden={value !== index}
			id={`simple-tabpanel-${index}`}
			aria-labelledby={`simple-tab-${index}`}
			{...other}
		>
			{value === index && <>{children}</>}
		</div>
	);
}

function Item(props) {
	const { sx, ...other } = props;
	return (
		<Box
			sx={{
				bgcolor: 'primary.main',
				color: 'white',
				p: 1,
				m: 1,
				borderRadius: 1,
				textAlign: 'center',
				fontSize: '1rem',
				fontWeight: '700',
				...sx,
			}}
			{...other}
		/>
	);
}

Item.propTypes = {
	sx: PropTypes.oneOfType([
		PropTypes.arrayOf(PropTypes.oneOfType([PropTypes.func, PropTypes.object])),
		PropTypes.func,
		PropTypes.object,
	]),
};

function tabProps(index) {
	return {
		id: `full-width-tab-${index}`,
		'aria-controls': `full-width-tabpanel-${index}`,
	};
}

const Home = (props) => {
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
			setSelectedFilters('');
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
		setSelectedFilters('');
		setTasks(tasks);
	};

	if (loading) {
		return <LoadingPage />;
	}

	return (
		<Page title="Home | Task Manager">
			<Container maxWidth="xl">
				{screen.dynamicWidth < 900 && (
					<Box paddingTop={1} paddingBottom={1}>
						<AppBar position="static">
							<Tabs
								value={value}
								onChange={handleTabChange}
								indicatorColor="secondary"
								textColor="inherit"
								variant="fullWidth"
								aria-label="full width tabs example"
							>
								<Tab label="Create" {...tabProps(0)} />
								<Tab label="Stats" {...tabProps(1)} />
							</Tabs>
						</AppBar>
						<TabPanel value={value} index={0}>
							<CreateTask statuses={statuses} refreshTasks={displayTasks} />
						</TabPanel>
						<TabPanel value={value} index={1}>
							<PieChartTasks statuses={statuses} tasks={tasks} value={value} />
							<Divider />
							<GroupCount tasks={tasks} />
						</TabPanel>
					</Box>
				)}
				{/* CREATE TASK */}
				<Grid container spacing={1} padding={1}>
					{screen.dynamicWidth > 900 && (
						<Grid item sm={12} lg={4}>
							<CreateTask statuses={statuses} refreshTasks={displayTasks} />
						</Grid>
					)}
					{/* TASKS STATS */}
					{screen.dynamicWidth > 900 && (
						<>
							<Grid item xs={12} sm={6} lg={4}>
								<PieChartTasks
									statuses={statuses}
									tasks={tasks}
									value={value}
								/>
							</Grid>
							<Grid item xs={12} sm={6} lg={4}>
								<GroupCount tasks={tasks} />
							</Grid>
						</>
					)}
					<Grid item xs={12} sm={12} md={12} lg={12}>
						<FilterSortSearchBox
							tasks={tasks}
							setFilteredTasks={setFilteredTasks}
							statuses={statuses}
							isOpenFilter={openFilter}
							onOpenFilter={handleOpenFilter}
							onCloseFilter={handleCloseFilter}
							setSelectedFilters={setSelectedFilters}
						/>
					</Grid>

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
								style={{
									justifyContent: 'center',
								}}
								sx={{
									p: '2px 4px',
									display: 'flex',
									alignItems: 'center',
									width: '100%',
									height: 50,
									backgroundColor: '#544343',
									color: 'white',
								}}
							>
								<Typography variant="p">{`${selectedFilters}`}</Typography>
							</Paper>
						</Grid>
					)}
					{filteredTasks.map((task, index) => {
						return (
							<Grid key={index} item xs={12} sm={12} md={6} lg={4}>
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
