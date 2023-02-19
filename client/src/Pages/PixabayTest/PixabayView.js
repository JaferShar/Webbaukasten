import React, { Component } from "react";
import { PropTypes } from 'prop-types';
import ImageList from '@mui/material/ImageList';
import ImageListItem from '@mui/material/ImageListItem';
import ImageListItemBar from '@mui/material/ImageListItemBar';
import ListSubheader from '@mui/material/ListSubheader';
import { PixabaySaveButton } from "./PixabaySaveButton";


class PixabayView extends Component {

 

  render() {
    let imageListContent;
    const { images } = this.props;

    if (images) {
      imageListContent = (
        <ImageList sx={{ width: 1400, height: 900 }} cols={2}>
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
                  <PixabaySaveButton/>
                }
              />
            </ImageListItem>
          ))}
        </ImageList>
      )
    } else {
      imageListContent = null;
    }
    return (
      <div>
        {imageListContent}

      </div>
    );
  }
}

PixabayView.propTypes = {
  images: PropTypes.array.isRequired
}

export default PixabayView;
