import React from "react";
import "../Styling/SiteStyling/Course.css";
import "../Styling/SiteStyling/TextContainer.css";
import ScreenViewer from "../Components/CourseEditorComponents/Containers/ScreenViewer";
import "../Styling/SiteStyling/ScreenViewer.css";
import Buttons from "../Components/CourseEditorComponents/Buttons/Buttons.js";
import "../Styling/ButtonStyling/saveButton.css";
import "../Styling/ButtonStyling/homeButton.css";
import "../Styling/ButtonStyling/addButton.css";
import "../Styling/ButtonStyling/nextButton.css";
import TemplateContainer from "../Components/CourseEditorComponents/Containers/TemplateContainer";
import "../Styling/SiteStyling/TemplateContainer.css";
import "../Styling/SiteStyling/PictureContainer.css";
import Menu from "../Components/CourseEditorComponents/Containers/MenuContainer";
import "../Styling/SiteStyling/Menu.css";
import "../Styling/ButtonStyling/PopUpButtonText.css";
import "../Styling/ButtonStyling/PopUpButtonPicture.css";
import { useState } from "react";
import "../Styling/SiteStyling/ProgressBar.css";
import "../Styling/SiteStyling/WelcomeTemplate.css";
import BeginTemplate from "../Components/CourseEditorComponents/Templates/BeginTemplate";
import ScreenMenu from "../Components/CourseEditorComponents/Menus/ScreenMenu";
import WelcomeTemplate from "../Components/CourseEditorComponents/Templates/WelcomeTemplate";
//import StandardTemplate from "../Components/CourseEditorComponents/Templates/StandardTemplate";
import EndTemplate from "../Components/CourseEditorComponents/Templates/EndTemplate";

const beginTemplate = (
  <div>
    <BeginTemplate></BeginTemplate>
  </div>
);

const welcomeTemplate = (
  <div>
    <WelcomeTemplate></WelcomeTemplate>
  </div>
);

/*const standardTemplate = (
  <div>
    <StandardTemplate></StandardTemplate>
  </div>
);*/

const endTemplate = (
  <div>
    <EndTemplate></EndTemplate>
  </div>
);

function Course() {
  const [changeableTemplate, setChangeableTemplate] = useState(beginTemplate);

  // you have to change the ScreenMenu now because
  // i changed the method that does not require sub classes to know the template declaration
  const changeTemplate = (template) => {
    if (template === "Welcome") {
      setChangeableTemplate(welcomeTemplate);

      <div className="course">
      <ScreenMenu changeTemplate={changeTemplate} />
    </div>
    } 
    // add standard template here
    /*else if (template == "Standard") {
      setChangeableTemplate(standardTemplate);
    }*/ else if (template === "End") {
      setChangeableTemplate(endTemplate);
    }
  };

  return (
    <>
      <div className="background">
        <h1 Course="header">Kurs</h1>

        <div className="buttons">
          <Buttons>AiOutlineCheckSquare</Buttons>
        </div>

        {changeableTemplate}
      </div>
      <div>
        <ScreenViewer changeTemplate={changeTemplate} />
        
      </div>

      <div>
        <TemplateContainer></TemplateContainer>
      </div>

      <div>
        <Menu></Menu>
      </div>
    </>
  );
}

export default Course;
