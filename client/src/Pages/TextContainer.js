import React, { useState } from "react";
import axios from "axios";
import '../Styling/SiteStyling/TextContainer.css';
import { EditorState, Editor } from 'draft-js';

const TextContainer = ({ text }) => (
  <div className="TextContainer">{text}</div>
);

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
      <TextContainer text={textContent} />
    </div>
  );
}

