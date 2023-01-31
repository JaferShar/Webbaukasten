import React from 'react';
import ReactDOM from 'react-dom';
import App from '../App';
import '../Styling/SiteStyling/Course.css'
import '../Styling/SiteStyling/TextContainer.css'
import TextContainer from './TextContainer'
import ScreenContainer from '../Components/ScreenContainer'
import '../Styling/SiteStyling/ScreenContainer.css'
import Buttons from '../Components/Buttons.js';
import "../Styling/ButtonStyling/saveButton.css"
import "../Styling/ButtonStyling/homeButton.css"
import AddButton from '../Components/addButton.js';
import "../Styling/ButtonStyling/addButton.css"
import NextButton from '../Components/NextButton.js';
import "../Styling/ButtonStyling/nextButton.css"
import Screen from './Screen'
import TemplateContainer from '../Components/TemplateContainer'
import '../Styling/SiteStyling/TemplateContainer.css'
import PictureContainer from '../Components/PictureContainer'
import '../Styling/SiteStyling/PictureContainer.css'
import Menu from '../Components/Menu'
import '../Styling/SiteStyling/Menu.css'
import '../Styling/ButtonStyling/PopUpButtonText.css'
import PopUpButtonText from '../Components/PopUpButtonText';
import '../Styling/ButtonStyling/PopUpButtonPicture.css'
import PopUpButtonPicture from '../Components/PopUpButtonPicture';
import PopUpButtonPixabay from '../Components/PopUpButtonPixabay';
import ProgressBar from '../Components/ProgressBar';
import{ useState } from 'react';
import '../Styling/SiteStyling/ProgressBar.css'
import WelcomeTemplate from './WelcomeTemplate';
import '../Styling/SiteStyling/WelcomeTemplate.css'





function Course () {
  return (
  <><div className="background">
      <h1 Course="header">Kurs</h1>
      
      <div className="course">

      </div>
      <div className='buttons'>
        <Buttons>AiOutlineCheckSquare</Buttons>
      </div>

      <div>
        <WelcomeTemplate>

        </WelcomeTemplate>
      </div>
      
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
