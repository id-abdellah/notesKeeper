import { createSlice } from "@reduxjs/toolkit";

const notebooks = createSlice({
    name: "notebooks",
    initialState: {
        activeNotebook: "undefined",
        notebooks: [],
        notesPack: {}
    },
    reducers: {
        // dealing with notes
        addNotebook: (state, action) => {
            state.notebooks.push(action.payload);
            state.notesPack[action.payload.notebookID] = {
                notebookName: action.payload.name,
                notes: []
            }
        },
        addNewNote: (state, action) => {
            state.notesPack[action.payload.notebookID].notes.push(action.payload.noteData);
        },
        removingNote: (state, action) => {
            state.notesPack[action.payload.hisNotebook].notes =
                state.notesPack[action.payload.hisNotebook].notes.filter(note => note.noteID !== action.payload.noteID)
        },
        editNote: (state, action) => {
            const index = state.notesPack[action.payload.hisNotebookID].notes.findIndex(note => note.noteID === action.payload.noteID)
            state.notesPack[action.payload.hisNotebookID].notes[index].name = action.payload.changes.newName
            state.notesPack[action.payload.hisNotebookID].notes[index].content = action.payload.changes.newContent
        },
        deleteAll: (state, action) => {
            /** delete all notes */
            state.notesPack[action.payload].notes = [];
        },
        // dealing with notebooks
        setActiveNotebook: (state, action) => {
            state.activeNotebook = action.payload;
        },
        removingNotebook: (state, action) => {
            state.notebooks = state.notebooks.filter(ntb => ntb.notebookID !== action.payload)
            delete state.notesPack[action.payload];
            if (state.activeNotebook === action.payload) state.activeNotebook = "undefined"
        },
        changeNotebookTitle: (state, action) => {
            let index = state.notebooks.findIndex(n => n.notebookID === action.payload.id);
            state.notebooks[index].name = action.payload.newName;
            state.notesPack[action.payload.id].notebookName = action.payload.newName;
        }
    }
});

export const { addNotebook, setActiveNotebook, addNewNote, removingNote, removingNotebook, editNote, deleteAll, changeNotebookTitle } = notebooks.actions;
export default notebooks.reducer