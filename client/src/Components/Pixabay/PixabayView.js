import React, { Component } from "react";
import { PropTypes } from "prop-types";
import ImageList from "@mui/material/ImageList";
import ImageListItem from "@mui/material/ImageListItem";
import ImageListItemBar from "@mui/material/ImageListItemBar";
import ListSubheader from "@mui/material/ListSubheader";
import PixabaySaveButton from "./PixabaySaveButton";
import Box from "@mui/material/Box";
/**
 * This component provides a list of images obtained from the Pixabay API
 * with an action button for each image to upload to Cloudinary.
 *
 * @returns component with image list and upload button for each image.
 *
 */
class PixabayView extends Component {
  render() {
    let imageListContent;
    const { images } = this.props;

    if (images) {
      imageListContent = (
        <Box style={{ overflow: "auto", width: "100%", height: "60vh" }}>
          <ImageList cols={2}>
            <ImageListItem key="Subheader" cols={2}>
              <ListSubheader component="div">Bilder</ListSubheader>
            </ImageListItem>
            {images.map((item) => (
              <ImageListItem key={item.id}>
                <img
                  src={`${item.largeImageURL}?w=248&fit=crop&auto=format`}
                  srcSet={`${item.largeImageURL}?w=248&fit=crop&auto=format&dpr=2 2x`}
                  alt={item.tags}
                  loading="lazy"
                />
                <ImageListItemBar
                  title={item.tags}
                  subtitle={item.author}
                  actionIcon={
                    <PixabaySaveButton
                      handleClose={this.props.handleClose}
                      item={item}
                    />
                  }
                />
              </ImageListItem>
            ))}
          </ImageList>
        </Box>
      );
    } else {
      imageListContent = null;
    }
    return <div>{imageListContent}</div>;
  }
}

PixabayView.propTypes = {
  images: PropTypes.array.isRequired,
};

export default PixabayView;
