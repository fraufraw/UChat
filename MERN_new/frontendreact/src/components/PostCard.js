import React from 'react';
import { Link, withRouter } from 'react-router-dom';
import '../App.css';

const PostCard = (props) => {
    const  post  = props.post;
    let  UserName = props.UserName;
    let  PassWord = props.PassWord;
    let  userId = props.userId;

    return(
        <div className="card-container">
            <img src="https://images.squarespace-cdn.com/content/v1/5994d06915d5db843587ce50/1552451693608-VNZZIB2N5ZZYSJFB14E7/ke17ZwdGBToddI8pDm48kGo5Daev-aKfQad9v7W71s5Zw-zPPgdn4jUwVcJE1ZvWQUxwkmyExglNqGp0IvTJZUJFbgE-7XRK3dMEBRBhUpxEeuh4HT0lRwHeqi1ArsyT3PDojnH69rr8U5DMveYP6UP7Dflkp604z4a5mlrjvt4/post.jpg?format=1000w"  alt="" />
            <div className="desc">
                <h2>
                    <Link to={{pathname:`/show-Post/${post._id}`,state:{UserName: UserName,
                            PassWord: PassWord,
                            userId: userId} }}>
                        { post.title }
                    </Link>
                </h2>
                <h3>{post.author}</h3>
                <h4>Liked: {post.Liked_number}</h4>
                <p>{post.description}</p>
            </div>
        </div>
    )
};

export default PostCard;