
import {AiFillCheckSquare} from "react-icons/ai";
import {AiTwotoneHome} from "react-icons/ai";
import "../Styling/ButtonStyling/homeButton.css"
import "../Styling/ButtonStyling/saveButton.css"

function Buttons(){
    return (
    
    <div>
        <div>
            <AiFillCheckSquare className='saveButton'></AiFillCheckSquare>
        </div>
        <div>
            <AiTwotoneHome className='homeButton'></AiTwotoneHome>
        </div>
        
    </div>
    
    );

}
export default Buttons;

    