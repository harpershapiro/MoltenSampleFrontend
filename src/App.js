import React, {Component, useContext} from 'react';
import { BrowserRouter as Router, Route, Link} from "react-router-dom";
import './App.css';
import "bootstrap/dist/css/bootstrap.min.css";
import {hasRole, isAuth,loginUser} from "./auth.js"
import {userContext} from "./userContext.js"

//Main Components
import Home from "./components/home.component.js";
import SubmitPage from "./components/submitPage.component.js";
import SubmissionList from "./components/submissionList.component.js";
import About from "./components/about.component.js";
import Login from "./components/login.component.js";

const dummyUser = {
  user_name: "dummy",
  user_roles: ['user']
}



class App extends Component {
  constructor(props){
    super(props);

    //Currently logged in user
    this.state = {
      user: {
        user_name: "harper",
        user_roles: ['user','admin']
      }
    }
  }

  // loginUser(user){
  //   this.setState({user: user});
  // }

  render() {
    return(
      <userContext.Provider value={this.state.user}>
      <Router>
        <div>
          <nav className="navbar" id="sidebar">
            <h3>{this.state.user.user_name}</h3>
            <Link to="/">
              Home
            </Link>
            <Link to="/submit">
              Submit
            </Link>
            {hasRole(this.state.user, ['admin']) && <Link to="/submissionList">Submissions</Link>}
            <Link to="/about">
              About
            </Link>
            <Link to="/login">
              Login
            </Link>
          </nav>
          <Route path="/" exact component={Home}/>
          <Route path="/submit" component={SubmitPage}/>
          <Route path="/submissionList" component={SubmissionList}/>
          <Route path="/about" component={About}/>
          <Route path="/login" component={Login}/>

        </div>
        <div>
            <button onClick={()=>loginUser(dummyUser,this)}></button>
            {hasRole(this.state.user, ['user']) && <p>Is User</p>}
            {hasRole(this.state.user, ['admin']) && <p>Is Admin</p>}
        </div>
      </Router>
      </userContext.Provider>

    );
  }
}

// class Home extends Component{
//   render(){
//     return(
//     <h2>Molten Sample Imprint</h2>
//     )
//   }
// }

// class Submit extends Component{
//   render(){
//     return(
//       <h2>Submit</h2>
//     )
//   }
// }


export default App;
