import { Toolbar } from '@mui/material';
import { Box } from '@mui/system';
import { PropTypes } from 'prop-types';
import { NavBar, Sidebar } from '../components';

const drawerWidth = 240;

export const JournalLayout = ({ children }) => {
	return (
		// box es como un div
		<Box
			sx={{ display: 'flex' }}
			className='animate__animated animate__fadeIn animate__faster'
		>
			{/* Navbar drawerWidth */}
			<NavBar drawerWidth={drawerWidth} />

			{/* Sidebar drawerWidth */}
			<Sidebar drawerWidth={drawerWidth} />

			{/* Main */}
			<Box component={'main'} sx={{ flexGrow: 1, p: 3 }}>
				{/* Content */}
				<Toolbar />
				{children}
			</Box>
		</Box>
	);
};

JournalLayout.propTypes = {
	children: PropTypes.node,
};
