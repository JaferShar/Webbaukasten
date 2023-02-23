import { useEffect, useRef } from "react";
import { ListItem, Button } from "@mui/material";

export default function Element({ element, handleContextMenu }) {


  if (element.elementType === "TextField") {
    return (
      <ListItem>
        <p>{element.text}</p>
      </ListItem>
    );
  } else if (element.elementType === "Picture") {
    return (
      <div style={{ justifyContent: "center", display: "flex" }}>
        <ListItem style={{ justifyContent: "center" }}>
          <img
            src={element.url}
            alt='placeholder'
            width='100%'
            height='auto'
            loading='lazy'
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
