import React from 'react';
import '../Styling/SiteStyling/TextContainer.css';

function TextContainer(props) {
  return (
    <div className="text-container">
      <p>{props.text}</p>
    </div>
  );
}

export default TextContainer;

