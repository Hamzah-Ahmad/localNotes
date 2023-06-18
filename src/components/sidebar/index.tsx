import { useEffect, useState } from "react";
import { BsCheck, BsPencilFill, BsSearch, BsTrash, BsX } from "react-icons/bs";
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
  noteId: string | null;
  deleteItem: any;
};
const Sidebar = ({
  createNewItem,
  notes,
  // filterTerm,
  selectItem,
  // setFilterTerm,
  closeSidebar,
  isCollapsed,
  noteId,
  deleteItem,
}: SidebarProps) => {
  const [filterTerm, setFilterTerm] = useState("");
  const [filteredNotes, setFilteredNotes] = useState(notes);
  const [itemToDelete, setItemToDelete] = useState<string | null>(null);

  function handleDelete(e: React.MouseEvent<HTMLButtonElement, MouseEvent>) {
    e.stopPropagation();
    deleteItem(itemToDelete);
  }

  function cancelDelete(e: React.MouseEvent<HTMLButtonElement, MouseEvent>) {
    e.stopPropagation();
    setItemToDelete(null);
  }

  function handleSettingItemToDelete(
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>,
    id: string
  ) {
    e.stopPropagation();
    setItemToDelete(id);
  }

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
        <AiOutlineClose />
      </button>

      <div className="controls">
        <div className="filter__group">
          <input
            className="filter__input"
            placeholder="Search a note by title"
            value={filterTerm}
            onChange={(e) => setFilterTerm(e.target.value)}
          />
          <BsSearch className="search__icon" />
        </div>
        <button className="create_btn" onClick={createNewItem}>
          Create <BsPencilFill />
        </button>
      </div>
      <div className="sidebar__items__list">
        {filteredNotes?.map((note) => (
          <div
            key={note.id}
            className={`sidebar__item ${note.id === noteId ? "active" : ""}`}
            onClick={() => selectItem(note.id)}
          >
            {itemToDelete === note.id ? (
              <div className="space__between align__center">
                Are you sure?
                <div className="btn__row">
                  <button onClick={cancelDelete} className="cross__btn">
                    <BsX />
                  </button>
                  <button onClick={handleDelete} className="check__btn">
                    <BsCheck />
                  </button>
                </div>
              </div>
            ) : (
              <div className="space__between align__center">
                {note.title ? note.title : <em>Enter a title</em>}
                <button
                  className="trash__btn"
                  onClick={(e) => handleSettingItemToDelete(e, note.id)}
                >
                  <BsTrash />
                </button>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Sidebar;
