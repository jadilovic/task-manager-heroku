import React, { useEffect, useState } from 'react';
import { DataGrid } from '@mui/x-data-grid';

// const rows = [
// 	{ id: 1, col1: 'Hello', col2: 'World' },
// 	{ id: 2, col1: 'DataGridPro', col2: 'is Awesome' },
// 	{ id: 3, col1: 'MUI', col2: 'is Amazing' },
// ];

const columns = [
	{ field: 'name', headerName: 'Task name', width: 150 },
	{ field: 'currentStatus', headerName: 'Status', width: 150 },
	{ field: 'description', headerName: 'Description', width: 150 },
];

export default function App(props) {
	const { tasks, statuses } = props;
	const [rows, setRows] = useState([]);

	// spread kreiraj novi
	const addTaskStatus = () => {
		const tasksData = tasks.map((task) => {
			task.id = task._id;
			delete task._id;
			const currentStatusObject = statuses.find(
				(status) => status._id === task.currentStatus
			);
			task.currentStatus = currentStatusObject.message;
			return task;
		});
		return tasksData;
	};

	useEffect(() => {
		setRows(addTaskStatus());
	}, [tasks]);

	return (
		<div style={{ height: 260, width: '100%' }}>
			<DataGrid rows={rows} columns={columns} />
		</div>
	);
}
