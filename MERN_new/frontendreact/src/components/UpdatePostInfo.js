import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import '../App.css';

class UpdatePostInfo extends Component {
  constructor(props) {
    super(props);
    this.state = {
      message: '',
      title: '',
      author: '',
      description: '',
      published_date: '',
      UserName: this.props.history.location.state.UserName,
      PassWord: this.props.history.location.state.PassWord,
      userId: this.props.history.location.state.userId
    };
  }

  componentDidMount() {
    // console.log("Print id: " + this.props.match.params.id);
    axios
      .get('http://localhost:8082/api/posts/'+this.props.match.params.id)
      .then(res => {
        this.setState({
          title: res.data.title,
        })
      })
      .catch(err => {
        console.log("Error from UpdatePostInfo");
      })

  };

  //this will refresh the page
  refreshPage(){ 
    window.location.reload(); 
  }

  onChange = e => {
    this.setState({ [e.target.name]: e.target.value });
  };

  onSubmit = e => {
    e.preventDefault();
    const dateObject = new Date(Date.now());
    const date = dateObject.toLocaleString("en-US", {timeZoneName: "short"});
    //const date = Date.now();

    const message = {
        text: this.state.message,
        author: this.state.UserName,
        updated_date: date,
        Postid: this.props.match.params.id,
        Userid: this.state.userId
    }
    axios
      .post('http://localhost:8082/api/message', message)
      .then(res => {
        this.setState({
            text: '',
            author:  this.state.UserName,
            updated_date: '',
            Postid: this.props.match.params.id,  
            Userid: this.state.userId
        })
        this.props.history.push
        ({
          pathname:('/show-Post/'+this.props.match.params.id),
          state:{
              UserName: this.state.UserName,
              PassWord: this.state.PassWord,
              userId: this.state.userId
          }
        });
        //('/show-Post/'+this.props.match.params.id);
      })
      .catch(err => {
        console.log("Error in CreatePost!");
      })

    //this.refreshPage();
   };


  render() {
    return (
      <div className="UpdatePostInfo">
        <div className="container">
          
          <div className="row">
            <div className="col-md-8 m-auto">
              <br />
              <Link to={{pathname:`/show-Post/${this.props.match.params.id}`,
                         state:{UserName: this.state.UserName,
                            PassWord: this.state.PassWord,
                            userId: this.state.userId}}} className="btn btn-outline-warning float-left">
                  Back
              </Link>
            </div>
            <div className="col-md-8 m-auto">
              <h1 className="display-4 text-center">Add Comment</h1>
              <p className="lead text-center">
                  Add Message's Info
              </p>
            </div>
          </div>
        
          <div className="col-md-8 m-auto">
          
          <form noValidate onSubmit={this.onSubmit}>
            <div className='form-group'>
            <label htmlFor="author">Message</label>
              <input
                type='text'
                placeholder='Message'
                name='message'
                className='form-control'
                value={this.state.message}
                onChange={this.onChange}
              />
            </div>
            <button type="submit" className="btn btn-outline-info btn-lg btn-block">Update Message</button>
            </form>
          </div>

        </div>
      </div>
    );
  }
}

export default UpdatePostInfo;