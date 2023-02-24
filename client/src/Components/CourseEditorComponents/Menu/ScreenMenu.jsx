import * as React from "react";
import PropTypes from "prop-types";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Box from "@mui/material/Box";
import "draft-js/dist/Draft.css";
import H5PMenu from "./H5PMenu.jsx";
import TextFieldMenu from "./TextFieldMenu.jsx";
import PixabayTestPage from "../../Pixabay/PixabayOpen.js";
import PictureMenu from "./PictureMenu.jsx";
import { Grid } from "@mui/material";
import { useSelector } from "react-redux";
import Alert from "@mui/material/Alert";
/**
 * This module provides a panel for the various elements.
 *
 * @param {*} props properties of the tab panel.
 * @returns a div element containing the children of the selected tab.
 */
function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && <Box sx={{ p: 3 }}>{children}</Box>}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
};

/**
 * Returns an object containing properties for accessibility on a tab and its associated tab panel.
 *
 * @param {*} index the index of the tab.
 * @return A tab pannel with the respective id.
 */
function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    "aria-controls": `simple-tabpanel-${index}`,
  };
}

/**
 *This module provides a tab menu with options for text, images and H5P.
 * The options are only available on screens with standard template.
 *
 *
 * @returns menu with text, images and H5P tabs
 */
export default function BasicTabs() {
  const screen = useSelector((state) => state.screenEditor.screen);
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <div style={{ width: "65%", margin: "0 auto", alignItems: "center" }}>
      <Box sx={{ width: "100%" }}>
        <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
          <Tabs
            value={value}
            onChange={handleChange}
            aria-label="basic tabs example"
          >
            <Tab
              label={screen.template === "Standard" ? "Text" : "Text"}
              disabled={screen.template !== "Standard"}
              {...a11yProps(0)}
            />

            <Tab
              label="Bild"
              disabled={screen.template !== "Standard"}
              {...a11yProps(1)}
            />

            <Tab
              label="H5P"
              disabled={screen.template !== "Standard"}
              {...a11yProps(2)}
            />
          </Tabs>
        </Box>
        {screen.template === "Standard" ? (
          <>
            <TabPanel value={value} index={0}>
              <TextFieldMenu />
            </TabPanel>
            <TabPanel value={value} index={1}>
              <Grid container>
                <PictureMenu />
                <Box sx={{ mr: 2 }} />
                <PixabayTestPage />
              </Grid>
            </TabPanel>
            <TabPanel value={value} index={2}>
              <H5PMenu />
            </TabPanel>
          </>
        ) : (
          <div>
            <Alert severity="info">
              {" "}
              The menu is only available on Standard Templates!
            </Alert>
          </div>
        )}
      </Box>
    </div>
  );
}
