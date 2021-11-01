import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import { styled } from '@mui/material/styles';
import axios from 'axios';
import useLocalStorageHook from '../utils/useLocalStorageHook';
import taskStatusObjects from '../utils/taskStatusObjects';
import Card from '@mui/material/Card';
import Alert from '@mui/material/Alert';
import CardHeader from '@mui/material/CardHeader';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import Collapse from '@mui/material/Collapse';
import Avatar from '@mui/material/Avatar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { getUserToken } from '../auth/Authentication';

const ExpandMore = styled((props) => {
	const { expand, ...other } = props;
	return <IconButton {...other} />;
})(({ theme, expand }) => ({
	transform: !expand ? 'rotate(0deg)' : 'rotate(180deg)',
	marginLeft: 'auto',
	transition: theme.transitions.create('transform', {
		duration: theme.transitions.duration.shortest,
	}),
}));

const TaskCard = (props) => {
	const history = useHistory();
	const data = useLocalStorageHook();

	const { task, refreshTasks } = props;
	const [expanded, setExpanded] = useState(false);
	const serverURL = 'http://localhost:5000';

	let {
		name,
		dateCreated,
		currentStatus,
		description,
		avatarColor,
		_id,
		updatedAt,
	} = task;
	// better format to find
	dateCreated = new Date(Date.parse(dateCreated)).toDateString();
	// model task status to use on backend
	currentStatus = taskStatusObjects.find(
		(statusObject) => statusObject.id === currentStatus
	);

	const handleExpandClick = () => {
		setExpanded(!expanded);
	};

	// confirmation modal
	const deleteTask = async (taskId) => {
		const headers = {
			Authorization: `Bearer ${getUserToken().userToken}`,
		};
		try {
			await axios
				.delete(`${serverURL}/api/v1/tasks/${taskId}`, {
					headers,
				})
				.then((res) => {
					console.log('task deleted: ', res.data);
					refreshTasks();
				});
		} catch (err) {
			console.log(err.response);
		}
	};

	// change to handeto Edit
	const handleOnClick = (taskName) => {
		data.saveCurrentTaskName(taskName);
		history.push('/edit');
	};

	return (
		<Card sx={{ maxWidth: 645 }}>
			<CardHeader
				avatar={
					<Avatar sx={{ bgcolor: avatarColor }} aria-label="recipe">
						{name.substring(0, 3)}
					</Avatar>
				}
				action={
					<IconButton
						onClick={() => handleOnClick(name)}
						size="large"
						color="primary"
						aria-label="edit"
					>
						<EditIcon />
					</IconButton>
				}
				title={name}
				subheader={dateCreated}
			/>
			<CardActions disableSpacing>
				<IconButton
					onClick={() => deleteTask(_id)}
					size="large"
					color="error"
					aria-label="delete"
				>
					<DeleteIcon />
				</IconButton>
				<Alert sx={{ flexGrow: 1 }} severity={currentStatus.severity}>
					{currentStatus.message}
				</Alert>
				<ExpandMore
					expand={expanded}
					onClick={handleExpandClick}
					aria-expanded={expanded}
					aria-label="show more"
				>
					<ExpandMoreIcon />
				</ExpandMore>
			</CardActions>
			<Collapse in={expanded} timeout="auto" unmountOnExit>
				<CardContent>
					<Typography paragraph>
						{description ? description : 'No description'}
					</Typography>
					<Typography paragraph>{`Updated at: ${updatedAt}`}</Typography>
				</CardContent>
			</Collapse>
		</Card>
	);
};

export default TaskCard;
