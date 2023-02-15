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

  const changeTemplate = (template) => {
    switch (template) {
      case "Begin":
        setChangeableTemplate(beginTemplate);
        break;
      case "Welcome":
        setChangeableTemplate(welcomeTemplate);
        break;
      /*case "Standard":
        setChangeableTemplate(standardTemplate);
        break;*/
      case "End":
        setChangeableTemplate(endTemplate);
        break;
      default:
        break;
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
