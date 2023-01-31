import React, { useEffect, useState } from "react";
import { Editor } from "react-draft-wysiwyg";
import { EditorState } from "draft-js";
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import { withTheme } from "@emotion/react";



export default function PopUpButtonText() {
  const [showEditor, setShowEditor] = useState(false);
  const [editorState, setEditorState] = useState(() =>
    EditorState.createEmpty()
  );
  const [textContent, setTextContent] = useState('');

  const handleSave = () => {
    setTextContent(
      editorState.getCurrentContent().getPlainText()
    );
  };

  return (
    <div>
      <button onClick={() => setShowEditor(!showEditor)}>
        Editor
      </button>
      {showEditor && (
        <div style={{ border: "1px solid black", padding: '2px', minHeight: '200px'}}>
          <Editor
            editorState={editorState}
            onEditorStateChange={setEditorState}
          />
          <button onClick={handleSave}>Save</button>
        </div>
      )}
      <div>{textContent}</div>
    </div>
  );
}
