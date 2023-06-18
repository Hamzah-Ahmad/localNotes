import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./views/Home";
import useLocalStorage from "./hooks/useLocalStorage";
import { NOTES } from "./constants";

function App() {
  const [notes, setNotes] = useLocalStorage<Notes>(NOTES, []);

  return (
    <BrowserRouter>
      <Routes>
        <Route index element={<Home notes={notes} setNotes={setNotes} />} />
        {/* <Route
          path="/note/:id?"
          element={<Note notes={notes} setNotes={setNotes} />}
        /> */}
      </Routes>
    </BrowserRouter>
  );
}

export default App;
