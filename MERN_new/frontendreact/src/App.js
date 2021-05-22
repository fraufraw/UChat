import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import './App.scss';
import { Login, Register } from "./components/login/index";


import CreatePost from './components/CreatePost';
import ShowPostList from './components/ShowPostList';
import ShowPostDetails from './components/ShowPostDetails';
import UpdatePostInfo from './components/UpdatePostInfo';


class App extends React.Component {

  constructor(props){
    super(props);
    this.state={
      isLogginActive: true,
    }
  }

  componentDidMount() {
    this.rightSide.classList.add("right");
  }

  changeState(){
    const { isLogginActive } = this.state;
    if(isLogginActive) {
      this.rightSide.classList.remove("right");
      this.rightSide.classList.add("left");      
    } 
    else {
      this.rightSide.classList.remove("left");
      this.rightSide.classList.add("right"); 
    }
    this.setState(prevState => ({ isLogginActive: !prevState.isLogginActive }));
  }

  render() {
    const { isLogginActive } = this.state;
    const current = isLogginActive ? "Register" : "Login";
    const currentActive = isLogginActive ? "Login" : "Register";
    return (
      <Router>
        <div className="App">
          <div className="login">
            <div className="container">
              { isLogginActive && <Login containerRef={(ref) => this.current = ref}/> }
              {!isLogginActive && <Register containerRef={(ref) => this.current = ref}/>}
            </div>
            <RightSide 
              current={current} 
              currentActive={currentActive}
              containerRef={ref => this.rightSide = ref}
              onClick={this.changeState.bind(this)}/>
          </div>
        </div>
        <div>          
          <Route path='/show-list' component={ShowPostList} />
          <Route path='/create-Post' component={CreatePost} />
          <Route path='/edit-Post/:id' component={UpdatePostInfo} />
          <Route path='/show-Post/:id' component={ShowPostDetails} />
        </div>
      </Router>
    );
  }
}

const RightSide = props => {
  return <div className="right-side" ref={props.containerRef} onClick={props.onClick}>
   <div className="inner-container">
     <div className="text">{props.current}</div>
   </div>
  </div>
}

export default App;
