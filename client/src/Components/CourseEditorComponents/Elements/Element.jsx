import { useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { ListItem, TextField } from "@mui/material";
import { updateTextField } from "../../../features/courseEditor/screenSlice";

export default function Element({ element }) {
  const screen = useSelector((state) => state.screenEditor.screen);
  const dispatch = useDispatch();

  const handleUpdateTextField = (event, element) => {
    const { value } = event.target;
    dispatch(
      updateTextField({ screen: screen, elementId: element._id, text: value })
    );
  };

  if (element.elementType === "TextField") {
    return (
      <ListItem>
        <TextField
          defaultValue={element.text}
          onChange={(event) => handleUpdateTextField(event, element)}
          multiline
          style={{ width: "100%" }}
        />
      </ListItem>
    );
  } else if (element.elementType === "Picture") {
    return (
      <div style={{ justifyContent: "center", display: "flex" }}>
        <ListItem style={{ justifyContent: "center" }}>
          <img
            src={createImageObjectUrl(element.data, element.picType)}
            alt='placeholder'
            width='auto'
            height='auto'
            loading='lazy'
          />
        </ListItem>
      </div>
    );
  } else if (element.elementType === "H5P") {
    return (
      <ListItem>
        <H5PIframe src={element.content} />
      </ListItem>
    );
  }
}

const H5PIframe = ({ src }) => {
  const iframeRef = useRef(null);

  useEffect(() => {
    if (!window.H5P) return;
    window.H5P.externalDispatcher.on("xAPI", () => {
      const iframe = iframeRef.current;
      if (!iframe) return;
      iframe.style.height = `${iframe.contentWindow.document.body.scrollHeight}px`;
    });
  }, [iframeRef]);

  return (
    <iframe
      ref={iframeRef}
      src={src}
      width='100%'
      title='H5P Content'
      frameBorder={0}
    />
  );
};

const createImageObjectUrl = (data, type) => {
  const binaryData = atob(data);
  const array = new Uint8Array(binaryData.length);
  for (let i = 0; i < binaryData.length; i++) {
    array[i] = binaryData.charCodeAt(i);
  }
  const blob = new Blob([array], { type });
  return URL.createObjectURL(blob);
};
