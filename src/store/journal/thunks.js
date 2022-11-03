import { collection, doc, setDoc } from 'firebase/firestore/lite';
import { FirebaseDB } from '../../firebase/config';
import { loadNotes } from '../../helpers/loadNotes';
import {
	addNewEmptyNote,
	setActiveNote,
	savingNewNote,
	setNotes,
} from './journalSlice';

export const startNewNote = () => {
	return async (dispatch, getState) => {
		dispatch(savingNewNote());
		// grabar en la base de datos
		const { uid } = getState().auth;
		const newNote = {
			title: '',
			body: '',
			date: new Date().getTime(),
		};
		// grabar en la base de datos
		// sintaxis de doc
		// doc(colección(configuración de firebase), id del documento))
		const newDoc = doc(collection(FirebaseDB, `${uid}/journal/notes`));
		// sintaxis de setDoc
		// setDoc(documento, datos)
		await setDoc(newDoc, newNote);
		// lo que hace aquí id es que lo que se graba en la base de datos
		newNote.id = newDoc.id;
		dispatch(addNewEmptyNote(newNote));
		dispatch(setActiveNote(newNote));
	};
};

export const startLoadingNotes = () => {
	return async (dispatch, getState) => {
		const { uid } = getState().auth;
		console.log(uid);
		if (!uid) throw new Error('El uid no existe');
		const notes = await loadNotes(uid);
		dispatch(setNotes(notes));
	};
};
