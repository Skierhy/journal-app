import { collection, getDocs } from 'firebase/firestore/lite';
import { FirebaseDB } from '../firebase/config';

export const loadNotes = async (uid) => {
	if (!uid) throw new Error('El uid no existe');
	// para obtener todas la notas de firebase
	const collectionRef = collection(FirebaseDB, `${uid}/journal/notes`);
	// getDocs regresa una promesa que contiene un snapshot de la colección
	const docs = await getDocs(collectionRef);
	const notes = [];
	// forEach recorre cada uno de los documentos que se encuentran en el snapshot
	// .data() regresa los datos del documento
	docs.forEach((doc) => {
		notes.push({ id: doc.id, ...doc.data() });
	});
	console.log(notes);
	return notes;
};
