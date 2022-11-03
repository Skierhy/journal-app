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

const journalSlice = createSlice({
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
		},
		setNotes: (state, action) => {
			state.notes = action.payload;
		},
		setSaving: (state) => {},
		updateNote: (state, action) => {},
		deleteNoteById: (state, action) => {},
	},
});

export const {
	savingNewNote,
	addNewEmptyNote,
	setActiveNote,
	setNotes,
	setSaving,
	updateNote,
	deleteNoteById,
} = journalSlice.actions;

export default journalSlice.reducer;
