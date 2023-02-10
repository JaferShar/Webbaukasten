import React, { useState } from "react";
import "../../../Styling/ButtonStyling/PopUpButtonPicture.css";

function PopUpButtonPicture() {
  const [selectedFile, setSelectedFile] = useState(null);

  const handleFileChange = (event) => {
    setSelectedFile(event.target.files[0]);
  };

  return (
    <div>
      <label htmlFor="file-input" className="custom-file-upload">
        Choose File
      </label>
      <input
        id="file-input"
        type="file"
        onChange={handleFileChange}
        style={{ display: "none" }}
      />
       {selectedFile && <p>{selectedFile.name}</p>}
    </div>
  );
}

export default PopUpButtonPicture;