import { Link } from "react-router-dom";
import "./styles.css";

type NoteCardProp = {
  note: Note;
};

const NoteCard = ({ note }: NoteCardProp) => {
  return (
    <Link to={`/note/${note.id}`}>
      <div className="container" style={{ backgroundColor: "#98EECC" }}>
        <h3>{note.title}</h3>
        {note.text && <small dangerouslySetInnerHTML={{ __html: note.text }} />}
      </div>
    </Link>
  );
};

export default NoteCard;
