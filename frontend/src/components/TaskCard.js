import React, { useState, forwardRef } from 'react';
import { useHistory } from 'react-router-dom';
import { styled } from '@mui/material/styles';
import moment from 'moment';
import useLocalStorageHook from '../utils/useLocalStorageHook';
import Card from '@mui/material/Card';
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
import ConfirmDialog from './ConfirmDialog';
import TaskStatus from './TaskStatus';
import useAxiosRequest from '../utils/useAxiosRequest';
import Stack from '@mui/material/Stack';
import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';

const Alert = forwardRef(function Alert(props, ref) {
	return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

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
	const mongoDB = useAxiosRequest();
	const history = useHistory();
	const data = useLocalStorageHook();
	const [confirmOpen, setConfirmOpen] = useState(false);
	const [openSnackbar, setOpenSnackbar] = useState(false);
	const { task, taskStatusObjects, refreshTasks } = props;
	const [expanded, setExpanded] = useState(false);

	let {
		name,
		dateCreated,
		currentStatus,
		description,
		avatarColor,
		_id,
		updatedAt,
	} = task;
	dateCreated = new Date(dateCreated).toDateString();
	currentStatus = taskStatusObjects.find(
		(statusObject) => statusObject._id === currentStatus
	);
	const lastUpdate = moment(new Date(updatedAt));

	const handleExpandClick = () => {
		setExpanded(!expanded);
	};

	const handleDeleteTask = async (taskId) => {
		await mongoDB.deleteTask(taskId);
		setOpenSnackbar(true);
		refreshTasks();
	};

	const handleOnClick = (taskId) => {
		data.saveCurrentTaskId(taskId);
		history.push('/edit');
	};

	const handleClose = (event, reason) => {
		if (reason === 'clickaway') {
			return;
		}
		setOpenSnackbar(false);
	};

	return (
		<Card style={{ backgroundColor: 'lightgray' }} sx={{ maxWidth: 645 }}>
			<CardHeader
				avatar={
					<Avatar sx={{ bgcolor: avatarColor }} aria-label="recipe">
						{name.substring(0, 3)}
					</Avatar>
				}
				action={
					<IconButton
						onClick={() => handleOnClick(_id)}
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
					onClick={() => setConfirmOpen(true)}
					size="large"
					color="error"
					aria-label="delete"
				>
					<DeleteIcon />
				</IconButton>
				<ConfirmDialog
					title="Delete Task?"
					open={confirmOpen}
					setOpen={setConfirmOpen}
					onConfirm={() => handleDeleteTask(_id)}
				>
					<Typography paragraph>
						Are you sure you want to delete this task?
					</Typography>
				</ConfirmDialog>
				<TaskStatus taskStatus={currentStatus} />
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
					<Typography
						paragraph
					>{`Task last updated ${lastUpdate.fromNow()}`}</Typography>
				</CardContent>
			</Collapse>
			<Stack spacing={2} sx={{ width: '100%' }}>
				<Snackbar
					open={openSnackbar}
					autoHideDuration={3000}
					onClose={handleClose}
				>
					<Alert onClose={handleClose} severity="error" sx={{ width: '100%' }}>
						{`Task with name "${name}" was deleted!"`}
					</Alert>
				</Snackbar>
			</Stack>
		</Card>
	);
};

export default TaskCard;
