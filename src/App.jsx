
import "./app.scss"
import { useDispatch, useSelector } from "react-redux";
import Greeting from "./components/Greeting";
import { useRef } from "react";
import Notebooks from "./components/Notebooks";
import Notes from "./components/Notes";

export default function App() {

  const notebooks = useSelector(state => state.notebooks);
  const dispatch = useDispatch();

  const navRef = useRef(null);

  return (
    <div className="app">

      <nav ref={navRef}>
        <h2 className="app-name">NoteKeeper</h2>
        <Notebooks />
      </nav>

      <main>
        <Greeting nav={navRef} />
        <Notes />
      </main>

    </div>
  )
}