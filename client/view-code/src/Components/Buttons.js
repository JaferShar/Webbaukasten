import React from 'react';
import App from '../App';
import {AiOutlineCheckSquare} from "react-icons/ai";
import {AiTwotoneHome} from "react-icons/ai";
import "../Styling/ButtonStyling/homeButton.css"
import "../Styling/ButtonStyling/saveButton.css"

function Buttons(){
    return (
    
    <div>
        <div>
            <AiOutlineCheckSquare className='saveButton'></AiOutlineCheckSquare>
        </div>
        <div>
            <AiTwotoneHome className='homeButton'></AiTwotoneHome>
        </div>
        
    </div>
    
    );

}
export default Buttons;

    