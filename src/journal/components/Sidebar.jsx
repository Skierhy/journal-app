import { Drawer, Box, Toolbar, Typography, Divider, List } from '@mui/material';
import { PropTypes } from 'prop-types';
import { useSelector } from 'react-redux';
import { SideBarItem } from './SideBarItem';

export const Sidebar = ({ drawerWidth }) => {
	// flexShrink: 0 -> para que no se achique
	// open -> para que se muestre
	// '& .MuiDrawer-paper' -> para que se aplique a la clase MuiDrawer-paper
	// boxSizing: 'border-box', -> para que no se salga del drawer
	const { displayName } = useSelector((state) => state.auth);
	const { notes } = useSelector((state) => state.journal);
	return (
		<Box
			component={'nav'}
			sx={{ width: { sm: drawerWidth }, flexShrink: { sm: 0 } }}
		>
			<Drawer
				variant='permanent' // temporary
				open={true}
				sx={{
					display: { xs: 'block' },
					'& .MuiDrawer-paper': {
						boxSizing: 'border-box',
						width: drawerWidth,
					},
				}}
			>
				<Toolbar>
					<Typography variant='h6' noWrap component={'div'}>
						{displayName}
					</Typography>
				</Toolbar>
				<Divider />

				<List>
					{notes.map((note) => (
						<SideBarItem key={note.id} {...note} />
					))}
				</List>
			</Drawer>
		</Box>
	);
};

Sidebar.propTypes = {
	drawerWidth: PropTypes.number.isRequired,
};
