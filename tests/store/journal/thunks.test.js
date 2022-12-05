import { collection, deleteDoc, getDocs } from 'firebase/firestore/lite';
import { FirebaseDB } from '../../../src/firebase/config';
import {
	savingNewNote,
	addNewEmptyNote,
	setActiveNote,
} from '../../../src/store/journal/journalSlice';
import { startNewNote } from '../../../src/store/journal/thunks';

describe('Pruebas en Journal Thunks', () => {
	const dispatch = jest.fn();
	const getState = jest.fn();

	beforeEach(() => jest.clearAllMocks());

	test('startNewNote debe de crear una nueva nota en blanco', async () => {
		const uid = 'TEST-UID';
		getState.mockReturnValue({ auth: { uid: uid } });

		// mockResolvedValue sirve para simular una respuesta de una función asíncrona
		// mockReturnValue sirve para simular una respuesta de una función síncrona

		await startNewNote()(dispatch, getState);

		expect(dispatch).toHaveBeenCalledWith(savingNewNote());
		expect(dispatch).toHaveBeenCalledWith(
			addNewEmptyNote({
				body: '',
				title: '',
				id: expect.any(String),
				date: expect.any(Number),
			})
		);
		expect(dispatch).toHaveBeenCalledWith(
			setActiveNote({
				body: '',
				title: '',
				id: expect.any(String),
				date: expect.any(Number),
			})
		);

		// Borrar de firebase
		// referencia a la colección de todas las notas
		const collectionRef = collection(FirebaseDB, `${uid}/journal/notes`);
		// obtener todas las notas
		const docs = await getDocs(collectionRef);
		// borrar todas las notas
		// este un arreglo de promesas
		const deletePromises = [];
		// deleteDoc es una función asíncrona sirve para eliminar
		docs.forEach((doc) => deletePromises.push(deleteDoc(doc.ref)));
		await Promise.all(deletePromises);
	});
});
