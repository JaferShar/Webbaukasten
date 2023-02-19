import { ThemeProvider } from "@emotion/react";
import SaveIcon from "@mui/icons-material/Save";
import { Button } from "@mui/material";
import { createTheme } from '@mui/material/styles';


const theme = createTheme({
  palette: {
    neutral: {
    main: 'rgba(255, 255, 255, 0.54)'
  }
  }
});
/**
 * 
 * @returns Button
 */
export const PixabaySaveButton = () => (
  <ThemeProvider theme={theme}>
  <Button
    sx={{ borderRadius: 9 }}
    color="neutral"
    variant="contained"
    startIcon={<SaveIcon/>}
  >
    Speichern
  </Button>
  </ThemeProvider>
);