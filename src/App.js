import React, {Component} from 'react';
import { BrowserRouter as Router, Route, Link} from "react-router-dom";
import './App.css';
import "bootstrap/dist/css/bootstrap.min.css";

class App extends Component {
  render() {
    return(
      <Router>
        <div>
          <nav className="navbar">
            <Link to="/submit">
              Submit
            </Link>
            <Link to="/">
              Home
            </Link>
          </nav>
          <Route path="/" exact component={Home}/>
          <Route path="/submit" component={Submit}/>
        </div>
      </Router>
    );
  }
}

class Home extends Component{
  render(){
    return(
    <h2>Molten Sample Imprint</h2>
    )
  }
}

class Submit extends Component{
  render(){
    return(
      <h2>Submit</h2>
    )
  }
}


export default App;
