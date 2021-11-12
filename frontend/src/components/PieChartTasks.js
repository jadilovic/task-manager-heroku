import { merge } from 'lodash';
import ReactApexChart from 'react-apexcharts';
// material
import { useTheme, styled } from '@mui/material/styles';
import { Card, CardHeader } from '@mui/material';
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

const CHART_DATA = [2, 4, 6];

export default function PieChartTasks() {
	const theme = useTheme();

	const chartOptions = merge(BaseOptionChart(), {
		colors: [
			theme.palette.warning.main,
			theme.palette.info.main,
			theme.palette.success.main,
		],
		labels: ['Idle task', 'Ongoing task', 'Completed'],
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
			{/* <CardHeader title="Current Visits" /> */}
			<ChartWrapperStyle dir="ltr">
				<ReactApexChart
					type="pie"
					series={CHART_DATA}
					options={chartOptions}
					height={220}
				/>
			</ChartWrapperStyle>
		</Card>
	);
}
