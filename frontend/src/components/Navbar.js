import { logout, getUserToken } from '../auth/Authentication';
// import useLocalStorageHook from '../utils/useLocalStorageHook';
import { useHistory } from 'react-router-dom';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import AddTaskIcon from '@mui/icons-material/AddTask';
import Button from '@mui/material/Button';

const Navbar = (props) => {
	const history = useHistory();
	const { isAuthenticated } = props;

	const handleLogout = () => {
		logout();
		history.push('/');
	};

	return (
		<Box sx={{ flexGrow: 1 }} padding={2}>
			<AppBar position="static">
				<Toolbar>
					<Typography variant="h6" component="div" paddingRight={2}>
						<AddTaskIcon />
					</Typography>
					<Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
						MERN Task Manager
					</Typography>
					{isAuthenticated ? (
						<>
							<Typography variant="h6" component="div" paddingRight={2}>
								{`${getUserToken().userEmail}`}
							</Typography>
							<Button
								variant="contained"
								color="warning"
								onClick={() => handleLogout()}
							>
								Logout
							</Button>
						</>
					) : (
						<Typography variant="h6" component="div">
							User
						</Typography>
					)}
				</Toolbar>
			</AppBar>
		</Box>
	);
};

export default Navbar;
