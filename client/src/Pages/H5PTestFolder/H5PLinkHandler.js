import React, { Component } from 'react';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';

export default function H5PLinkHandler(props){

        return (
            <div>
                <TextField
                    fullWidth
                    name='h5p-element'
                    id='standard-basic'
                    label="H5P-Link"
                    variant="standard"
                    value={props.currString}
                    onChange={props.updateString}
                    InputProps={{
                        endAdornment:
                            <Button variant="contained" onClick={props.generateH5P}>
                                Hochladen
                            </Button>
                    }}
                />
            </div>
        )

}