import React from 'react';
import AddButton from '../Components/addButton.js';
import "../Styling/ButtonStyling/addButton.css"
import NextButton from '../Components/NextButton.js';
import "../Styling/ButtonStyling/nextButton.css"
import "../Styling/SiteStyling/BeginTemplate.css";
import MenuListComposition from "./MenuBeginTemplate";
import MenuBeginTemplate from './MenuBeginTemplate';


const BeginTemplate = () => (
      <div className="beginTemplate">
        
        <div className='nextButton'>
          <NextButton />
        </div>
        <div>
            <MenuBeginTemplate />
        </div>
          
  
      
      </div>

);

export default BeginTemplate;


