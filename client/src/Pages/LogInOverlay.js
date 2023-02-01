
const kursifyLogo = require('./Kursify.jpg');

//@param onClose a function that closes the LogInOverlay 
function LogInOverlay({ onClose }) {
    return (
        <div className='overlay-background'>
            <div className="login-grid">
                <img alt='Kursify Logo!' src={kursifyLogo} />
                <button className='loginButton' onClick={onClose}>Anmelden mit Google</button>
            </div>
        </div>
    );
}

export default LogInOverlay;