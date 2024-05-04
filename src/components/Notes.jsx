import "./notes.scss"
import { faBookOpen, faPlus, faXmark } from "@fortawesome/free-solid-svg-icons";
import { faNoteSticky } from "@fortawesome/free-regular-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addNewNote, deleteAll } from "../state/reducers/notebooks";
import NotesStructure from "./NoteStructure";
import { nanoid } from "nanoid";

export default function Notes() {
    const [noteName, setNoteName] = useState("");
    const [noteContent, setNoteContent] = useState("");

    // redux state
    const activeNotebook = useSelector(state => state.notebooks.activeNotebook);
    const notesPackState = useSelector(state => state.notebooks.notesPack);
    const dispatch = useDispatch();

    let isTherActiveNotebook = activeNotebook !== "undefined";

    // some references
    const dialog = useRef(null);
    const noteName_Input = useRef(null);
    const noteContent_Textarea = useRef(null);

    /**
     * when clicking on "save" to create new note
     * it dispatch "addNewNote" action with note object
     * this note object contains the notebookID of the current activate notebook
     *  and noteData which contains name, content, created date
     * then finally it call "dialogeClosingHanlder" function wich clears inputs and closing the dialoge
     */
    function createNoteHandler() {
        if (noteName === "" || noteContent === "") return;
        const currentDate = new Date();

        let note = {
            notebookID: activeNotebook,
            noteData: {
                name: noteName,
                noteID: nanoid(),
                hisNotebook: activeNotebook,
                content: noteContent,
                createdAt: {
                    date: `${currentDate.getDate() < 10 ? "0" + currentDate.getDate() : currentDate.getDate()}/${currentDate.getMonth() < 10 ? "0" + currentDate.getMonth() : currentDate.getMonth()}/${currentDate.getFullYear()}`,
                    time: `${currentDate.getHours()}:${currentDate.getMinutes()}`
                }
            }
        }
        dispatch(addNewNote(note));
        dialogeClosingHandler()
    }

    function dialogeClosingHandler() {
        dialog.current.close();
        noteName_Input.current.value = "";
        noteContent_Textarea.current.value = "";
        setNoteContent("");
        setNoteName("")
    }


    function deleteAllNotes() {
        let canI = confirm("you sure you wann delete all notes?");
        if (!canI) return;
        dispatch(deleteAll(activeNotebook))
    }

    return (
        <div className="notes-section">
            {
                isTherActiveNotebook
                    ?
                    <>
                        <div className="heading-addnew">
                            <div className="notebook-name">{notesPackState[activeNotebook].notebookName}</div>
                            <div className="add-new-note" onClick={() => dialog.current.showModal()}>
                                <FontAwesomeIcon icon={faPlus} />
                                <p>Add note</p>
                            </div>
                        </div>
                        {
                            notesPackState[activeNotebook].notes.length === 0
                                ?
                                <NoNotes />
                                :
                                <>
                                    <div className="delete-all-notes" onClick={(e) => deleteAllNotes()}>Delete all</div>
                                    <div className="notes-wrapper">
                                        {
                                            notesPackState[activeNotebook].notes.map(noteObj => {
                                                return <NotesStructure key={Math.random()} noteData={noteObj} />
                                            })
                                        }
                                    </div>
                                </>

                        }
                    </>
                    :
                    <ChooseNotebookOrCreateNewOne />
            }

            <dialog ref={dialog}>
                <div className="wrapper">
                    <input ref={noteName_Input} placeholder="Note title" type="text" className="note-name" onChange={(e) => setNoteName(e.target.value)} />
                    <textarea ref={noteContent_Textarea} placeholder="What are you thinking about ..." className="note-content" onChange={(e) => setNoteContent(e.target.value)} onKeyDown={(e) => insertingTabCharacter(e)}></textarea>
                    <button onClick={() => createNoteHandler()}>Save</button>
                    <button className="close" onClick={() => dialogeClosingHandler()}><FontAwesomeIcon icon={faXmark} /></button>
                </div>
            </dialog>
        </div>
    )
}

// to insert tab indentation when pressing "Tab key" on textarea

export function insertingTabCharacter(e) {
    if (e.key === "Tab") {
        e.preventDefault()

        const textarea = e.currentTarget;
        const { value, selectionStart, selectionEnd } = textarea;
        // Insert tab character
        textarea.value = `${value.substring(0, selectionEnd)}\t${value.substring(selectionEnd)}`;
        // Move cursor to new position
        textarea.selectionStart = textarea.selectionEnd = selectionEnd + 1;
    }
}


// if there is no active notebook yet or there is no notebook created
function ChooseNotebookOrCreateNewOne() {
    return (
        <div className="choose-notebook">
            <div className="wrapper">
                <div>
                    <FontAwesomeIcon icon={faBookOpen} />
                </div>
                <p>Choose notebook / Create new one</p>
            </div>
        </div>
    )
}

// if the notebook does not contains any notes
function NoNotes() {
    return (
        <div className="no-notes">
            <div><FontAwesomeIcon icon={faNoteSticky} /></div>
            <p>Add some notes</p>
        </div>
    )
}