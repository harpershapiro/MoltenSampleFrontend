import React, {Component} from 'react';
import { BrowserRouter as Router, Route, Link} from "react-router-dom";
import axios from 'axios';
import cogoToast from 'cogo-toast';
const BACK_PORT = 4000;


export default class AuthForm extends Component {
    constructor(props){
        super(props);
        
         this.state = {
            username: '',
            password: '',
            type: this.props.type
        }

        this.toggleMode = this.toggleMode.bind(this);
        this.onChangeUsername = this.onChangeUsername.bind(this);
        this.onChangePassword = this.onChangePassword.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);



    }

    toggleMode(){
        if(this.state.type==='login'){
            this.setState({
                type: 'signup'
            })
            this.props.history.push('/signup');
        } else {
            this.setState({
                type: 'login'
            })
            this.props.history.push('/login');
        }
    }


    handleSubmit(ev){
        //api will handle hashing
        ev.preventDefault();
        //FORMATTED FOR AUTH API CALL ONLY
        const userSubmission= {
            username: this.state.username,
            password: this.state.password
        }
        //FORMATTED FOR loginUser() METHOD ONLY
        const userToLogin = {
            user_name: this.state.username,
            user_roles: ['user'] //default
        }
        //(need to combine these schemes)

        if(this.state.type==='signup'){


            //add to db
            axios.post(`http://localhost:${BACK_PORT}/molten/users/sign-up`,userSubmission)
            .then((res)=>{
                //const parsedRes = JSON.parse(res);
                //console.log(JSON.stringify(res));
                console.log(`Signed up ${res.data.response.user_name}`);

                this.props.loginUser(userToLogin);
                this.props.history.push('/'); //need to be async??
            });
        } else {
            console.log("about to login user");
            axios.post(`http://localhost:${BACK_PORT}/molten/users/sign-in`,userSubmission)
            .then((res)=>{
                console.log(JSON.stringify(res.data.response));
                this.props.loginUser(res.data.response);
                this.props.history.push('/'); //need to be async??
            }).catch(e=> cogoToast.warn("Invalid username or password."));
        }
    }

    //Form update handlers///////////////
    onChangePassword(e){
        this.setState({
            password: e.target.value
        });
    }

    onChangeUsername(e){
        this.setState({
            username: e.target.value
        });
    }
    ////////////////////////////////////

    render(){
        return(
            <Router>
            <div>
                <form onSubmit = {this.handleSubmit}>
                    <div className = "form-group">
                        <label htmlFor="username" className="mb-1 text-muted">
                                Username
                        </label>
                        <input  type="text" 
                                name="username" 
                                id="username" 
                                onChange={this.onChangeUsername}
                                value={this.state.username} 
                                className="form-control rounded-0" 
                                required minLength="5" />
                        
                    </div>
                    <div className = "form-group">
                        <label htmlFor="password" className="mb-1 text-muted">
                                Password
                        </label>
                        <input  type="text" 
                                name="password" 
                                id="password" 
                                onChange={this.onChangePassword}
                                value={this.state.password} 
                                className="form-control rounded-0" 
                                required minLength="5" />
                    </div>

                    <div className="form-group">
                        <input type="submit" value={this.state.type === 'signup' ? "Sign Up" : "Login"} className="btn btn-primary"></input>
                    </div>
					
                    <button onClick={this.toggleMode} >{this.state.type === 'signup' ? "(Login Instead)" : "(Sign Up Instead)"}</button>

							
                        
                </form>
            </div>
            </Router>
        )
    }


}