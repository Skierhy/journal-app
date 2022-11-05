import {
	Alert,
	Button,
	Grid,
	Link,
	TextField,
	Typography,
} from '@mui/material';
import { useMemo, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link as RouterLink } from 'react-router-dom';
import { useForm } from '../../hooks';
import { AuthLayout } from '../layout/';
import { startCreatingUserWithEmailPassword } from '../../store/auth/thunks';
const formData = {
	email: '',
	password: '',
	displayName: '',
};

const formValidations = {
	email: [(value) => value.includes('@'), 'El email debe contener una @'],
	password: [
		(value) => value.length >= 6,
		'La contraseña debe tener al menos 6 caracteres',
	],
	displayName: [
		(value) => value.length >= 3,
		'El nombre debe tener al menos 3 caracteres',
	],
};

export const RegisterPage = () => {
	const dispatch = useDispatch();
	const { status, errorMessage } = useSelector((state) => state.auth);
	const isCheckingAuthentication = useMemo(
		() => status === 'checking',
		[status]
	);
	const err = !!errorMessage;
	const [formSubmitted, setFormSubmitted] = useState(false);
	const {
		displayName,
		email,
		password,
		onInputChange,
		formState,
		isFormValid,
		displayNameValid,
		emailValid,
		passwordValid,
	} = useForm(formData, formValidations);

	const onSubmit = (e) => {
		e.preventDefault();
		setFormSubmitted(true);
		if (!isFormValid) return;
		dispatch(startCreatingUserWithEmailPassword(formState));
	};

	return (
		<AuthLayout title='Crear Cuenta'>
			<form
				onSubmit={onSubmit}
				className='animate__animated animate__fadeIn animate__faster'
			>
				<Grid container>
					<Grid item xs={12} sx={{ mt: 2 }}>
						<TextField
							label='Nombre Completo'
							type={'text'}
							placeholder='Tu nombre completo'
							fullWidth
							name='displayName'
							value={displayName}
							onChange={onInputChange}
							error={!!displayNameValid && formSubmitted}
							helperText={displayNameValid}
						/>
					</Grid>
					<Grid item xs={12} sx={{ mt: 2 }}>
						<TextField
							label='Email'
							type={'email'}
							placeholder='correo@gmail.com'
							fullWidth
							name='email'
							value={email}
							onChange={onInputChange}
							error={!!emailValid && formSubmitted}
							helperText={emailValid}
						/>
					</Grid>
					<Grid item xs={12} sx={{ mt: 2 }}>
						<TextField
							label='Password'
							type={'password'}
							placeholder='Password'
							fullWidth
							name='password'
							value={password}
							onChange={onInputChange}
							error={!!passwordValid && formSubmitted}
							helperText={passwordValid}
						/>
					</Grid>
					{err ? (
						<Grid container spacing={2} sx={{ mb: 2, mt: 1 }}>
							<Grid item xs={12}>
								<Alert severity='error'>{errorMessage}</Alert>
							</Grid>
						</Grid>
					) : null}
					<Grid container spacing={2} sx={{ mb: 2, mt: 1 }}>
						<Grid item xs={12}>
							<Button
								type='submit'
								variant='contained'
								fullWidth
								disabled={isCheckingAuthentication}
							>
								Crear Cuenta
							</Button>
						</Grid>
					</Grid>
					<Grid container direction='row' justifyContent='end'>
						<Typography sx={{ mr: 1 }}>
							¿Ya tienes una cuenta?
						</Typography>
						<Link
							component={RouterLink}
							color='inherit'
							to='/auth/login'
						>
							Ingresar
						</Link>
					</Grid>
				</Grid>
			</form>
		</AuthLayout>
	);
};
