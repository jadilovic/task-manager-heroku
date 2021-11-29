import * as React from 'react';
import Chip from '@mui/material/Chip';
import Stack from '@mui/material/Stack';
import HourglassEmpty from '@mui/icons-material/HourglassEmpty';
import { CheckCircleOutline, ArrowForward } from '@mui/icons-material';
import { Grid } from '@mui/material';

export default function TaskStatus(props) {
	const { colorNotification, message } = props.taskStatus;
	let chipIcon = null;
	if (message === 'Initiated') {
		chipIcon = <HourglassEmpty />;
	} else if (colorNotification === 'Ongoing') {
		chipIcon = <ArrowForward />;
	} else {
		chipIcon = <CheckCircleOutline />;
	}
	return (
		<Grid justifyItems="center" item xs={12}>
			<Stack spacing={1} alignItems="center">
				<Chip
					style={{ backgroundColor: colorNotification, minWidth: 250 }}
					size="medium"
					icon={chipIcon}
					label={message}
				/>
			</Stack>
		</Grid>
	);
}
