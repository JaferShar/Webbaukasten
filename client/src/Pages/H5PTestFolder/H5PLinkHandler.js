import React, { Component } from "react";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import H5PRedirection from "./H5PRedirection";
import Grid from "@mui/material/Grid";

export default function H5PLinkHandler(props) {
  return (
    <div>
      <Grid container columnGap={3}>
        <TextField
          name="h5p-element"
          id="standard-basic"
          label="H5P-Link"
          variant="standard"
          value={props.currString}
          onChange={props.updateString}
          sx={{ width: "75%" }}
        />
        <Button variant="contained" onClick={props.generateH5P}>
          Hochladen
        </Button>
        <H5PRedirection />
      </Grid>
    </div>
  );
}
