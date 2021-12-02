import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Box, Button, Paper, Stack } from '@mui/material';
import FiltersSidebar from './FiltersSidebar';
import Sort from './Sort';
import SearchTasks from './SearchTasks';
import UserWindow from '../utils/UserWindow';
import SearchIcon from '@mui/icons-material/Search';

function Item(props) {
	const { sx, ...other } = props;
	return (
		<Box
			sx={{
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

export default function FilterSortSearchBox(props) {
	const [openSearch, setOpenSearch] = useState(false);
	const screen = UserWindow();
	const {
		tasks,
		setFilteredTasks,
		statuses,
		isOpenFilter,
		onOpenFilter,
		onCloseFilter,
		setSelectedFilters,
	} = props;
	return (
		<div style={{ width: '100%' }}>
			<Box
				sx={{
					display: 'flex',
					justifyContent: 'space-between',
				}}
			>
				<Item sx={{ flexGrow: 1 }}>
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
							isOpenFilter={isOpenFilter}
							onOpenFilter={onOpenFilter}
							onCloseFilter={onCloseFilter}
							setSelectedFilters={setSelectedFilters}
						/>
					</Stack>
				</Item>
				<Item sx={{ flexGrow: 1 }}>
					<Sort
						tasks={tasks}
						setFilteredTasks={setFilteredTasks}
						setSelectedFilters={setSelectedFilters}
					/>
				</Item>
				{screen.dynamicWidth > 900 ? (
					<Item sx={{ flexGrow: 1 }}>
						<SearchTasks
							tasks={tasks}
							setFilteredTasks={setFilteredTasks}
							setSelectedFilters={setSelectedFilters}
						/>
					</Item>
				) : (
					<Item>
						<Paper
							component="form"
							sx={{
								display: 'flex',
								alignItems: 'center',
								width: 50,
								height: 50,
							}}
						>
							<Button onClick={() => setOpenSearch(!openSearch)}>
								<SearchIcon />
							</Button>
						</Paper>
					</Item>
				)}
			</Box>
			{screen.dynamicWidth < 900 && openSearch && (
				<Box
					sx={{
						display: 'flex',
					}}
				>
					<Item sx={{ flexGrow: 1 }}>
						<SearchTasks
							tasks={tasks}
							setFilteredTasks={setFilteredTasks}
							setSelectedFilters={setSelectedFilters}
						/>
					</Item>
				</Box>
			)}
		</div>
	);
}
