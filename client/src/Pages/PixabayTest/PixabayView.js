import React, { Component } from "react";
import Grid from '@mui/material/Grid';
import ListItem from "@mui/material/ListItem";
import { PropTypes } from 'prop-types';
import IconButton from "@mui/material/IconButton";
import ZoomIn from '@mui/icons-material/ZoomIn'
import Dialog from '@mui/material/Dialog';
import ImageList from '@mui/material/ImageList';
import ImageListItem from '@mui/material/ImageListItem';
import ImageListItemBar from '@mui/material/ImageListItemBar';
import InfoIcon from '@mui/icons-material/Info';
import ListSubheader from '@mui/material/ListSubheader';

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
                        <IconButton
                          sx={{ color: 'rgba(255, 255, 255, 0.54)' }}
                          aria-label={`info about ${item.tags}`}
                        >
                          <InfoIcon />
                        </IconButton>
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
