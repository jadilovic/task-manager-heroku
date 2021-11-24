import React, { useState, useEffect } from 'react';
import Box from '@mui/material/Box';
import { Avatar, Card, CardHeader, Typography } from '@mui/material';
import icons from '../data/icons';
import colors from '../data/colors';

export default function GroupsCount(props) {
	const { tasks } = props;
	const [groupsData, setGroupsData] = useState([]);

	const calculateGroupsData = () => {
		console.log();
		let homeCount = 0;
		let businessCount = 0;
		let groupCount = 0;
		let personCount = 0;
		tasks.forEach((task) => {
			if (task.avatarIcon === 'Home') {
				homeCount++;
			} else if (task.avatarIcon === 'Business') {
				businessCount++;
			} else if (task.avatarIcon === 'Group') {
				groupCount++;
			} else {
				personCount++;
			}
		});
		setGroupsData([homeCount, businessCount, groupCount, personCount]);
	};

	useEffect(() => {
		calculateGroupsData();
	}, []); // eslint-disable-line react-hooks/exhaustive-deps

	const getColor = (iconIndex) => {
		const color = colors.find((color, index) => index === iconIndex);
		return `${color.hex}`;
	};

	return (
		<Box
			sx={{
				paddingTop: 3,
				'& > :not(style)': {
					m: 0,
				},
			}}
		>
			<Card>
				<CardHeader
					avatar={icons.map((icon, index) => {
						return (
							<Box key={index} px={{ xs: 1, sm: 2, md: 3 }}>
								<Typography>{groupsData[index]}</Typography>
								<Avatar sx={{ bgcolor: getColor(index) }} aria-label="recipe">
									{icon.icon}
								</Avatar>
							</Box>
						);
					})}
				/>
			</Card>
		</Box>
	);
}
