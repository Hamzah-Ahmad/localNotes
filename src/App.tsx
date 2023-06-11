import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./views/Home";
import useLocalStorage from "./hooks/useLocalStorage";
import { NOTES } from "./constants";
import Note from "./views/Note";

function App() {
  const [notes, setNotes] = useLocalStorage<Notes>(NOTES, []);
  
  return (
    <BrowserRouter>
      <Routes>
        <Route index element={<Home notes={notes}/>} />
        {/* Question mark at the end for optional params */}
        <Route path="/note/:id?" element={<Note  notes={notes} setNotes={setNotes} />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
