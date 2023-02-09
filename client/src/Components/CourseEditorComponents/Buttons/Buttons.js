import React from 'react';
import {Link} from 'react-router-dom';
import {AiOutlineCheckSquare} from "react-icons/ai";
import {AiTwotoneHome} from "react-icons/ai";
import "../../../Styling/ButtonStyling/saveButton.css"
import "../../../Styling/ButtonStyling/homeButton.css"
import { useParams } from 'react-router-dom';
import overviewService from '../../../features/course/overviewService';

function Buttons(){
    let { id } = useParams();
    return (
    
    <div>
        <div>
            <Link to='/kursuebersicht'>
                <AiTwotoneHome className='homeButton'></AiTwotoneHome>
            </Link>
        </div>
        <div>
            <AiOutlineCheckSquare className='saveButton' onClick={() => {
                console.log("saving")
                //let currentCourse = courses.find(course => course.id = id);
                //overviewService.updateCourse(id, currentCourse.name);
            }}></AiOutlineCheckSquare>
        </div>
        
    </div>
    
    );

}
export default Buttons;

    