import { useState, Dispatch, SetStateAction, useEffect } from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";

import { Controlled as CodeMirror } from "react-codemirror2";
import "codemirror/mode/javascript/javascript";
import "codemirror/lib/codemirror.css";
import "codemirror/theme/material.css";
import "codemirror/theme/base16-dark.css";

import ToggleSwitch from "../../components/toggle";

import "./styles.css";

type NotesProps = {
  id: string;
  notes: Notes;
  setNotes: Dispatch<SetStateAction<Notes>>;
};
const REACT_QUILL_DEFAULT = "<p><br></p>";
function Note({ id, notes, setNotes }: NotesProps) {
  const foundNote: Notes[number] | undefined = notes.find(
    (note) => note.id === id
  );

  console.log('foundNote: ', foundNote)

  const [mode, setMode] = useState<Mode>("Text");
  const [text, setText] = useState(REACT_QUILL_DEFAULT);
  const [code, setCode] = useState("");
  const [title, setTitle] = useState("");

  useEffect(() => {
    if(!title ) return
    updateNote(id, {
      id,
      title: title,
      code: code,
      text: text,
    });
  }, [title, text, code]);

  // function createNote(data: Note) {
  //   setNotes([...notes, data]);
  // }

  function updateNote(id: string, data: Note) {
    if (foundNote) {
      setNotes((prevNotes) =>
        prevNotes.map((note) => {
          if (note.id === id) {
            return data;
          } else {
            return note;
          }
        })
      );
    } else {
      setNotes([data, ...notes]);
    }
  }

  function toggleMode() {
    console.log("B");

    if (mode === "Text") {
      setMode("Code");
    } else {
      setMode("Text");
    }
  }

  useEffect(() => {
    if (foundNote) {
      setTitle(foundNote.title);
      setText(foundNote.text || REACT_QUILL_DEFAULT);
      setCode(foundNote.code || "");
    } else {
      setTitle("");
      setText(REACT_QUILL_DEFAULT);
      setCode("");
    }
  }, [foundNote]);

  return (
    <div className="note__container">
      <div className="header__container">
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target?.value)}
        />
        <div className="header__controls">
          <small className={mode == "Text" ? "active" : "null"}>Text</small>
          <ToggleSwitch onToggle={toggleMode} isToggled={mode === "Code"} />
          <small className={mode == "Code" ? "active" : "null"}>Code</small>
        </div>
      </div>

      {mode === "Text" ? (
        <ReactQuill
          theme="snow"
          value={text}
          onChange={setText}
          defaultValue={""}
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
          onBeforeChange={(_editor, _data, value) => {
            setCode(value);
          }}
          // onChange={setCode}
          options={{
            lineWrapping: true,
            mode: "javascript",
            lineNumbers: true,
            theme: "base16-dark",
          }}
        />
      )}
      {/* <button
        onClick={() =>
          newNote
            ? createNote({ id: uuidv4(), title, code, text })
            : updateNote(id, { id, title, code, text })
        }
      >
        Save
      </button> */}
    </div>
  );
}

export default Note;
