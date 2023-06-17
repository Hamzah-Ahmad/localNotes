import Sidebar from "../../components/Sidebar";
import { Dispatch, SetStateAction, useEffect, useState } from "react";
import { v4 as uuidv4 } from "uuid";
import { GiHamburgerMenu } from "react-icons/gi";


import Note from "../Note";

import "./styles.css";

type HomeProps = {
  notes: Notes;
  setNotes: Dispatch<SetStateAction<Notes>>;
};
const Home = ({ notes, setNotes }: HomeProps) => {
  const [noteId, setNoteId] = useState<string | null>(null);
  const [collapseSidebar, setCollapseSidebar] = useState(false);

  function selectItem(id: string) {
    setCollapseSidebar(true)
    setNoteId(id);
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
        createNewItem={createNewNote}
        closeSidebar={closeSidebar}
        isCollapsed={collapseSidebar}
      />

      <div className="note__section">
        <button onClick={openSidebar} className="open__btn"><GiHamburgerMenu /></button>

        {noteId ? <Note id={noteId} notes={notes} setNotes={setNotes} /> : null}
      </div>
    </div>
  );
};

export default Home;
