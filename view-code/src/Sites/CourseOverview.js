import '../Styling/SiteStyling/CourseOverview.css';
import '../Styling/ButtonStyling/LoginButton.css';
import React, { useState } from 'react';
import LogInOverlay from './LogInOverlay';




function CourseOverview() {
    //Controls the Overlay Appearance State
    //The state must be false so that when the CourseOverview site is reloaded the overlay reappears
    const [isOpen, setIsOpen] = useState(false);

    //As a prototype, when the "Log In" button is pressed the Overlay will disappear
    //This behaviour will be changed when GoogleAccountManager is set up
    const toggleOverlay = () => { 
        setIsOpen(!isOpen);
    }

    return (
        <div>
            <h1 className="header">Kursübersicht</h1>
            {!isOpen && (
            <LogInOverlay onClose={toggleOverlay}/>
            )}
        </div>
    );
}

export default CourseOverview;