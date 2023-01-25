import React from 'react';
import ReactDOM from 'react-dom';
import App from '../App';
import '../Styling/SiteStyling/Course.css'
import '../Styling/SiteStyling/TextContainer.css'
import TextContainer from './TextContainer'


function Course () {
    return (
    <div className="background">
      <h1 Course ="header">Kurs</h1>
     <div className="course">
        <TextContainer text="Welcome to the course!" />
      </div>
    </div>)
}

export default Course;



