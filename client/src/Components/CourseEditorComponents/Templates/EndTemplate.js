import React from 'react';
import AddButton from '../Buttons/addButton.js';
import "../../../Styling/ButtonStyling/addButton.css"
import NextButton from '../Buttons/NextButton.js';
import "../../../Styling/ButtonStyling/nextButton.css"
import PopUpButtonText from '../Buttons/PopUpButtonText'
import '../../../Styling/ButtonStyling/PopUpButtonText.css'
import '../../../Styling/ButtonStyling/PopUpButtonPicture.css'
import ProgressBar from '../FixComponents/ProgressBar';
import '../../../Styling/SiteStyling/H5PContainer.css'
import MultilineTextFields from '../FixComponents/Test';

const EndTemplate = () => (
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
 
          

        <div>
          <ProgressBar current={30} total={100} />
        </div>
        
          <div className="h5PContainer2">
            <p>Insert h5p here.</p>
            <div className='addButton'>
              <AddButton />
            </div>
            
          </div>
      </div>

);

export default EndTemplate;
