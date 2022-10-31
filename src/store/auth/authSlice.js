import { createSlice } from '@reduxjs/toolkit';

// estado de autentificación
const initialState = {
	status: 'checking', // 'checking' | 'authenticated' | 'not-authenticated'
	uid: null, // uid del usuario
	email: null, // email del usuario
	displayName: null, // nombre del usuario
	photoURL: null, // url de la foto del usuario
	errorMessage: null, // mensaje de error
};

const authSlice = createSlice({
	name: 'auth',
	initialState,
	reducers: {
		login: (state, { payload }) => {
			const { uid, email, displayName, photoURL } = payload;
			state.status = 'authenticated';
			state.uid = uid;
			state.email = email;
			state.displayName = displayName;
			state.photoURL = photoURL;
			state.errorMessage = null;
		},
		logout: (state, { payload = null }) => {
			state.status = 'not-authenticated';
			state.uid = null;
			state.email = null;
			state.displayName = null;
			state.photoURL = null;
			state.errorMessage = payload;
		},
		// anda revisando sobre su credenciales e sun proceso asíncrono
		checkingCredentials: (state) => {
			state.status = 'checking';
		},
	},
});

export const { login, logout, checkingCredentials } = authSlice.actions;

export default authSlice.reducer;
