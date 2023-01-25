import React from 'react';
import ReactDOM from 'react-dom';
import App from '../App';
import '../Styling/SiteStyling/Course.css'
import '../Styling/SiteStyling/TextContainer.css'
import TextContainer from './TextContainer'
import ScreenContainer from '../Components/ScreenContainer'
import '../Styling/SiteStyling/ScreenContainer.css'




function Course () {
  return (
  <><div className="background">
      <h1 Course="header">Kurs</h1>
      <div className="course">
      </div>
      <div className="textContainer1">
                  <textContainer text="Text for container 1"  />
                </div>
                <div className="textContainer2">
                  <textContainer text="Text for container 2"  />
                </div>
    </div><div>
        <ScreenContainer>
        
        </ScreenContainer>
      </div></>)
}

export default Course;