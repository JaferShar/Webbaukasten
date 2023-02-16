import React, { Component } from 'react';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';


export default class H5PPage extends Component {

  state = {
    string: '',
    h5p: ''
  }

  updateString = e => this.setState({string: e.target.value})
  generateH5P = e => this.setState({h5p: this.state.string})
  




  render() {
    return (
      <div>
        <TextField
          fullWidth
          name='h5p-element'
          id='standard-basic'
          label="H5P-Link"
          variant="standard"
          value={this.state.string}
          onChange={this.updateString}
          InputProps={{
            endAdornment:
              <Button variant="contained" onClick={this.generateH5P}>
                Hochladen
              </Button>
          }}
        />
        <div className="gatsby-resp-iframe-wrapper">
          <div className="Container" dangerouslySetInnerHTML={{ __html: this.state.h5p }}></div>
        </div>
      </div>
    )
  }
}

