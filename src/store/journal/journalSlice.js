import { createSlice } from '@reduxjs/toolkit';

const initialState = {
	isSaving: false,
	messageSaved: '',
	notes: [],
	active: null,
	// active: {
	//     id: 'ABC123',
	//     title: '',
	//     body: '',
	//     date: 123456789,
	//     imageUrls: [] // [https://...., https://....]
	// }
};

export const journalSlice = createSlice({
	name: 'journal',
	initialState,
	reducers: {
		savingNewNote: (state) => {
			state.isSaving = true;
		},
		// Add your reducers here
		// reducers no deben ser asíncronos
		addNewEmptyNote: (state, action) => {
			state.notes.push(action.payload);
			state.isSaving = false;
		},
		setActiveNote: (state, action) => {
			state.active = action.payload;
			state.messageSaved = '';
		},
		setNotes: (state, action) => {
			state.notes = action.payload;
		},
		setSaving: (state) => {
			state.isSaving = true;
			state.messageSaved = '';
		},
		noteUpdated: (state, action) => {
			state.isSaving = false;
			state.notes = state.notes.map((note) => {
				if (note.id === action.payload.id) {
					return action.payload;
				}
				return note;
			});
			state.messageSaved = `${action.payload.title}, actualizado`;
		},
		setPhotosToActiveNote: (state, action) => {
			state.active.imageUrls = [
				...state.active.imageUrls,
				...action.payload,
			];
			state.isSaving = false;
		},
		clearNotesLogout: (state) => {
			state.isSaving = false;
			state.messageSaved = '';
			state.notes = [];
			state.active = null;
		},
		deleteNoteById: (state, action) => {
			state.active = null;
			state.notes = state.notes.filter(
				(note) => note.id !== action.payload
			);
		},
	},
});

export const {
	savingNewNote,
	addNewEmptyNote,
	setActiveNote,
	setNotes,
	setSaving,
	noteUpdated,
	setPhotosToActiveNote,
	clearNotesLogout,
	deleteNoteById,
} = journalSlice.actions;

export default journalSlice.reducer;
