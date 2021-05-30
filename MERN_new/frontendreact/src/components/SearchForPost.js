import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import '../App.css';
import axios from 'axios';

export default class SearchBox extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            testing: [],
        }
    }


onSearch = () => {
    console.log(document.getElementById("search-input").value);
    const toSearch = { query: document.getElementById("search-input").value };
    axios.post("http://localhost:8082/search", toSearch)
      .then(response => this.OnResponse(response))

  }

onResopnse = (response) => {
    let newPosts;
    if (response.data.length === undefined) {
      newPosts = [];
    } 
    this.setState({
      posts: newPosts,
      postArr: newPosts
    })
  }

    render() {
        return (
            <div>
                <form className="search-form">
                    <input
                        id="search-input"
                        type="search"
                        placeholder="Search for a title"
                    />
                    <button className="button" type="button" onClick={this.props.handleSearch}>
                        Search
                    </button>
                </form>
            </div>
        );
    }
}