import React, { useState } from "react";
import axios from "axios";
import '../Styling/SiteStyling/TextContainer.css';

function TextContainer() {
  const [text, setText] = useState("");

  const handleTextChange = (e) => {
    setText(e.target.innerText);
  };

  const handleSave = () => {
    axios
      .post("/api/save-text", { text })
      .then((res) => console.log(res.data))
      .catch((err) => console.error(err));
  };

  return (
    <div>
      <div
        contentEditable
        onInput={handleTextChange}
        style={{ width: "50vw", height: "50vh" }}
      />
      <button onClick={handleSave}>Save</button>
    </div>
  );
}

export default TextContainer;
