import { Typography } from '@mui/material';

function StudentEndCard() {
  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        height: '100vh',
        backgroundColor: '#4caf50',
        
      }}
    >
      <Typography variant="h1" sx={{ color: '#fff', fontWeight: 'bold', textTransform: 'uppercase', letterSpacing: 10, textAlign: 'center' }}>
        Herzlichen Glückwunsch!
      </Typography>
      <Typography variant="body1" sx={{ color: '#fff', textAlign: 'center', fontSize: 24, marginTop: 6 }}>
        Du hast den Kurs erfolgreich abgeschlossen. Wir sind unglaublich stolz auf dich!
      </Typography>
      <div style={{ marginTop: 8, position: 'relative', width: '100%', maxWidth: 600 }}>
        <img
          src="https://media.giphy.com/media/SRkctO9741bELZdoNg/giphy.gif"
          style={{
            width: '100%',
            animation: 'wiggle 2s infinite ease-in-out',
          }}
          alt="Congratulations!"
        />
       
      </div>
    </div>
  );
}

export default StudentEndCard;
