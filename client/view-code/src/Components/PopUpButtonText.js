
import React from 'react';

import ReactQuill from 'react-quill';

class PopUpButtonText extends React.Component {
  state = {
    open: false,
    text: ''
  }

  handleOpen = () => {
    this.setState({ open: true });
  }

  handleClose = () => {
    this.setState({ open: false });
  }

  handleChange = (value) => {
    this.setState({ text: value });
  }

  handleSave = () => {
    // Save the text to your desired location
    this.setState({ open: false });
  }

  render() {
    return (
      <div>
        <button onClick={this.handleOpen}>Open Pop-up</button>
        {this.state.open && (
          <div className="popup-content">
            <ReactQuill value={this.state.text} onChange={this.handleChange} />
            <button onClick={this.handleSave}>Save</button>
            <button onClick={this.handleClose}>Close</button>
          </div>
        )}
      </div>
    )
  }
}

export default PopUpButtonText;