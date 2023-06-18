import Sidebar from "../../components/Sidebar";
import { Dispatch, SetStateAction, useState } from "react";
import { v4 as uuidv4 } from "uuid";
import { GiHamburgerMenu } from "react-icons/gi";

import Note from "../Note";

import "./styles.css";

type HomeProps = {
  notes: Notes;
  setNotes: Dispatch<SetStateAction<Notes>>;
};
const Home = ({ notes, setNotes }: HomeProps) => {
  const [noteId, setNoteId] = useState<string | null>(
    () => notes[0]?.id || null
  );
  const [collapseSidebar, setCollapseSidebar] = useState(false);

  function selectItem(id: string) {
    setCollapseSidebar(true);
    setNoteId(id);
  }
  function deleteItem(id: string) {
    if (noteId === id) {
      let selectedNote = notes.findIndex((note) => note.id === id);
      if (selectedNote === notes.length - 1) {
        setNoteId(notes[selectedNote - 1]?.id);
      } else {
        setNoteId(notes[selectedNote + 1]?.id);
      }
    }
    setNotes((prev) => prev.filter((note) => note.id !== id));
  }

  function createNewNote() {
    setNoteId(uuidv4());
  }

  function openSidebar() {
    setCollapseSidebar(false);
  }

  function closeSidebar() {
    setCollapseSidebar(true);
  }

  return (
    <div className={`page__container`}>
      <Sidebar
        notes={notes}
        selectItem={selectItem}
        deleteItem={deleteItem}
        createNewItem={createNewNote}
        closeSidebar={closeSidebar}
        isCollapsed={collapseSidebar}
        noteId={noteId}
      />

      <div className="note__section">
        <button onClick={openSidebar} className="open__btn">
          <GiHamburgerMenu />
        </button>

        {noteId ? (
          <Note id={noteId} notes={notes} setNotes={setNotes} />
        ) : (
          <div className="intro__section">
            <div className="title">Welcome to LocalNotes!</div>
            <div className="subtitle">Click the <strong>Create</strong> button on the sidebar to create your first note</div>
            <div className="subtitle">All notes are saved automatically to your borwser's storage</div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Home;
