import React, { Component } from "react";
import TextField from "@mui/material/TextField";
import Box from "@mui/material/Box";
import axios from "axios";
import PixabayView from "./PixabayView";

class PixabaySearch extends Component {
  state = {
    searchText: "",
    amount: 20,
    apiUrl: "https://pixabay.com/api",
    apiKey: "33449732-b16fa09defbfef09ff64fd27e",
    images: [],
  };

  onTextChange = (e) => {
    const val = e.target.value;
    this.setState({ [e.target.name]: e.target.value }, () => {
      if (val === "") {
        this.setState({ images: [] });
      } else {
        axios
          .get(
            `${this.state.apiUrl}/?key=${this.state.apiKey}&q=${this.state.searchText}&image_type=photo&per_page=${this.state.amount}&safesearch=true`
          )
          .then((res) => this.setState({ images: res.data.hits }))
          .catch((err) => console.log(err));
      }
    });
  };

  onAmountChange = (e, index, value) => this.setState({ amount: value });

  render() {
    return (
      <div>
        <Box sx={{ maxWidth: "100%" }}>
          <TextField
            fullWidth
            name="searchText"
            id="standard-basic"
            label="Bilder Suche"
            variant="standard"
            value={this.state.searchText}
            onChange={this.onTextChange}
          />
          <br />
          {this.state.images.length > 0 ? (
            <PixabayView images={this.state.images}
            handleClose={this.props.handleClose}/>
          ) : null}
        </Box>
      </div>
    );
  }
}

export default PixabaySearch;
