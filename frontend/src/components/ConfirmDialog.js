import * as React from 'react';
import Button from '@mui/material/Button';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import Dialog from '@mui/material/Dialog';

const ConfirmDialog = (props) => {
	const { title, children, open, setOpen, onConfirm } = props;
	return (
		<Dialog
			open={open}
			onClose={() => setOpen(false)}
			aria-labelledby="confirm-dialog"
		>
			<DialogTitle id="confirm-dialog">{title}</DialogTitle>
			<DialogContent>{children}</DialogContent>
			<DialogActions>
				<Button
					variant="contained"
					onClick={() => setOpen(false)}
					color="primary"
				>
					No
				</Button>
				<Button
					variant="contained"
					color="error"
					onClick={() => {
						setOpen(false);
						onConfirm();
					}}
				>
					Delete
				</Button>
			</DialogActions>
		</Dialog>
	);
};
export default ConfirmDialog;
