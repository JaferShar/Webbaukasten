import React, { Component } from 'react';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import H5PLinkHandler from './H5PLinkHandler';


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
        <H5PLinkHandler currString={this.state.string} updateString={this.updateString} generateH5P={this.generateH5P}/>
        <div className="gatsby-resp-iframe-wrapper">
          <div className="Container" dangerouslySetInnerHTML={{ __html: this.state.h5p }}></div>
        </div>
      </div>
    )
  }
}



