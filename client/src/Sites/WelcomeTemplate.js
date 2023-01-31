import React from 'react';
import TextContainer from './TextContainer';
import PictureContainer from '../Components/PictureContainer';
import '../Styling/SiteStyling/WelcomeTemplate.css'
import AddButton from '../Components/addButton.js';
import "../Styling/ButtonStyling/addButton.css"
import NextButton from '../Components/NextButton.js';
import "../Styling/ButtonStyling/nextButton.css"
import PopUpButtonText from '../Components/PopUpButtonText'
import '../Styling/ButtonStyling/PopUpButtonText.css'
import '../Styling/ButtonStyling/PopUpButtonPicture.css'
import PopUpButtonPicture from '../Components/PopUpButtonPicture';
import PopUpButtonPixabay from '../Components/PopUpButtonPixabay';
import ProgressBar from '../Components/ProgressBar';

const WelcomeTemplate = () => (
      <div className="welcomeTemplate">
        <div className='addButton'>
          <AddButton />
        </div>
        <div className='nextButton'>
          <NextButton />
        </div>
        <p>WelcomeScreen</p>
        <div className="textContainer">
          <div className="textContainer">
            <PopUpButtonText />
          </div>
        </div>
          <div className="picContainer">
            <p>Insert picture here.</p>
            <div className='addButton'>
              <AddButton />
            </div>
            <PopUpButtonPicture />
            <PopUpButtonPixabay />
          </div>

        <div>
          <ProgressBar current={30} total={100} />
        </div>
      </div>

);

export default WelcomeTemplate;
