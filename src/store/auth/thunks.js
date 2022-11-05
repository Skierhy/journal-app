// los thunk son funciones que retornan otra función
// que recibe como parámetro el dispatch
// y que puede ejecutar acciones asíncronas
// y luego ejecutar acciones síncronas
// para actualizar el estado de la aplicación
// en el store

import {
	LoginWithEmailPassword,
	logoutFirebase,
	registerUserWithEmailPassword,
	singInWithGoogle,
} from '../../firebase/providers';
import { clearNotesLogout } from '../journal/journalSlice';
import { checkingCredentials, login, logout } from './authSlice';

export const checkingAuthentication = () => {
	return async (dispatch) => {
		dispatch(checkingCredentials());
	};
};

// se usa start para iniciar el proceso de autenticación es una tarea asíncrona
export const starGoogleSignIn = () => {
	return async (dispatch) => {
		dispatch(checkingCredentials());
		const result = await singInWithGoogle();
		if (!result.ok) return dispatch(logout(result.message));
		dispatch(login(result));
	};
};

export const startCreatingUserWithEmailPassword = ({
	email,
	password,
	displayName,
}) => {
	return async (dispatch) => {
		dispatch(checkingCredentials());
		const { ok, uid, photoURL, message } =
			await registerUserWithEmailPassword({
				email,
				password,
				displayName,
			});
		if (!ok) return dispatch(logout(message));
		dispatch(login({ uid, displayName, email, photoURL }));
	};
};

export const startLoginWithEmailPassword = ({ email, password }) => {
	return async (dispatch) => {
		dispatch(checkingCredentials());
		const { ok, uid, photoURL, message, displayName } =
			await LoginWithEmailPassword({
				email,
				password,
			});
		if (!ok) return dispatch(logout(message));
		dispatch(login({ uid, email, photoURL, displayName }));
	};
};

export const startLogout = () => {
	return async (dispatch) => {
		await logoutFirebase();
		dispatch(clearNotesLogout());
		dispatch(logout(null));
	};
};
