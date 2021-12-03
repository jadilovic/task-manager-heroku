import React, { useState, useEffect } from 'react';
import { useTheme, styled } from '@mui/material/styles';
import { Card } from '@mui/material';
import { Chart } from 'react-google-charts';

const SectionStyle = styled(Card)(({ theme }) => ({
	// width: '100%',
	display: 'flex',
	flexDirection: 'column',
	justifyContent: 'center',
}));

export default function PieChartTasks(props) {
	const theme = useTheme();
	const { tasks, value, statuses } = props;
	const [chartData, setChartData] = useState([]);

	const calculateChartData = () => {
		let initiatedCount = 0;
		let ongoingCount = 0;
		let completedCount = 0;
		tasks.forEach((task) => {
			if (task.currentStatus === statuses[0]._id) {
				initiatedCount++;
			} else if (task.currentStatus === statuses[1]._id) {
				ongoingCount++;
			} else {
				completedCount++;
			}
		});
		const data = [['Status', 'Total number of tasks with this status']];
		data.push(['Initiated', initiatedCount]);
		data.push(['Ongoing', ongoingCount]);
		data.push(['Completed', completedCount]);
		setChartData(data);
	};

	const options = {
		legend: {
			position: 'bottom',
			textStyle: {
				color: theme.palette.text.primary,
				fontSize: 10,
			},
		},
		chartArea: {
			height: '70%',
			width: '70%',
		},
		title: 'Task statuses',
		colors: [
			theme.palette.warning.main,
			theme.palette.info.main,
			theme.palette.success.main,
		],
		titleTextStyle: {
			color: theme.palette.text.primary,
			fontSize: 15,
			bold: false,
		},
		is3D: true,
		backgroundColor: 'none',
	};

	useEffect(() => {
		calculateChartData();
	}, [tasks, value]); // eslint-disable-line react-hooks/exhaustive-deps

	return (
		<SectionStyle>
			<Chart
				width={'100%'}
				height={'309px'}
				chartType="PieChart"
				loader={<div>Loading Chart</div>}
				data={chartData}
				options={options}
			/>
		</SectionStyle>
	);
}
