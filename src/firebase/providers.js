import {
	createUserWithEmailAndPassword,
	GoogleAuthProvider,
	signInWithEmailAndPassword,
	signInWithPopup,
	updateProfile,
} from 'firebase/auth';
import { FirebaseAuth } from './config';

// crear una instancia de GoogleAuthProvider
const googleProvider = new GoogleAuthProvider();

export const singInWithGoogle = async () => {
	try {
		// abrir el popup de google para autenticar
		// necesitamos el await para que espere a que se resuelva la promesa
		// y nos devuelva el resultado
		// signInWithPopup sus argumentos son el objeto de autenticación y el proveedor
		const result = await signInWithPopup(FirebaseAuth, googleProvider);
		// esto nos devuelve un objeto con la información del usuario
		// const credential = GoogleAuthProvider.credentialFromResult(result);
		// console.log({ credential });
		// user es el objeto del usuario
		const user = result.user;
		const { displayName, email, photoURL, uid } = user;
		return {
			ok: true,
			// user info
			displayName,
			email,
			photoURL,
			uid,
		};
	} catch (error) {
		const { code, message } = error;
		return {
			ok: false,
			code,
			message,
		};
	}
};

export const registerUserWithEmailPassword = async ({
	email,
	password,
	displayName,
}) => {
	try {
		// usar firebase
		// FirebaseAuth es toda la configuración de firebase que hicimos
		const respuesta = await createUserWithEmailAndPassword(
			FirebaseAuth,
			email,
			password
		);
		const { uid, photoURL } = respuesta.user;
		// updateProfile es una función de firebase que recibe el objeto de autenticación
		// y un objeto con la información que queremos actualizar
		// currentUser es el usuario actual
		await updateProfile(FirebaseAuth.currentUser, {
			displayName,
		});
		return {
			ok: true,
			uid,
			displayName,
			email,
			photoURL,
		};
	} catch (error) {
		const { code, message } = error;
		return {
			ok: false,
			code,
			message,
		};
	}
};

export const LoginWithEmailPassword = async ({ email, password }) => {
	try {
		const respuesta = await signInWithEmailAndPassword(
			FirebaseAuth,
			email,
			password
		);
		const { uid, photoURL, displayName } = respuesta.user;
		return {
			ok: true,
			uid,
			photoURL,
			displayName,
		};
	} catch (error) {
		const { code, message } = error;
		return {
			ok: false,
			code,
			message,
		};
	}
};
