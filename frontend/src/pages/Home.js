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
import PropTypes from 'prop-types';
import { useTheme } from '@mui/material/styles';
import AppBar from '@mui/material/AppBar';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Box from '@mui/material/Box';

// TAB ELEMENTS
function TabPanel(props) {
	const { children, value, index, ...other } = props;

	return (
		<div
			role="tabpanel"
			hidden={value !== index}
			id={`full-width-tabpanel-${index}`}
			aria-labelledby={`full-width-tab-${index}`}
			{...other}
		>
			{value === index && (
				<Box sx={{ p: 3 }}>
					<Typography>{children}</Typography>
				</Box>
			)}
		</div>
	);
}

TabPanel.propTypes = {
	children: PropTypes.node,
	index: PropTypes.number.isRequired,
	value: PropTypes.number.isRequired,
};

function a11yProps(index) {
	return {
		id: `full-width-tab-${index}`,
		'aria-controls': `full-width-tabpanel-${index}`,
	};
}
// TAB ELEMENTS ---------------------------------------------

const Home = () => {
	const theme = useTheme();
	const mongoDB = useAxiosRequest();
	const [tasks, setTasks] = useState([]);
	const [filteredTasks, setFilteredTasks] = useState([]);
	const [statuses, setStatuses] = useState([]);
	const [loading, setLoading] = useState(true);
	const [openFilter, setOpenFilter] = useState(false);
	const [value, setValue] = useState(0);

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

	// TAB elements
	const handleChange = (event, newValue) => {
		setValue(newValue);
	};
	// TAB elements

	if (loading) {
		return <LoadingPage />;
	}

	return (
		<Page title="Home | Task Manager">
			<Container maxWidth="xl">
				<Grid container spacing={3} padding={2}>
					<Grid item xs={12} md={12} lg={12}>
						<Box
							sx={{
								display: { xs: 'block', sm: 'none' },
								bgcolor: 'background.paper',
								width: '100%',
							}}
						>
							<AppBar position="static">
								<Tabs
									value={value}
									onChange={handleChange}
									indicatorColor="secondary"
									textColor="inherit"
									variant="fullWidth"
									aria-label="full width tabs example"
								>
									<Tab label="Search" {...a11yProps(0)} />
									<Tab label="Create" {...a11yProps(1)} />
									<Tab label="Stats" {...a11yProps(2)} />
								</Tabs>
							</AppBar>
							<TabPanel value={value} index={0} dir={theme.direction}>
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
									/>
								</Stack>
								<Sort tasks={tasks} setFilteredTasks={setFilteredTasks} />
								<SearchTasks
									tasks={tasks}
									setFilteredTasks={setFilteredTasks}
								/>
							</TabPanel>
							<TabPanel value={value} index={1} dir={theme.direction}>
								<CreateTask statuses={statuses} refreshTasks={displayTasks} />
							</TabPanel>
							<TabPanel value={value} index={2} dir={theme.direction}>
								<PieChartTasks tasks={tasks} />
								<GroupsCount tasks={tasks} />
							</TabPanel>
						</Box>
					</Grid>
					<Grid
						sx={{ display: { xs: 'none', sm: 'block' } }}
						item
						xs={12}
						md={6}
						lg={4}
					>
						<CreateTask statuses={statuses} refreshTasks={displayTasks} />
					</Grid>
					<Grid
						sx={{ display: { xs: 'none', sm: 'block' } }}
						item
						xs={12}
						md={6}
						lg={4}
					>
						<PieChartTasks tasks={tasks} />
					</Grid>
					<Grid
						sx={{ display: { xs: 'none', sm: 'block' } }}
						item
						xs={12}
						md={12}
						lg={4}
					>
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
							/>
						</Stack>
						<Sort tasks={tasks} setFilteredTasks={setFilteredTasks} />
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
