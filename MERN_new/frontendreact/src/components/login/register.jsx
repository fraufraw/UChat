import React, { Component } from "react";
import loginImg from "../../login.svg";
import axios from 'axios';
import { withRouter } from 'react-router-dom';
import '../../App.scss';

export class Register extends Component{
    

    constructor(props){
        super(props);
        this.state = {
            username: '',
            email: '',
            password: ''
        };
    };

    onChange = e => {
        this.setState({ [e.target.name]: e.target.value });
    };
    
    onSubmit = e => {
        e.preventDefault();
    
        const user = {
          username: this.state.username,
          email: this.state.email,
          password: this.state.password
        };

    
        axios
          .post('http://localhost:8082/api/user', user)
          .then(res => {
            this.setState({
              username: '',
              email: '',
              password: '',
            });
            console.log(res);
            this.props.history.push('/show-list');
          })
          .catch(err => {
            console.log("Error in Register!");
          })
    };

    render()    {
        return <div className="base-container" ref={this.props.containerRef}>
            <div className="header">Register</div>
                <form noValidate onSubmit={this.onSubmit}>
                    <div className="content">
                        <div className="image">
                            <img src={loginImg} />
                        </div>
                        <div className="form">
                            <div className="form-group">
                                <input 
                                    type='text'
                                    name='username' 
                                    placeholder='username'
                                    value={this.state.username}
                                    onChange={this.onChange}
                                />
                            </div>
                            <div className="form-group">
                                <input 
                                    type='email'
                                    name='email' 
                                    placeholder='email'
                                    value={this.state.email}
                                    onChange={this.onChange}
                                />
                            </div>
                            <div className="form-group">
                                <input 
                                    type='password' 
                                    name='password'  
                                    placeholder='password' 
                                    value={this.state.password}
                                    onChange={this.onChange}
                                />
                            </div>
                        </div>
                    </div>
                
                    <div className="footer">
                        <button type="submit" className="btn">
                            Register
                        </button>
                    </div>
                </form>
        </div>
        
    }

}

export default withRouter(Register);
