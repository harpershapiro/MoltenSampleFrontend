import "bootstrap/dist/css/bootstrap.min.css";
import './App.css';
import React, {Component, useContext} from 'react';
import { BrowserRouter as Router, Route, Link} from "react-router-dom";

//import ""
import {hasRole, isAuth,loginUser} from "./auth.js"
import {userContext} from "./userContext.js"
import logo from "./images/logo_test.png"
import logotext from "./images/moltensampleimprinttext.png"

//Main Components
import Home from "./components/home.component.js";
import SubmitPage from "./components/submitPage.component.js";
import SubmissionList from "./components/submissionList.component.js";
import About from "./components/about.component.js";
import AuthForm from "./components/authform.component.js";


class App extends Component {
  constructor(props){
    super(props);
    //console.log(JSON.stringify(localStorage.getItem('user')));
    var lastUser = localStorage.getItem('user') ? JSON.parse(localStorage.getItem('user')) : undefined
    //this.setState({user: lastUser});

    //Currently logged in user
    this.state = {
      user: lastUser
    }

    this.loginUser=this.loginUser.bind(this);
    this.logoutUser=this.logoutUser.bind(this);

  }

  componentDidMount(){
    //return last user to their session
    // var lastUser = localStorage.getItem('user') ? localStorage.getItem('user') : undefined
    // this.setState({user: lastUser});
  }

  loginUser(user){
    this.setState({user: user});
    localStorage.setItem('user', JSON.stringify(user))
    console.log(JSON.stringify(this.state.user));
    //console.log(`Username: ${user.username} Password: ${user.password}`)
    //this.props.history.push('/')
  }

  logoutUser(){
    this.setState({user: undefined});
  }

  render() {
    return(
      
      <Router>
        <div>
        <link href="https://fonts.googleapis.com/css2?family=Nanum+Gothic+Coding&display=swap" rel="stylesheet"/>           
        <nav className="navbar header" id="sidebar">
          <Link to="/">
              <img src={logotext}></img>
          </Link>
            
            {/*LINKS*/}
            <Link to="/">
              Home
            </Link>

            {isAuth(this.state.user) && <Link to="/submit">Submit</Link>}

            {isAuth(this.state.user) && hasRole(this.state.user, ['admin']) && <Link to="/submissionList">Submissions</Link>}
            
            <Link to="/about">
              About
            </Link>

            {!isAuth(this.state.user) && <Link to="/login">Login/Signup</Link>}

            {isAuth(this.state.user) &&  <div>
                                      <h3>{this.state.user.user_name}</h3>
                                      <button onClick={this.logoutUser}>Logout</button>
                                    </div> }
          </nav>
           {/*ROUTES*/}
          <Route path="/" exact render={(props)=>(
            <Home {...props} user={this.state.user}/>
          )} />

          <Route path="/submit" render={(props)=>(
            <SubmitPage {...props} user={this.state.user}/>
          )} />

          <Route path="/submissionList" render={(props)=>(
            <SubmissionList {...props} user={this.state.user}/>
          )} />

          <Route path="/about" component={About}/>
          <Route path="/login" render={(props)=>(
            <AuthForm {...props} type='login' loginUser={this.loginUser}/>
          )} />
          <Route path="/signup" render={(props)=>(
            <AuthForm {...props} type='signup' loginUser={this.loginUser}/>
          )} />

        </div>
      </Router>

    );
  }
}

export default App;
