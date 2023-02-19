import React, { Component } from "react";
import Button from "@mui/material/Button";
import { Link } from "react-router-dom";
import H5PLogo from "./H5PLogo.jpg";

const h5pWebsite = "https://h5p.org/content-types-and-applications";
export default function H5PRediction() {
  return (
    <div>
      <Button
        component={Link}
        to={h5pWebsite}
        target="_blank"
        variant="text"
        onClick={openH5P}
        size="small"
      >
        <img
          src={H5PLogo}
          alt="H5P Button"
          style={{ width: 100, height: 60 }}
        />
      </Button>
    </div>
  );
}

function openH5P() {}
