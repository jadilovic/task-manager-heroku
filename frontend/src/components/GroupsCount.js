import React, { useState, useEffect } from 'react';
import { Avatar, Card } from '@mui/material';
import icons from '../data/icons';
import colors from '../data/colors';
import { styled } from '@mui/material/styles';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import ListItemText from '@mui/material/ListItemText';
import { Divider } from '@mui/material';

const SectionStyle = styled(Card)(({ theme }) => ({
	width: '100%',
	//	maxWidth: 464,
	display: 'flex',
	flexDirection: 'column',
	justifyContent: 'center',
}));

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

	return (
		<SectionStyle>
			<List>
				{icons.map((icon, index) => {
					return (
						<div key={index}>
							<ListItem>
								<ListItemAvatar>
									<Avatar
										style={{
											backgroundColor: colors[index].hex,
										}}
									>
										{icon.icon}
									</Avatar>
								</ListItemAvatar>
								<ListItemText
									primary={`Total: ${groupsData[index]}`}
									secondary={`${icon.name}`}
								/>
							</ListItem>
							{index < 3 && <Divider />}
						</div>
					);
				})}
			</List>
		</SectionStyle>
	);
}
