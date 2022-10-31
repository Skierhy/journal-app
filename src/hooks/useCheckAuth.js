import { onAuthStateChanged } from 'firebase/auth';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { FirebaseAuth } from '../firebase/config';
import { login, logout } from '../store/auth/authSlice';

export const useCheckAuth = () => {
	const { status } = useSelector((state) => state.auth);
	const dispatch = useDispatch();

	// como saber que fire esta al pendiente de la autenticación
	useEffect(() => {
		// onAuthStateChanged revisa si hay un usuario autenticado
		// firebaseAuth regresa un observable es decir un objeto que se puede observar envia cada vez que hay un cambio
		onAuthStateChanged(FirebaseAuth, async (user) => {
			if (!user) return dispatch(logout());
			const { uid, email, displayName, photoURL } = user;
			dispatch(login({ uid, email, displayName, photoURL }));
		});
	}, []);

	return { status };
};
