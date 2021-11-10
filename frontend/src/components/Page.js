import PropTypes from 'prop-types';
import { forwardRef } from 'react';
// material
import { Box } from '@mui/material';

// ----------------------------------------------------------------------

const Page = forwardRef(({ children, title = '', ...other }, ref) => (
	<Box ref={ref} {...other}>
		{children}
	</Box>
));

Page.propTypes = {
	children: PropTypes.node.isRequired,
	title: PropTypes.string,
};

export default Page;
