import { SaveOutlined } from '@mui/icons-material';
import { Button, Grid, TextField, Typography } from '@mui/material';
import { ImageGallery } from '../components';

export const NoteView = () => {
	return (
		<>
			<Grid
				className='animate__animated animate__fadeIn animate__faster'
				container
				direction='row'
				justifyContent='space-between'
				alignItems='center'
				sx={{ mb: 1 }}
			>
				<Grid item>
					<Typography fontSize={39} fontWeight={'light'}>
						24 de junio del 2077
					</Typography>
				</Grid>
				<Grid item>
					<Button color='primary' sx={{ padding: 2 }}>
						<SaveOutlined sx={{ fontSize: 30, mr: 1 }} />
						Guardar
					</Button>
				</Grid>
				<Grid container>
					<TextField
						type='text'
						variant='filled'
						fullWidth
						placeholder='Ingrese un titulo'
						label='Titulo'
						sx={{ border: 'none', mb: 1 }}
					/>
					<TextField
						type='text'
						variant='filled'
						fullWidth
						multiline
						placeholder='¿Que paso hoy?'
						minRows={5}
						sx={{ border: 'none', mb: 1 }}
					/>
				</Grid>
				{/* galería de imágenes */}
				<ImageGallery />
			</Grid>
		</>
	);
};
