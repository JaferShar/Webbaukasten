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
import AddButton from '../Components/AddButton.js';
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
import PopUpButton from '../Components/PopUpButtonText'
import '../Styling/ButtonStyling/PopUpButtonText.css'
import PopUpButtonText from '../Components/PopUpButtonText';
import '../Styling/ButtonStyling/PopUpButtonPicture.css'
import PopUpButtonPicture from '../Components/PopUpButtonPicture';
import PopUpButtonPixabay from '../Components/PopUpButtonPixabay';
import ProgressBar from '../Components/ProgressBar';
import{ useState } from 'react';
import '../Styling/SiteStyling/ProgressBar.css'





function Course () {
  return (
  <><div className="background">
      <h1 Course="header">Kurs</h1>
      
      <div className="course">

      </div>
      <div className='buttons'>
        <Buttons>AiOutlineCheckSquare</Buttons>
      </div>
            <div className="textContainer1">
        <textContainer1>
        <div className='addButton'><AddButton></AddButton></div>
          <p>.</p>
          
        </textContainer1>
      </div>
    
      <div className="mainScreen">
        <div className='addButton'><AddButton></AddButton></div>
        <div className='nextButton'><NextButton></NextButton></div>

        <mainScreen>
          
          <p>Main screen.</p>
          
          <div className="textContainer3">
        <textContainer3>
          <p>Text in screen.</p>
          <div className='addButton'><AddButton></AddButton></div>
          <div>
        <PopUpButtonText>
          
        </PopUpButtonText>
      </div>
        
        </textContainer3>
      </div>
      <div className="pictureContainer">
        <pictureContainer>
          <p>Insert picture here.</p>
          <div className='addButton'><AddButton></AddButton></div>
        </pictureContainer>
        <PopUpButtonPicture>
          
          </PopUpButtonPicture>
          
           <PopUpButtonPixabay>
          
        </PopUpButtonPixabay>
      </div>´
      <div><ProgressBar current={30} total={100}></ProgressBar></div>
        </mainScreen>
      </div>
      
    </div><div>
        <ScreenContainer>
          ...
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
