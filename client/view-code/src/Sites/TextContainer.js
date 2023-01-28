import React from 'react';
import '../Styling/SiteStyling/TextContainer.css';

function TextContainer(props) {
  return (
    <><div className="textContainer1">
      <p>This is some text inside the container</p>
    </div><div className="textContainer2">
        <p>This is some text inside the container</p>
      </div>
      <div className="textContainer3">
        <p>This is some text inside the container</p>
      </div>
      </>
  
  );
}

export default TextContainer;