import React, { Component } from "react";
import Grid from '@mui/material/Grid';
import ListItem from "@mui/material/ListItem";
import { PropTypes } from 'prop-types';
import IconButton from "@mui/material/IconButton";
import ZoomIn from '@mui/icons-material/ZoomIn'
import Dialog from '@mui/material/Dialog';

class PixabayView extends Component {
    render() {
        let imageListContent;
        const { images } = this.props;

        if (images) {
            imageListContent = (
                <Grid cols={3}>
                    {images.map(img => (
                        <ListItem
                            title={img.tags}
                            key={img.id}
                            subtitle={
                                <span>
                                    by <strong>{img.user}</strong>
                                </span>
                            }
                            actionIcon={
                                <IconButton>
                                    <ZoomIn color='white' />
                                </IconButton>
                            }
                        >
                            <img src={img.largeImageURL} alt="" />
                        </ListItem>
                    ))}
                </Grid>
            )
        } else {
            imageListContent = null;
        }
        return (
            <div>

            </div>
        );
    }
}

PixabayView.propTypes = {
    images: PropTypes.array.isRequired
}

export default PixabayView;
