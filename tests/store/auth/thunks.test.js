import {
	LoginWithEmailPassword,
	logoutFirebase,
	singInWithGoogle,
} from '../../../src/firebase/providers';
import {
	checkingCredentials,
	login,
	logout,
} from '../../../src/store/auth/authSlice';
import {
	checkingAuthentication,
	starGoogleSignIn,
	startLoginWithEmailPassword,
	startLogout,
} from '../../../src/store/auth/thunks';
import { clearNotesLogout } from '../../../src/store/journal/journalSlice';
import { demoUser } from '../../fixtures/authFixtures';

jest.mock('../../../src/firebase/providers');

describe('Pruebas en AuthThunks', () => {
	const dispatch = jest.fn();

	beforeEach(() => jest.clearAllMocks());

	test('debe de invocar el checkingCredentials', async () => {
		// función()((dispatch)) es algo parecido asi
		await checkingAuthentication()(dispatch);
		expect(dispatch).toHaveBeenCalledWith(checkingCredentials());
	});

	test('starGoogleSignIn debe de llamar checkingCredentials y login - Exito', async () => {
		const loginData = { ok: true, ...demoUser };
		// mockResolvedValue sirve para simular una respuesta de una función asíncrona
		await singInWithGoogle.mockResolvedValue(loginData);

		// thunk
		await starGoogleSignIn()(dispatch);
		// toHaveBeenCalledWith sirve para verificar que una función haya sido llamada con un argumento en específico
		expect(dispatch).toHaveBeenCalledWith(checkingCredentials());
		expect(dispatch).toHaveBeenCalledWith(login(loginData));
	});

	test('starGoogleSignIn debe de llamar checkingCredentials y logout - Error', async () => {
		const loginData = { ok: false, message: 'Un error en Google' };
		await singInWithGoogle.mockResolvedValue(loginData);

		// thunk
		await starGoogleSignIn()(dispatch);

		expect(dispatch).toHaveBeenCalledWith(checkingCredentials());
		expect(dispatch).toHaveBeenCalledWith(logout(loginData.message));
	});

	test('startLoginWithEmailPassword debe de llamar checkingCredentials y login - Exito', async () => {
		const loginData = { ok: true, ...demoUser };
		const formData = { email: demoUser.email, password: '123456' };

		await LoginWithEmailPassword.mockResolvedValue(loginData);

		await startLoginWithEmailPassword(formData)(dispatch);

		expect(dispatch).toHaveBeenCalledWith(checkingCredentials());
		expect(dispatch).toHaveBeenCalledWith(login(demoUser));
	});

	test('startLogout debe de llamar logoutFirebase, clearNotes y logout', async () => {
		await startLogout()(dispatch);

		expect(logoutFirebase).toHaveBeenCalled();
		expect(dispatch).toHaveBeenCalledWith(clearNotesLogout());
		expect(dispatch).toHaveBeenCalledWith(logout(null));
	});
});
