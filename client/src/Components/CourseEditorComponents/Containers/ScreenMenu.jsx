import * as React from 'react';
import PropTypes from 'prop-types';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Box from '@mui/material/Box';
import 'draft-js/dist/Draft.css';
import H5PMenu from './H5PMenu.jsx';
import TextFieldMenu from './TextFieldMenu.jsx';
import PixabayTestPage from '../../../Pages/PixabayTest/PixabayTestPage.js';
import Picture from '../Buttons/PopUpButtonPicture.js'
import PictureMenu from './PictureMenu.jsx';


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
      {value === index && (
        <Box sx={{ p: 3 }}>
          {children}
        </Box>
      )}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
};

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`,
  };
}

export default function BasicTabs() {
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <div style={{ width: '65%', margin: '0 auto', alignItems: 'center' }}>
    <Box sx={{ width: '100%' }}>
      <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
        <Tabs value={value} onChange={handleChange} aria-label="basic tabs example" >
          <Tab label="Text" {...a11yProps(0)} />
          <Tab label="Bild" {...a11yProps(1)} />
          <Tab label="H5P" {...a11yProps(2)} />
        </Tabs>
      </Box>
      <TabPanel value={value} index={0}>
        <TextFieldMenu />
      </TabPanel>
      <TabPanel value={value} index={1}>
        <PixabayTestPage/>
        <PictureMenu />
      </TabPanel>
      <TabPanel value={value} index={2}>
        <H5PMenu/>
      </TabPanel>
    </Box>
    </div>
    
  );
}