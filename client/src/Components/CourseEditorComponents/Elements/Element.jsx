import { useEffect, useRef } from "react";
import { ListItem, TextField } from "@mui/material";

export default function Element({ element }) {
  if (element.type === "text") {
    return (
      <ListItem>
        <TextField
          label='Multiline TextField'
          defaultValue={element.data}
          multiline
          style={{ width: "100%" }}
        />
      </ListItem>
    );
  } else if (element.type === "pic") {
    return (
      <div style={{ justifyContent: "center", display: "flex" }}>
        <ListItem style={{ justifyContent: "center" }}>
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
        <H5PIframe src={element.data} />
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
