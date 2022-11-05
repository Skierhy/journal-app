import { collection, deleteDoc, doc, setDoc } from 'firebase/firestore/lite';
import { FirebaseDB } from '../../firebase/config';
import { fileUpload } from '../../helpers/fileUpload';
import { loadNotes } from '../../helpers/loadNotes';
import {
	addNewEmptyNote,
	setActiveNote,
	savingNewNote,
	setNotes,
	setSaving,
	noteUpdated,
	setPhotosToActiveNote,
	deleteNoteById,
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
		if (!uid) throw new Error('El uid no existe');
		const notes = await loadNotes(uid);
		dispatch(setNotes(notes));
	};
};

export const startSaveNote = () => {
	return async (dispatch, getState) => {
		dispatch(setSaving());
		const { uid } = getState().auth;
		const { active: note } = getState().journal;
		const noteToFirestore = { ...note };
		// delete sirve para eliminar propiedades de un objeto
		delete noteToFirestore.id;
		const docRef = doc(FirebaseDB, `${uid}/journal/notes/${note.id}`);
		// esta linea de código es para actualizar el documento
		await setDoc(docRef, noteToFirestore, { merge: true });
		dispatch(noteUpdated(note));
	};
};

export const startUploadingFiles = (files = []) => {
	return async (dispatch) => {
		dispatch(setSaving());
		// await fileUpload(files[0]);
		const fileUploadPromises = [];
		for (const file of files) {
			fileUploadPromises.push(fileUpload(file));
		}
		const photosURLs = await Promise.all(fileUploadPromises);
		dispatch(setPhotosToActiveNote(photosURLs));
	};
};

export const startDeletingNote = () => {
	return async (dispatch, getState) => {
		const { uid } = getState().auth;
		const { active: note } = getState().journal;
		const docRef = doc(FirebaseDB, `${uid}/journal/notes/${note.id}`);
		await deleteDoc(docRef);
		dispatch(deleteNoteById(note.id));
	};
};
