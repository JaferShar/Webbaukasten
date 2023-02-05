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
import H5PContainer from '../Components/H5PContainer';
import '../Styling/SiteStyling/H5PContainer.css'
import MultilineTextFields from '../Components/Test';

const WelcomeTemplate = () => (
      <div className="welcomeTemplate">
        <div className='addButton'>
          <AddButton />
        </div>
        <div className='nextButton'>
          <NextButton />
        </div>
          
          <div>
            <div className='test'>
              <MultilineTextFields></MultilineTextFields>
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
        <div className="h5PContainer1">
            <p>Insert h5p here.</p>
            <div className='addButton'>
              <AddButton />
            </div>
            
          </div>
          <div className="h5PContainer2">
            <p>Insert h5p here.</p>
            <div className='addButton'>
              <AddButton />
            </div>
            
          </div>
      </div>

);

export default WelcomeTemplate;
