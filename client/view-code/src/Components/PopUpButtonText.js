
import React from 'react';

function PopUpButtonText() {
  const openNewWindow = () => {
    window.open("https://www.google.com", "", "width=600,height=400");
  }

  return (
    <div>
      <button onClick={openNewWindow}>Open New Window</button>
    </div>
  );
}

export default PopUpButtonText;