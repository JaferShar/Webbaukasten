import react from "react";
import { useState, useEffect } from "react";
import { toast } from "react-toastify";
import { Box, Container, Typography, List, ListItem, ListItemText } from "@mui/material";
import EndTemplate from "../Components/CourseEditorComponents/Templates/EndTemplate";
import HeaderEditor from "../Components/HeaderEditor";
import "../Styling/SiteStyling/Test.css"

export default function Test() {
    return (
        <div className="background">
            <HeaderEditor />    
            <Screen template="end"/>
        </div>
    )
}

const Screen = ({ template }) => {
  return (
    <div>
    <Box className="Test"
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        border: "1px solid black",
      }}
    >
       {templates[template]}
    </Box>
    </div>
  );
}

const templates = {
    welcome: (
      <Container maxWidth="sm">
        <Typography variant="h4" align="center" gutterBottom>
          Welcome Template
        </Typography>
        <Typography variant="body1" align="justify">
        </Typography>
      </Container>
    ),
    standard: (
      <Container maxWidth="md">
        <Typography variant="h5" align="left" gutterBottom>
          Standard Template
        </Typography>
        <img src="//placehold.it/500x300" alt="placeholder" />
        <Typography variant="body1" align="justify">
        </Typography>
      </Container>
    ),
    end: (
      <Container maxWidth="sm">
        <Typography variant="h4" align="center" gutterBottom>
          <ElementList/>
        </Typography>
        <Typography variant="body1" align="justify">
        </Typography>
      </Container>
    ),
  };

function ElementList() {
    const [elements, setElements] = useState([{ id: 1, text: "Element 1" }, { id: 2, text: "Element 2"}]);
    
    useEffect(() => {
        // Fetch elements from API
    });
    
    return (
        <List>
            {elements.map((element) => (
                <Element key={element.id} element={element} />
            ))}
        </List>
    );
}

function Element({ element }) {
    return (
        <ListItem>
            <ListItemText primary={element.text} />
        </ListItem>
    )
}