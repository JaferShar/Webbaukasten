import React from 'react';
import ReactDOM from 'react-dom';
import App from '../App';
import '../Styling/SiteStyling/Course.css'
import '../Styling/SiteStyling/TextContainer.css'
import TextContainer from './TextContainer'
import ScreenContainer from '../Components/ScreenContainer'
import '../Styling/SiteStyling/ScreenContainer.css'
import Buttons from '../Components/Buttons';
import "../Styling/ButtonStyling/saveButton.css"
import "../Styling/ButtonStyling/homeButton.css"
import AddButton from '../Components/addButton';
import "../Styling/ButtonStyling/addButton.css"



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
          <p>Headline</p>
        </textContainer1>
      </div>
    
      <div className="textContainer2">
        <div className='addButton'><AddButton></AddButton></div>
        <textContainer2>
          
          <p>Screen text container</p>
        </textContainer2>
      </div>
    </div><div>
        <ScreenContainer>
          ...
        </ScreenContainer>
      </div></>
      
      )
}

export default Course;
