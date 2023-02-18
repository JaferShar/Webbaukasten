import { useEffect, useRef } from "react";
import { ListItem, TextField } from "@mui/material";

export default function Element({ element }) {
  if (element.elementType === "TextField") {
    return (
      <ListItem>
        <TextField
          label='TextField'
          defaultValue={element.text}
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
            src={createImageObjectUrl(
              element.data,
              element.picType
            )}
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
}
