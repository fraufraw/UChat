import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import '../App.css';
import axios from 'axios';

class Search extends Component {
    constructor() {
      super();
      this.state = {
        posts: [],
        keyword: '',
      };
    }

    onChange = e => {
        this.setState({ [e.target.name]: e.target.value });
      };
    
    onSubmit = e => {
        e.preventDefault();
    
        const data = {
          keyword: this.state.keyword,
    };

    axios
      .get('http://localhost:8082/api/posts', data)
      .then(res => {
        this.setState({
          keyword: '',
          posts: res.data
        })
 //       this.props.history.push('/');
      })
      .catch(err => {
        console.log("Error in Search!");
      })
  };


  render() {
    return (
      <div className="Search">
        <div className="container">
          <div className="row">
            <div className="col-md-8 m-auto">
              <br />
              <Link to="/" className="btn btn-outline-warning float-left">
                  Show BooK List
              </Link>
            </div>
            <div className="col-md-8 m-auto">
              <h1 className="display-4 text-center">Search Book</h1>

              <form noValidate onSubmit={this.onSubmit}>
                <div className='form-group'>
                  <input
                    type='text'
                    placeholder='keyword of the Book'
                    name='keyword'
                    className='form-control'
                    value={this.state.keyword}
                    onChange={this.onChange}
                  />
                </div>
                <br />



                <input
                    type="submit"
                    className="btn btn-outline-warning btn-block mt-4"
                />
              </form>
          </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Search;