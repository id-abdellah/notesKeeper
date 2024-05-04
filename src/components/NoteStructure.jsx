import { faTrash, faXmark } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useDispatch } from "react-redux";
import { editNote, removingNote } from "../state/reducers/notebooks";
import { useEffect, useRef, useState } from "react";
import { insertingTabCharacter } from "./Notes";

export default function NotesStructure({ noteData }) {
    const dispatch = useDispatch();

    /** removing note */
    function removingNoteHandler(e) {
        e.stopPropagation()
        const noteID = e.target.closest(".note-item").dataset.currentnoteid;
        const hisNotebookID = e.target.closest(".note-item").dataset.hisnotebook;
        const canI = confirm("are you sure?");
        if (!canI) return;
        dispatch(removingNote({
            noteID,
            hisNotebook: hisNotebookID
        }))
    }

    /** dealing with dialog */
    const noteDialog = useRef(null);
    const nameInput = useRef(null);
    const contentAre = useRef(null);

    function showingNoteDialog() {
        noteDialog.current.showModal()
    }
    function closingDialog(e) {
        e.stopPropagation()
        noteDialog.current.close()
    }

    /** Dealing with updating content */
    function saveChanges(e) {
        const noteID = e.target.closest(".note-item").dataset.currentnoteid;
        const hisNotebookID = e.target.closest(".note-item").dataset.hisnotebook;

        const editedNote = {
            noteID,
            hisNotebookID,
            changes: {
                newName: nameInput.current.value,
                newContent: contentAre.current.value
            }
        };

        dispatch(editNote(editedNote))
    }

    return (
        <div className="note-item" data-currentnoteid={noteData.noteID} data-hisnotebook={noteData.hisNotebook} onClick={(e) => showingNoteDialog(e, noteData)}>
            <div className="note-name">{noteData.name}</div>
            <div className="note-content">{noteData.content}</div>
            <div className="creation-date">
                {noteData.createdAt.date} - {noteData.createdAt.time}
            </div>
            <div className="delete-note" onClick={(e) => removingNoteHandler(e)}><FontAwesomeIcon icon={faTrash} /></div>

            {/* current note dialog */}
            <dialog className="dialog-note-item" ref={noteDialog}>
                <div className="wrapper">
                    <input ref={nameInput} type="text" className="dialog-note-name" defaultValue={noteData.name} />
                    <textarea ref={contentAre} onKeyDown={(e) => insertingTabCharacter(e)} className="dialog-note-content" defaultValue={noteData.content} ></textarea>
                    <div className="date-save">
                        <div className="dialog-creation-date">{noteData.createdAt.date} - {noteData.createdAt.time}</div>
                        <button className="save-changes" onClick={(e) => saveChanges(e)}>Save</button>
                    </div>
                    <div className="closing-dialog" onClick={(e) => closingDialog(e)}>
                        <FontAwesomeIcon icon={faXmark} />
                    </div>
                </div>
            </dialog>
        </div>
    )
}