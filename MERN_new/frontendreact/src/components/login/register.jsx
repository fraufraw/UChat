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
            password: '',
            registerStatus: '',
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

        if (user.username == ''){
            this.setState({registerStatus: "Username and password are required. Please try again."});
            return;
        }

    
        axios
            .get('http://localhost:8082/api/user/'+ user.username)
            .then(res=>{
                console.log(res);
                if (res.data.length > 0){
                    this.setState({registerStatus: `Username "${user.username}" has been used. Please try again.`});
                }
                else if (user.password == ''){
                    this.setState({registerStatus: "Username and password are required. Please try again."});
                }
                else{
                    axios
                        .post('http://localhost:8082/api/user', user)
                        .then(res => {
                            this.setState({
                                username: '',
                                email: '',
                                password: '',
                                registerStatus: ''
                        });
                        console.log(res);
                        this.props.history.push('/');
                        })
                        .catch(err => {
                        console.log("Error in Register!");
                    });
                    this.refreshPage();  
                };
            })
            .catch(err => {
                console.log("Error in Login!");
                console.log(err);
        });
        
    };

    refreshPage(){ 
        window.location.reload(); 
    };

    onDeleteClick() {
        axios
          .delete('http://localhost:8082/api/user')
          .then(res => {
            //this.props.history.push("/");
            console.log(res);
          })
          .catch(err => {
            console.log("Error");
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
                                    placeholder='email (optional)'
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
                    <br/>
                    <h4 className="warning">{this.state.registerStatus}</h4>
                </form>
        </div>
        
    }

}

export default withRouter(Register);
