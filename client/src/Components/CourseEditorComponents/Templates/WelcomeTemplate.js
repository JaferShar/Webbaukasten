import React from "react";
import "../../../Styling/SiteStyling/WelcomeTemplate.css";
import AddButton from "../Buttons/addButton.js";
import "../../../Styling/ButtonStyling/addButton.css";
import NextButton from "../Buttons/NextButton.js";
import "../../../Styling/ButtonStyling/nextButton.css";
import PopUpButtonText from "../Buttons/PopUpButtonText";
import "../../../Styling/ButtonStyling/PopUpButtonText.css";
import "../../../Styling/ButtonStyling/PopUpButtonPicture.css";
import PopUpButtonPicture from "../Buttons/PopUpButtonPicture";
import PopUpButtonPixabay from "../Buttons/PopUpButtonPixabay";
import ProgressBar from "../FixComponents/ProgressBar";
import "../../../Styling/SiteStyling/H5PContainer.css";
import MultilineTextFields from "../FixComponents/Test";

const WelcomeTemplate = ({ changeTemplate }) => {
  return (
    <>
      <div className="welcomeTemplate">
        <h5 className="h5P">Welcome Page</h5>

        <div className="popup">
          <PopUpButtonText />
          <PopUpButtonPicture />
          <PopUpButtonPixabay />
        </div>

        <div className="buttons">
          <AddButton />
        </div>

        <div className="next">
          <NextButton changeTemplate={changeTemplate} />
        </div>

        <div className="progress">
          <ProgressBar />
        </div>

        <div className="text">
          <MultilineTextFields />
        </div>
      </div>
    </>
  );
};

export default WelcomeTemplate;
