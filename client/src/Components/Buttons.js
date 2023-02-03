import React from 'react';
import App from '../App';
import {Link} from 'react-router-dom';
import {AiOutlineCheckSquare} from "react-icons/ai";
import {AiTwotoneHome} from "react-icons/ai";
import "../Styling/ButtonStyling/homeButton.css"
import "../Styling/ButtonStyling/saveButton.css"

function Buttons(){
    return (
    
    <div>
        <div>
            <Link to='/kursuebersicht'>
                <AiTwotoneHome className='homeButton'></AiTwotoneHome>
            </Link>
        </div>
        <div>
            <AiOutlineCheckSquare className='saveButton'></AiOutlineCheckSquare>
        </div>
        
    </div>
    
    );

}
export default Buttons;

    