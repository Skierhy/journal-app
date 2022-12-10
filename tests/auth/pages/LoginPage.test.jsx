import { fireEvent, render, screen } from '@testing-library/react';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import { MemoryRouter } from 'react-router-dom';

import { LoginPage } from '../../../src/auth/pages/LoginPage';
import { authSlice } from '../../../src/store/auth/authSlice';
import { starGoogleSignIn } from '../../../src/store/auth/thunks';
import { notAuthenticatedState } from '../../fixtures/authFixtures';

// es importante poner mock
const mockStartGoogleSignIn = jest.fn();
const mockStartLoginWithEmailPassword = jest.fn();

// creamos un mock para el startGoogleSignIn
// y también para el startLoginWithEmailPassword
jest.mock('../../../src/store/auth/thunks', () => ({
	starGoogleSignIn: () => mockStartGoogleSignIn,
	// definimos el mack
	// arguments email y password
	startLoginWithEmailPassword: ({ email, password }) => {
		// retornamos una función que retorna una función
		return () => mockStartLoginWithEmailPassword({ email, password });
	},
}));

// creamos un mock para el useDispatch de react-redux para poder usar el dispatch en el componente y no tener que usar el store
// debe que se especifico nada mas useDispatch se va a usar el mock
jest.mock('react-redux', () => ({
	// esparcimos todo lo que tiene el react-redux
	...jest.requireActual('react-redux'),
	// sobreescribimos el useDispatch
	// lo que hace es retornar una función que retorna una función
	useDispatch: () => (fn) => fn(),
}));

// creamos un store para poder usar el provider y renderizar el componente
// necesitamos los reducer con la información que necesitamos
const store = configureStore({
	reducer: {
		auth: authSlice.reducer,
	},
	// preloadedState sirve para inicializar el store con un estado inicial
	// para que no este en el estado checking
	preloadedState: {
		auth: notAuthenticatedState,
	},
});

describe('Pruebas en <LoginPage />', () => {
	// limpiamos los mocks antes de cada test
	beforeEach(() => jest.clearAllMocks());

	test('debe de mostrar el componente correctamente', () => {
		render(
			// necesitamos usar el provider para poder usar el store y renderizar el componente
			// store se puede usar el que tenemos en el store.js o crear uno nuevo
			// MemoryRouter es para poder usar el Link de react-router-dom
			<Provider store={store}>
				<MemoryRouter>
					<LoginPage />
				</MemoryRouter>
			</Provider>
		);

		// screen.debug()
		// toBeGreaterThanOrEqual sirve para que el test pase si hay más de un elemento con el texto
		expect(screen.getAllByText('Login').length).toBeGreaterThanOrEqual(1);
	});

	test('botón de google debe de llamar el startGoogleSignIn', () => {
		// renderizamos el componente
		render(
			<Provider store={store}>
				<MemoryRouter>
					<LoginPage />
				</MemoryRouter>
			</Provider>
		);
		// usamos el aria-label para buscar el botón
		const googleBtn = screen.getByLabelText('google-btn');
		// evento click
		fireEvent.click(googleBtn);
		// esperamos que se haya llamado la función mockStartGoogleSignIn
		expect(mockStartGoogleSignIn).toHaveBeenCalled();
	});

	test('submit debe de llamar startLoginWithEmailPassword', () => {
		// creamos las variables que vamos a usar
		const email = 'fernando@google.com';
		const password = '123456';
		// renderizamos el componente
		render(
			<Provider store={store}>
				<MemoryRouter>
					<LoginPage />
				</MemoryRouter>
			</Provider>
		);

		const emailField = screen.getByRole('textbox', { name: 'Email' });
		// evento change para cambiar el valor del input
		// target es el input
		// name es el name del input
		// value es el valor que queremos ponerle
		fireEvent.change(emailField, {
			target: { name: 'email', value: email },
		});
		// getByTestId es para buscar por el data-testid
		const passwordField = screen.getByTestId('password');
		fireEvent.change(passwordField, {
			target: { name: 'password', value: password },
		});
		// buscamos el formulario
		const loginForm = screen.getByLabelText('submit-form');
		// evento submit
		fireEvent.submit(loginForm);

		// toHaveBeenCalledWith sirve para esperar que se haya llamado la función
		// esperamos que se haya llamado la función mockStartLoginWithEmailPassword
		// con los argumentos que le pasamos
		expect(mockStartLoginWithEmailPassword).toHaveBeenCalledWith({
			email: email,
			password: password,
		});
	});
});
