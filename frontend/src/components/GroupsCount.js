import React, { useState, useEffect } from 'react';
import Box from '@mui/material/Box';
import { Avatar, Typography } from '@mui/material';
import icons from '../data/icons';
import colors from '../data/colors';
import PropTypes from 'prop-types';

function Item(props) {
	const { sx, ...other } = props;
	return (
		<Box
			sx={{
				bgcolor: 'primary.main',
				color: 'white',
				p: 1,
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

export default function GroupCount(props) {
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
	}, [tasks]); // eslint-disable-line react-hooks/exhaustive-deps

	const getColor = (iconIndex) => {
		const color = colors.find((color, index) => index === iconIndex);
		return `${color.hex}`;
	};
	return (
		<div style={{ width: '100%' }}>
			<Box
				sx={{
					display: 'flex',
					justifyContent: 'space-between',
					bgcolor: 'background.paper',
				}}
			>
				{icons.map((icon, index) => {
					return (
						<Item key={index}>
							<Avatar sx={{ bgcolor: getColor(index) }} aria-label="recipe">
								{icon.icon}
							</Avatar>
							<Typography>{groupsData[index]}</Typography>
						</Item>
					);
				})}
			</Box>
		</div>
	);
}
