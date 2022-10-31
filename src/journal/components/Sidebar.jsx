import { TurnedInNot } from '@mui/icons-material';
import {
	Drawer,
	Box,
	Toolbar,
	Typography,
	Divider,
	List,
	ListItem,
	ListItemButton,
	ListItemIcon,
	Grid,
	ListItemText,
} from '@mui/material';
import { PropTypes } from 'prop-types';
import { useSelector } from 'react-redux';

export const Sidebar = ({ drawerWidth }) => {
	// flexShrink: 0 -> para que no se achique
	// open -> para que se muestre
	// '& .MuiDrawer-paper' -> para que se aplique a la clase MuiDrawer-paper
	// boxSizing: 'border-box', -> para que no se salga del drawer
	const { displayName } = useSelector((state) => state.auth);
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
					{[
						'Enero',
						'Febrero',
						'Marzo',
						'Abril',
						'Mayo',
						'Junio',
						'Julio',
						'Agosto',
						'Septiembre',
						'Octubre',
						'Noviembre',
						'Diciembre',
					].map((text) => (
						<ListItem key={text} disablePadding>
							<ListItemButton>
								<ListItemIcon>
									<TurnedInNot />
								</ListItemIcon>
								<Grid container>
									<ListItemText primary={text} />
									<ListItemText
										secondary={
											'Lorem ipsum dolor sit amet consectetur adipisicing elit.'
										}
									/>
								</Grid>
							</ListItemButton>
						</ListItem>
					))}
				</List>
			</Drawer>
		</Box>
	);
};

Sidebar.propTypes = {
	drawerWidth: PropTypes.number.isRequired,
};
