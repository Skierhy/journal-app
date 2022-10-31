import { LogoutOutlined, MenuOutlined } from '@mui/icons-material';
import { AppBar, Grid, IconButton, Toolbar, Typography } from '@mui/material';
import { PropTypes } from 'prop-types';
import { useDispatch } from 'react-redux';
import { startLogout } from '../../store/auth/thunks';

export const NavBar = ({ drawerWidth }) => {
	const dispatch = useDispatch();
	const onLogout = () => {
		dispatch(startLogout());
	};
	return (
		<>
			{/*
        position: fixed -> para que se quede fijo en la parte superior
        sx -> para estilos
        ----
        Toolbar -> para que se quede centrado
        IconButton -> para que se quede a la izquierda
        width: { sm: `calc(100% - ${drawerWidth}px)` } -> para que se quede a la derecha
        ml: { sm: `${drawerWidth}px` } -> para que ocupe todo el ancho
		edge -> sirve para que el botón se quede a la izquierda
		color -> para que el botón sea blanco
		noWrap -> para que no se salga del botón
    */}
			<AppBar
				position='fixed'
				sx={{
					width: { sm: `calc(100% - ${drawerWidth}px)` },
					ml: { sm: `${drawerWidth}px` },
				}}
			>
				<Toolbar>
					<IconButton
						color='inherit'
						edge='start'
						sx={{ mr: 2, display: { sm: 'none' } }}
					>
						<MenuOutlined />
					</IconButton>
					<Grid
						container
						direction='row'
						justifyContent='space-between'
						alignItems='center'
					>
						<Typography variant='h6' noWrap component={'div'}>
							JournalLayout
						</Typography>
						<IconButton color='error' onClick={onLogout}>
							<LogoutOutlined />
						</IconButton>
					</Grid>
				</Toolbar>
			</AppBar>
		</>
	);
};

NavBar.propTypes = {
	drawerWidth: PropTypes.number.isRequired,
};
