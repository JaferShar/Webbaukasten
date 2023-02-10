import React from "react";
import "../../../Styling/ButtonStyling/addButton.css";
import NextButton from "../Buttons/NextButton.js";
import "../../../Styling/ButtonStyling/nextButton.css";
import "../../../Styling/SiteStyling/BeginTemplate.css";
import MenuBeginTemplate from "../Menus/ScreenMenu";

const BeginTemplate = () => (
  <div className="beginTemplate">
    <div className="nextButton">
      <NextButton />
    </div>
    <div>
      <MenuBeginTemplate />
    </div>
  </div>
);

export default BeginTemplate;
