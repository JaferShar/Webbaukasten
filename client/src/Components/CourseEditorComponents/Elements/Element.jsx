import { useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { ListItem, TextField, Button } from "@mui/material";
import { updateTextField } from "../../../features/courseEditor/screenSlice";

/**
 * This module implements an element in the screen editor.
 *
 * @param {*} {
 *   element,  The element to be provided.
 *   handleContextMenu, Function to handle right-click context menu.
 * }
 * @returns A text, image or H5P element.
 */
export default function Element({ element, handleContextMenu }) {
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
          label="Text"
          onChange={(event) => handleUpdateTextField(event, element)}
          value={element.text}
          multiline
          style={{ width: "100%", cursor: "context-menu" }}
          onContextMenu={(event) => {
            handleContextMenu(event, element._id);
          }}
        />
      </ListItem>
    );
  } else if (element.elementType === "Picture") {
    return (
      <div style={{ justifyContent: "center", display: "flex" }}>
        <ListItem style={{ justifyContent: "center" }}>
          <img
            src={element.url}
            alt="placeholder"
            width="100%"
            height="auto"
            loading="lazy"
            style={{ cursor: "context-menu" }}
            onContextMenu={(event) => {
              handleContextMenu(event, element._id);
            }}
          />
        </ListItem>
      </div>
    );
  } else if (element.elementType === "H5P") {
    return (
      <ListItem
        style={{
          position: "relative",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          flexDirection: "column",
        }}
      >
        <H5PIframe src={element.content} />
        <Button
          sx={{ color: "black" }}
          onClick={(event) => {
            handleContextMenu(event, element._id);
          }}
        >
          Context Menu
        </Button>
      </ListItem>
    );
  }
}

/**
 * This module implements an iframe for H5P content which scales to the content.
 * @param {*} src The source of the H5P content. 
 * @returns an iframe for H5P content.
 */
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
      width="100%"
      title="H5P Content"
      frameBorder={0}
    />
  );
};
