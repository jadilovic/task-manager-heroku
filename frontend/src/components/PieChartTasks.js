import React, { useState, useEffect } from 'react';
import { merge } from 'lodash';
import ReactApexChart from 'react-apexcharts';
// material
import { useTheme, styled } from '@mui/material/styles';
import { Card } from '@mui/material';
// utils
import { fNumber } from '../utils/formatNumber';
//
import BaseOptionChart from '../utils/BaseOptionChart';

// ----------------------------------------------------------------------

const CHART_HEIGHT = 253;
const LEGEND_HEIGHT = 50;

const ChartWrapperStyle = styled('div')(({ theme }) => ({
	height: CHART_HEIGHT,
	marginTop: theme.spacing(1),
	'& .apexcharts-canvas svg': { height: CHART_HEIGHT },
	'& .apexcharts-canvas svg,.apexcharts-canvas foreignObject': {
		overflow: 'visible',
	},
	'& .apexcharts-legend': {
		height: LEGEND_HEIGHT,
		alignContent: 'center',
		position: 'relative !important',
		borderTop: `solid 1px ${theme.palette.divider}`,
		top: `calc(${CHART_HEIGHT - LEGEND_HEIGHT}px) !important`,
	},
}));

// ----------------------------------------------------------------------

export default function PieChartTasks(props) {
	const theme = useTheme();
	const { tasks } = props;
	const [chartData, setChartData] = useState([]);

	const calculateChartData = () => {
		let initiatedCount = 0;
		let ongoingCount = 0;
		let completedCount = 0;
		tasks.forEach((task) => {
			if (task.currentStatus === '6186378bf0d3d3150277b8d3') {
				initiatedCount++;
			} else if (task.currentStatus === '618637ddf0d3d3150277b8d5') {
				ongoingCount++;
			} else {
				completedCount++;
			}
		});
		setChartData([initiatedCount, ongoingCount, completedCount]);
	};

	useEffect(() => {
		calculateChartData();
	}, [tasks]);

	const chartOptions = merge(BaseOptionChart(), {
		colors: [
			theme.palette.warning.main,
			theme.palette.info.main,
			theme.palette.success.main,
		],
		labels: ['Initiated', 'Ongoing', 'Completed'],
		stroke: { colors: [theme.palette.background.paper] },
		legend: { floating: true, horizontalAlign: 'center' },
		dataLabels: { enabled: true, dropShadow: { enabled: false } },
		tooltip: {
			fillSeriesColor: false,
			y: {
				formatter: (seriesName) => fNumber(seriesName),
				title: {
					formatter: (seriesName) => `#${seriesName}`,
				},
			},
		},
		plotOptions: {
			pie: { donut: { labels: { show: false } } },
		},
	});

	return (
		<Card>
			<ChartWrapperStyle dir="ltr">
				<ReactApexChart
					type="pie"
					series={chartData}
					options={chartOptions}
					height={220}
				/>
			</ChartWrapperStyle>
		</Card>
	);
}
