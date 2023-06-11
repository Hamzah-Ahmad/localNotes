import { Link } from "react-router-dom";

type HomeProps = {
  notes: Notes;
};
const Home = ({ notes }: HomeProps) => {
  console.log(notes);
  return (
    <div>
      {notes.map((note) => (
        <Link to={`/note/${note.id}`}>{note.id}</Link>
      ))}
    </div>
  );
};

export default Home;
