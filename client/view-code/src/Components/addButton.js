import React from 'react';
import App from '../App';
import {AiOutlinePlus} from "react-icons/ai";
import '../Styling/ButtonStyling/addButton.css'


function AddButton(){
    return (
    
    <div>
        <div>
            <AiOutlinePlus className='addButton'></AiOutlinePlus>
        </div>
        
    </div>
    
    );

}
export default AddButton;