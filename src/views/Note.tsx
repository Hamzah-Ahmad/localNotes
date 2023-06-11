import { useState, Dispatch, SetStateAction } from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { v4 as uuidv4 } from "uuid";

import CodeMirror from "react-codemirror";
import "codemirror/mode/javascript/javascript";
import "codemirror/lib/codemirror.css";
import "codemirror/theme/material.css";
import ToggleSwitch from "../components/toggle";

import { useParams } from "react-router-dom";

type NotesProps = {
  notes: Notes,
  setNotes:  Dispatch<SetStateAction<Notes>>
}
function Note({ notes, setNotes }: NotesProps) {

  const params = useParams();
  const {id} = params;
  const newNote = !id;
  const currentNote: Notes[number] | undefined = notes.find((note) => note.id === id);
  const [text, setText] = useState(currentNote?.text || "");
  const [code, setCode] = useState(currentNote?.code || "");
  const [mode, setMode] = useState<Mode>("Text");

  function createNote(data: Note) {
    setNotes([...notes, data]);
  }

  function updateNote(id: string, data: Note) {
    setNotes((prevNotes) =>
      prevNotes.map((note) => {
        if (data.id === id) {
          return data;
        } else {
          return note;
        }
      })
    );
  }
    
  function toggleMode() {
    if (mode === "Text") {
      setMode("Code");
    } else {
      setMode("Text");
    }
  }

  if (newNote && currentNote != undefined) {
    return <div>Note Not Found</div>;
  }

  return (
    <>
      <ToggleSwitch onToggle={toggleMode} isToggled={mode === "Text"} />

      {mode === "Text" ? (
        <ReactQuill
          theme="snow"
          value={text}
          onChange={setText}
          modules={{
            toolbar: [
              [{ header: [1, 2, false] }],
              ["bold", "italic", "underline", "strike", "blockquote"],
              [
                { list: "ordered" },
                { list: "bullet" },
                { indent: "-1" },
                { indent: "+1" },
              ],
              ["link", "image"],
              ["clean"],
            ],
          }}
        />
      ) : (
        <CodeMirror
          value={code}
          onChange={setCode}
          options={{
            lineWrapping: true,
            mode: "javascript",
            lineNumbers: true,
            theme: "material",
          }}
        />
      )}
      <button
        onClick={() =>
          newNote
            ? createNote({ id: uuidv4(), code, text })
            : updateNote(id, { id, code, text })
        }
      >
        Save
      </button>
    </>
  );
}

export default Note;
