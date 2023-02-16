import react from "react";
import { useState, useEffect } from "react";
import { toast } from "react-toastify";
import {
  Box,
  Container,
  Typography,
  List,
  ListItem,
  ListItemText,
  Stack,
  TextField,
} from "@mui/material";
import EndTemplate from "../Components/CourseEditorComponents/Templates/EndTemplate";
import HeaderEditor from "../Components/HeaderEditor";
import "../Styling/SiteStyling/Test.css";

export default function Test() {
  return (
    <div className='background'>
      <HeaderEditor />
      <Screen template='standard' />
    </div>
  );
}

const Screen = ({ template }) => {
  return (
    <div>
      <Box
        className='Test'
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

const templates = {
  // welcome: (
  //   <Container maxWidth='sm'>
  //     <Typography variant='h4' align='center' gutterBottom>
  //       Welcome Template
  //     </Typography>
  //     <Typography variant='body1' align='justify'></Typography>
  //   </Container>
  // ),
  // standard: (
  //   <Container maxWidth='md'>
  //     <Typography variant='h5' align='left' gutterBottom>
  //       Standard Template
  //     </Typography>
  //     <img src='//placehold.it/500x300' alt='placeholder' />
  //     <Typography variant='body1' align='justify'></Typography>
  //   </Container>
  // ),
  standard: <ElementList />,
};

function ElementList() {
  const [elements, setElements] = useState([
    { id: 1, type: "text", data: "Hallo Ich bin ein Beispieltext" },
    {
      id: 2,
      type: "pic",
      data: "https://picsum.photos/200/300",
    },
    { id: 3, type: "h5p", data: "https://h5p.org/h5p/embed/1352034", title: "Bananen Test", height: "334" },
  ]);

  useEffect(() => {
    // Fetch elements from API
  });

  return (
    <Stack spacing={2}>
      {elements.map((element) => (
        <Element key={element.id} element={element} />
      ))}
    </Stack>
  );
}

function Element({ element }) {
  if (element.type === "text") {
    return (
      <ListItem>
        {/* <ListItemText primary={element.data} /> */}
        <TextField defaultValue={element.data} multiline="true" style={{width: '100%'}} />
      </ListItem>
    );
  } else if (element.type === "pic") {
    return (
      <div style={{ justifyContent: "center", display: "flex" }}>
        <ListItem style={{justifyContent: "center"}}>
          <img
            src={element.data}
            alt='placeholder'
            width='auto'
            height='auto'
            loading='lazy'
          />
        </ListItem>
      </div>
    );
  } else if (element.type === "h5p") {
    return (
      <ListItem>
         <iframe src={element.data} width="100%" frameborder="0" title={element.title}/>
      </ListItem>
    );
  }
}
