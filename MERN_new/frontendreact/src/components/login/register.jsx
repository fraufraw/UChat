import React from "react";
import loginImg from "../../login.svg";

export class Register extends React.Component{
    

    constructor(props){
        super(props);
    }

    render()    {
        return <div className="base-container" ref={this.props.containerRef}>
            <div className="header">Register</div>
            <div className="content">
                <div className="image">
                    <img src={loginImg} />
                </div>
                <div className="form">
                    <div className="form-group">
                        <input type="text" name="username" placeholder="username"></input>
                    </div>
                    <div className="form-group">
                        <input type="email" name="email" placeholder="email"></input>
                    </div>
                    <div className="form-group">
                        <input type="password" name="password" placeholder="password"></input>
                    </div>
                </div>
            </div>
            <div className="footer">
                <button type="button" className="btn">
                    Register
                </button>
            </div>
        </div>
        
    }

}