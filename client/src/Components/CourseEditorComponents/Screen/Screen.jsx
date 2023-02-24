import { Box } from "@mui/material";
import templates from "./Templates/Template";
import "../../../Styling/PageStyling/Screen.css";
/**
 * This module delivers a screen based on a given template.
 *
 * @param {*} { template,The template to use for rendering the screen.}
 * @returns a screen with a template type.
 */
const Screen = ({ template }) => {
  return (
    <div>
      <Box
        className="Screen"
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "auto",
          overflow: "auto",
        }}
      >
        {templates[template]}
      </Box>
    </div>
  );
};

export default Screen;
