import React, {Component} from 'react';

//Maybe convert to a shared form
//this.props.backmethod to 
//this.props.onsucess to choose between login method or signup method
//this.props.type to choose between form displays

export default class Login extends Component {
    constructor(props){
        super(props);
        
         this.state = {
            username: '',
            password: ''
        }

        //this.toggleMode = this.toggleMode.bind(this);

    }

    // toggleMode(){
    //     if(this.state.login===true){
    //         this.setState({
    //             login: false
    //         })
    //     } else {
    //         this.setState({
    //             login: true
    //         })
    //     }
    //     console.log(`login: ${this.state.login}`)
    // }

    // loginForm(){
    //     return(
    //     <div>
    //         <h1>LOGIN</h1>
    //         <button onClick={this.toggleMode}>Sign Up</button>
    //     </div>
    //     )
    // }

    // signupForm(){
    //     return(
    //         <div>
    //             <h1>SIGNUP</h1>
    //             <form>


    //             </form>
    //             <button onClick={this.toggleMode}>Login</button>
    //         </div>
    //     )
    // }

    handleSubmit(){
        //api will handle hashing
        const newSignup= {
            username: this.state.username,
            password: this.state.password
        }

        //TODO: Post to /users/sign-up
    }

    render(){
        return(
            <div>
                <form onSubmit = {this.handleSubmit}>
                    <div className = "form-group">
                        <label htmlFor="username" className="mb-1 text-muted">
                                Username
                        </label>
                        <input type="text" name="username" id="username" value={this.state.username} className="form-control rounded-0" required minLength="5" />
                        
                    </div>
                    <div className = "form-group">
                        <label htmlFor="password" className="mb-1 text-muted">
                                Password
                        </label>
                        <input type="text" name="password" id="password" value={this.state.password} className="form-control rounded-0" required minLength="5" />
                    </div>

                    <button className="btn btn-brand text-light float-right border-0 rounded-pill">{this.props.type == 'signup' ? "Sign Up" : "Login"}</button>
						{this.props.backMethod &&
							<button
								onClick={this.props.backMethod}
								type="button"
								className="btn btn-brand-secondary text-white float-right border-0 rounded-pill mx-3">
								Go back
							</button>
                        }
                </form>
            </div>
        )
    }


}