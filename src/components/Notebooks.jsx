import "./notebooks.scss"
import { nanoid } from "nanoid";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faPencil, faTrash, faPlus } from "@fortawesome/free-solid-svg-icons"
import { useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addNotebook, changeNotebookTitle, removingNotebook, setActiveNotebook } from "../state/reducers/notebooks";

export default function Notebooks() {
    const [notebookName, setNotebookName] = useState("");

    const notebooksState = useSelector(state => state.notebooks);
    const dispatch = useDispatch();


    /** dialog handlers - dispatch create new notebook */

    const dialog = useRef(undefined);
    const nbNameInput = useRef(undefined);

    function dialogCreatorHandler(e) {
        if (notebookName === "") return;
        let notebookData = {
            notebookID: crypto.randomUUID(),
            notesID: nanoid(),
            name: notebookName,
        }
        dispatch(addNotebook(notebookData))

        // after dispatching => close the modal and clear the input
        dialog.current.close()
        nbNameInput.current.value = "";
        setNotebookName("")
    }

    function dialogCancelOp(e) {
        dialog.current.close();
        nbNameInput.current.value = "";
        setNotebookName("")
    }


    return (
        <div className="notebooks-wrapper">

            <div className="title">
                <p>Notebooks</p>
                <div className="add-icon" onClick={() => dialog.current.showModal()}>
                    <FontAwesomeIcon icon={faPlus} />
                </div>
            </div>

            <div className="notebooks">
                {
                    notebooksState.notebooks.map(notebook => {
                        return <NotebookStructure key={Math.random()} notebookData={notebook} />
                    })
                }
            </div>

            {/* Dialog */}
            <dialog ref={dialog}>
                <input type="text" placeholder="Enter the notebook name" ref={nbNameInput} onChange={(e) => setNotebookName(e.target.value)} />
                <div className="action">
                    <button className="cancel" onClick={() => dialogCancelOp()}>Cancel</button>
                    <button className="create" onClick={() => dialogCreatorHandler()}>Create</button>
                </div>
            </dialog>
        </div>
    )
}

function NotebookStructure({ notebookData: notebook }) {

    const activeNotebook = useSelector(state => state.notebooks.activeNotebook);
    const dispatch = useDispatch();

    function setAsActiveNotebookHandler(e) {
        let hasNotebookID = e.target.dataset.notebookid !== undefined;
        if (!hasNotebookID) return
        let notebookID = e.target.dataset.notebookid;
        dispatch(setActiveNotebook(notebookID))
    }


    function removingNotebookHandler(e) {
        const canI = confirm("u sure?");
        if (!canI) return;
        const notebookID = e.target.closest(".notebook-item").dataset.notebookid;
        dispatch(removingNotebook(notebookID))
    }

    function settingActiveClass() {
        if (notebook.notebookID === activeNotebook) return "active-notebook"
        return ""
    }

    function notebookEditName(e) {
        e.stopPropagation()
        let newNotebookName = prompt("Insert new notebook title:");
        if (!newNotebookName) return;
        const notebookID = e.target.closest(".notebook-item").dataset.notebookid;
        dispatch(changeNotebookTitle({
            id: notebookID,
            newName: newNotebookName
        }))
    }

    return (
        <div className={`notebook-item ${settingActiveClass()}`} data-notebookid={notebook.notebookID} onClick={(e) => setAsActiveNotebookHandler(e)}>
            <div className="heading" data-notebookid={notebook.notebookID}>{notebook.name}</div>
            <div className="action">
                <div className="edit" onClick={(e) => notebookEditName(e)}>
                    <FontAwesomeIcon icon={faPencil} />
                </div>
                <div className="remove" onClick={(e) => removingNotebookHandler(e)}>
                    <FontAwesomeIcon icon={faTrash} />
                </div>
            </div>
        </div>
    )
}