import '../Styling/SiteStyling/CourseOverview.css';
import '../Styling/ButtonStyling/LoginButton.css';

const kursifyLogo = require('./Kursify.jpg');

function CourseOverview() {
    return (
        <div>
            <h1 className="header">Kursübersicht</h1>
            <div className="login-grid">
                <img src={kursifyLogo}/>
                <button className='loginButton'>Log in</button>
            </div>
        </div>
    );
}

export default CourseOverview;