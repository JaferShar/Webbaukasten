import { useState, useEffect } from "react";
import { Stack } from "@mui/material";
import Element from "./Element";
import { useDispatch, useSelector } from "react-redux";

export default function ElementList() {
  const elements = useSelector((state) => state.screenEditor.screen.elements);

  // dummy data fetch from api later
  // const [elements, setElements] = useState([
  //   { id: 1, type: "text", data: "Hallo Ich bin ein Beispieltext" },
  //   {
  //     id: 2,
  //     type: "pic",
  //     data: "https://picsum.photos/200/300",
  //   },
  //   {
  //     id: 3,
  //     type: "h5p",
  //     data: "https://h5p.org/h5p/embed/1352034",
  //     title: "Bananen Test",
  //     height: "334",
  //   },
  // ]);
  // useEffect(() => {
  //   // Fetch elements from API
  // });
  if (!elements || elements.length === 0) {
    return <Stack spacing={2} />;
  } else {
    return (
      <Stack spacing={2}>
        {elements.map((element) => (
          <Element key={element._id} element={element} />
        ))}
      </Stack>
    );
  }
}
