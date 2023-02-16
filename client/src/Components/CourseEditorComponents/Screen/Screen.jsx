import { Box } from "@mui/material";
import templates from "../Templates/Template";
import "../../../Styling/SiteStyling/Screen.css";

const Screen = ({ template }) => {
  return (
    <div>
      <Box
        className='Screen'
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "auto",
          border: "1px solid black",
          overflow: "auto",
        }}
      >
        {templates[template]}
      </Box>
    </div>
  );
};

export default Screen;
