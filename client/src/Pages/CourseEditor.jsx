import React from 'react';
import '../Styling/SiteStyling/Course.css'
import '../Styling/SiteStyling/TextContainer.css'
import ScreenContainer from '../Components/CourseEditorComponents/Containers/ScreenViewer'
import '../Styling/SiteStyling/ScreenContainer.css'
import Buttons from '../Components/CourseEditorComponents/Buttons/Buttons.js';
import "../Styling/ButtonStyling/saveButton.css"
import "../Styling/ButtonStyling/homeButton.css"
import "../Styling/ButtonStyling/addButton.css"
import "../Styling/ButtonStyling/nextButton.css"
import TemplateContainer from '../Components/CourseEditorComponents/Containers/TemplateContainer'
import '../Styling/SiteStyling/TemplateContainer.css'
import '../Styling/SiteStyling/PictureContainer.css'
import Menu from '../Components/CourseEditorComponents/Containers/MenuContainer'
import '../Styling/SiteStyling/Menu.css'
import '../Styling/ButtonStyling/PopUpButtonText.css'
import '../Styling/ButtonStyling/PopUpButtonPicture.css'
import { useState } from 'react';
import '../Styling/SiteStyling/ProgressBar.css'
import '../Styling/SiteStyling/WelcomeTemplate.css'
import BeginTemplate from '../Components/CourseEditorComponents/Templates/BeginTemplate';
import MenuBeginTemplate from '../Components/CourseEditorComponents/Menus/ScreenMenu';





const beginTemplate = <div>
  <BeginTemplate>

  </BeginTemplate>
</div>;

function Course () {
  const [changeableTemplate, setChangeableTemplate] = useState(beginTemplate);

  const changeTemplate = (template) => {
    setChangeableTemplate(template);
  }

  return (
  <><div className="background">
      <h1 Course="header">Kurs</h1>
      
      <div className="course">
      <MenuBeginTemplate changeTemplate={changeTemplate}/>
      </div>
      <div className='buttons'>
        <Buttons>AiOutlineCheckSquare</Buttons>
      </div>

      {changeableTemplate}
      
    </div><div>
        <ScreenContainer>

        </ScreenContainer>
      </div>
      
      <div>
        <TemplateContainer>
        </TemplateContainer>
      </div>
      
      <div>
        <Menu>
        </Menu>
      </div>
      </>
      
      )
}

export default Course;
