import * as React from 'react';
import Chip from '@mui/material/Chip';
import Stack from '@mui/material/Stack';
import HourglassEmpty from '@mui/icons-material/HourglassEmpty';
import { CheckCircleOutline, ArrowForward } from '@mui/icons-material';
import { Grid } from '@mui/material';

export default function TaskStatus(props) {
	console.log('object task status : ', props.taskStatus);
	const { colorNotification, message } = props.taskStatus;
	console.log('object task status : ', props.taskStatus);
	console.log('color notification : ', colorNotification);
	let chipIcon = null;
	if (colorNotification === 'warning') {
		chipIcon = <HourglassEmpty />;
	} else if (colorNotification === 'info') {
		chipIcon = <ArrowForward />;
	} else {
		chipIcon = <CheckCircleOutline />;
	}
	return (
		<Grid justifyItems="center" item xs={12}>
			<Stack spacing={1} alignItems="center">
				<Chip
					style={{ minWidth: 250 }}
					size="medium"
					icon={chipIcon}
					label={message}
					color={colorNotification}
				/>
			</Stack>
		</Grid>
	);
}
