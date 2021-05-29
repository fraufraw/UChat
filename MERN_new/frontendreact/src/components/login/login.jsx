import React from "react";
import loginImg from "../../login.svg";
import { Router,Route,hashHistory} from 'react-router';
import { withRouter,BrowserRouter} from 'react-router-dom';
import axios from "axios";

export class Login extends React.Component{

    constructor(props){
        super(props);
        this.state = {
            username: '',
            password: '',
            loginStatus: '',
        };
    }

    onChange = e => {
        this.setState({ [e.target.name]: e.target.value });
    };

    onLogin = e => {
        e.preventDefault();

        const  user = {
            username: this.state.username,
            password: this.state.password
        }

        if (user.username === ''){
            this.setState({loginStatus: "Username and password are required. Please try again."});
            return;
        }

        axios
            .get('http://localhost:8082/api/user/'+ user.username)
            .then(res=>{
                console.log(res);
                if (user.password === ''){
                    this.setState({loginStatus: "Username and password are required. Please try again."});
                }
                else if (res.data.length <= 0 || res.data[0].password !== user.password){
                    this.setState({
                        loginStatus: 'Username or password is incorrect. Please try again.',
                    });
                }
                else{
                    this.setState({
                        username: this.state.username,
                        password: this.state.password,
                        loginStatus: '',
                    });
                    //this.props.history.push('/show-list');
                    this.props.history.push 
                    ({
                        pathname:'/show-list',
                        state:{
                            UserName: this.state.username,
                            PassWord: this.state.password,
                            userId: res.data[0]._id
                        }
                    });
                };
            })
            .catch(err => {
                console.log("Error in Login!");
                console.log(err);
            });
    }

    refreshPage(){ 
        window.location.reload(); 
    };

    render()    {
        return (<div className="base-container" ref={this.props.containerRef}>
            <div className="header">Login</div>
            <form noValidate onSubmit={this.onLogin}>
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
                    Login
                </button>
            </div>
            <br/>
            <h4 className="warning">{this.state.loginStatus}</h4>
            </form>
        </div>
        );        
    }
}
export default withRouter(Login);