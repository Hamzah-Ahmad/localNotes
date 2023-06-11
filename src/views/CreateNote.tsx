import { useEffect, useState } from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { v4 as uuidv4 } from "uuid";

import CodeMirror from "react-codemirror";
import "codemirror/mode/javascript/javascript";
import "codemirror/lib/codemirror.css";
import "codemirror/theme/material.css";
import ToggleSwitch from "../components/toggle";

function CreateNote({ createNote }) {
  const [value, setValue] = useState("");
  const [title, setTitle] = useState("");
  const [code, setCode] = useState("");
  const [mode, setMode] = useState<Mode>("Text");

  function toggleMode() {
    if(mode === "Text") {
      setMode('Code');
    } else {
      setMode('Text')
    }
  }

  function save() {
    // if (!title) {
    //   alert("Please provide a title");
    //   return;
    // }
    createNote({ id: uuidv4(), title, code, text: value });
  }
  //   const debouncedValue = useDebounce(value, 500);

  //   useEffect(() => console.log(debouncedValue), [debouncedValue]);

  return (
    <>
      <ToggleSwitch onToggle={toggleMode} isToggled={mode === "Text"}/>
      {mode === "Text" ? (
        <ReactQuill theme="snow" value={value} onChange={setValue} />
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

      <button onClick={save}>Save</button>
    </>
  );
}

export default CreateNote;
