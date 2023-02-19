import React, { useState } from "react";

function PopUpButtonPicture() {
  const [selectedFile, setSelectedFile] = useState(null);
  const [previewUrl, setPreviewUrl] = useState(null);

  const handleFileChange = (event) => {
    setSelectedFile(event.target.files[0]);
    setPreviewUrl(URL.createObjectURL(event.target.files[0]));
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
       <img src={previewUrl} alt={selectedFile && selectedFile.name} width="300" height="200" />
       
    </div>
  );
}

export default PopUpButtonPicture;