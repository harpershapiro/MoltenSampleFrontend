import React, {Component} from 'react';
import { BrowserRouter as Router, Route, Link} from "react-router-dom";
import './App.css';
import "bootstrap/dist/css/bootstrap.min.css";

//Main Components
import Home from "./components/home.component.js";
import Submit from "./components/submit.component.js";
import SubmissionList from "./components/submissionList.component.js";
import About from "./components/about.component.js";


class App extends Component {
  render() {
    return(
      <Router>
        <div>
          <nav className="navbar" id="sidebar">
            <Link to="/">
              Home
            </Link>
            <Link to="/submit">
              Submit
            </Link>
            <Link to="/submissionList">
              Submissions
            </Link>
            <Link to="/about">
              About
            </Link>
          </nav>
          <Route path="/" exact component={Home}/>
          <Route path="/submit" component={Submit}/>
          <Route path="/submissionList" component={SubmissionList}/>
          <Route path="/about" component={About}/>
        </div>
      </Router>
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
