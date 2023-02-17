import React, { useState } from "react";
import "../../../Styling/ButtonStyling/addButton.css";
import NextButton from "../Buttons/NextButton.js";
import "../../../Styling/ButtonStyling/nextButton.css";
import "../../../Styling/SiteStyling/BeginTemplate.css";
import MenuBeginTemplate from "../Menus/ScreenMenu";
import PictureContainer from "../Containers/PictureContainer";
import H5PContainer from "../Containers/H5PContainer";
import TextContainer from "../Containers/TextContainer";


function StandardTemplate() {
  const [selectedOption, setSelectedOption] = useState("");
  const [insertedItems, setInsertedItems] = useState([]);

  const handleOptionSelect = (option) => {
    setSelectedOption(option);
  };

  const handleInsertItem = () => {
    if (selectedOption === "insert picture") {
      setInsertedItems([...insertedItems, <PictureContainer />]);
    } else if (selectedOption === "insert h5p") {
      setInsertedItems([...insertedItems, <H5PContainer/>]);
    } else if (selectedOption === "insert text") {
      setInsertedItems([...insertedItems, <TextContainer />]);
    }
  };

  return (
    <div>
      <select value={selectedOption} onChange={(e) => handleOptionSelect(e.target.value)}>
        <option value="">Select an option</option>
        <option value="insert picture">Insert picture</option>
        <option value="insert h5p">Insert h5p</option>
        <option value="insert text">Insert text</option>
      </select>
      <button onClick={handleInsertItem}>Insert</button>
      <div className="container">
        {insertedItems}
      </div>
      <div className="beginTemplate">
    <div className="nextButton">
      <NextButton />
    </div>
    <div>
      <MenuBeginTemplate />
    </div>
  </div>
    </div>
  );
}
export default StandardTemplate;