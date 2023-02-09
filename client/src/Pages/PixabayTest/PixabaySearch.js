import React, { Component } from 'react';
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import axios from 'axios';
import PixabayView from './PixabayView';

class PixabaySearch extends Component {
    state = {
        searchText: '',
        amount: 15,
        apiUrl: 'https://pixabay.com/api',
        apiKey: '33449732-b16fa09defbfef09ff64fd27e',
        images: []
    }

    onTextChange = e => {
        this.setState({[e.target.name]: e.target.value}, () => {
            axios
        .get(`${this.state.apiUrl}/?key=${this.state.apiKey}&q=${this.state.searchText}&image_type=photo&per_page=${this.state.amount}&safesearch=true`)
        .then(res => this.setState({images: res.data.hits}))
        .catch(err => console.log(err))
    });
    }
    
    onAmountChange = (e, index, value) => this.setState({amount: value});

    render() {
        console.log(this.state.images);
        return (
            <div>
                <Box sx={{maxWidth: '100%',}}>
                    <TextField 
                        fullWidth
                        name='searchText'
                        id='standard-basic' 
                        label="Bilder Suche" 
                        variant="standard" 
                        value={this.state.searchText}
                        onChange={this.onTextChange}
                    />
                    <br/>
                    <Select
                        name='amount'
                        label='Anzahl Bilder'
                        value={this.state.amount}
                        onChange={this.onAmountChange} 
                    >
                        <MenuItem value={15}>15</MenuItem>
                        <MenuItem value={30}>30</MenuItem>
                        <MenuItem value={50}>50</MenuItem>
                    </Select>
                    <br/>
                    {this.state.images.length > 0 ? 
                    (<PixabayView images={this.state.images}/>) 
                    : null}
                </Box>
            </div>
        )
    }
}

export default PixabaySearch;
