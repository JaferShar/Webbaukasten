import '../Styling/SiteStyling/ProgressBar.css';
import React from 'react';
import{ useState } from 'react';


const ProgressBar = ({ current, total }) => {
  const [percent, setPercent] = useState(0);

  React.useEffect(() => {
    setPercent(current / total * 100);
  }, [current, total]);

  return (
    <div className="progress-bar-container">
      <div className="progress-bar" style={{ width: `${percent}%` }}>
        <span>{percent}%</span>
      </div>
    </div>
  );
};

export default ProgressBar;
