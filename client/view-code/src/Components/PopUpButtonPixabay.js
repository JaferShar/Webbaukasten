import React from 'react';

function PopUpButtonPixabay() {
  const openNewWindow = () => {
    window.open("https://www.pixabay.com", "", "width=600,height=400");
  }

  return (
    <div>
      <button onClick={openNewWindow}>pixabay</button>
    </div>
  );
}

export default PopUpButtonPixabay;