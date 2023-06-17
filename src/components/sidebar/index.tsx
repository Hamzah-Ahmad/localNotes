import { useEffect, useState } from "react";
import { BsSearch } from "react-icons/bs";
import { AiOutlineClose } from "react-icons/ai";

import "./styles.css";

type SidebarProps = {
  notes: Notes;
  selectItem: (item: string) => void;
  createNewItem: () => void;
  // filterTerm: string;
  // setFilterTerm: Dispatch<SetStateAction<string>>;
  closeSidebar: any;
  isCollapsed: any;
};
const Sidebar = ({
  createNewItem,
  notes,
  // filterTerm,
  selectItem,
  // setFilterTerm,
  closeSidebar,
  isCollapsed,
}: SidebarProps) => {
  const [filterTerm, setFilterTerm] = useState("");
  const [filteredNotes, setFilteredNotes] = useState(notes);

  useEffect(() => {
    if (!filterTerm) {
      setFilteredNotes(notes);
    } else {
      setFilteredNotes(
        notes.filter((note) =>
          note.title.toLowerCase().includes(filterTerm.toLocaleLowerCase())
        )
      );
    }
  }, [filterTerm, notes]);

  return (
    <div className={`sidebar ${isCollapsed && "collapsed"}`}>
      <button className="close__btn" onClick={closeSidebar}>
        <AiOutlineClose/>
      </button>

      <div className="controls">
        <div className="filter__group">
          <input
            className="filter__input"
            placeholder="Search a note here"
            value={filterTerm}
            onChange={(e) => setFilterTerm(e.target.value)}
          />
          <BsSearch className="search__icon"/>
        </div>
        <button className="create_btn" onClick={createNewItem}>
          Create
        </button>
      </div>
      {filteredNotes?.map((note) => (
        <div
          key={note.id}
          className="sidebar__item"
          onClick={() => selectItem(note.id)}
        >
          {note.title ? note.title : <em>Type title</em>} 
        </div>
      ))}
    </div>
  );
};

export default Sidebar;
