import React, { Component } from 'react';
import '../App.css';
import axios from 'axios';
import { Router,Route,hashHistory} from 'react-router';
import { Link,BrowserRouter} from 'react-router-dom';
import PostCard from './PostCard';

class Search extends Component {
    constructor(props) {
      super(props);
      this.state = {
        posts: [],
        keyword: '',

                
        //let the search function remember user info, so user will be allowed to visit post list
        UserName: this.props.history.location.state.UserName,
        PassWord: this.props.history.location.state.PassWord,
        userId: this.props.history.location.state.userId
      };
    }

    onChange = e => {
        this.setState({ [e.target.name]: e.target.value });
      };
    
    onSubmit = e => {
        e.preventDefault();
    

        
        const data = {
          description: this.state.keyword,
         };

    axios
      .post('http://localhost:8082/api/searchbydescription', data)
      .then(res => {
        this.setState({
          keyword: '',
          posts: res.data
        })
 //       this.props.history.push('/');
      })
      .catch(err => {
        console.log("Error in Search description!");
      })
  };


  render() {



    return (
      <div className="Search">
        <div className="container">
          <div className="row">
            <div className="col-md-8 m-auto">
              <br />
              <Link to={{pathname:"/show-list", state:{UserName: this.state.UserName,
                            PassWord: this.state.PassWord,
                            userId: this.state.userId}}} className="btn btn-outline-warning float-left">
                  Back
              </Link>
  
            </div>
            <div className="col-md-8 m-auto">
              <h1 className="display-4 text-center">Search</h1>
              <Link to={{pathname: "/searchdescription",state:{UserName: this.state.UserName,
                            PassWord: this.state.PassWord,
                            userId: this.state.userId}}} className="btn btn-outline-warning float-right">
                SEARCH BY DESCRIPTION
              </Link>  
              <Link to={{pathname: "/searchcomment",state:{UserName: this.state.UserName,
                            PassWord: this.state.PassWord,
                            userId: this.state.userId}}} className="btn btn-outline-warning float-right">
                SEARCH BY COMMENT
              </Link>      
              <Link to={{pathname: "/searchtitle",state:{UserName: this.state.UserName,
                            PassWord: this.state.PassWord,
                            userId: this.state.userId}}} className="btn btn-outline-warning float-right">
                SEARCH BY TITLE
              </Link>




          </div>
          </div>
        </div>
      </div>
    );
  }
}
export default Search;