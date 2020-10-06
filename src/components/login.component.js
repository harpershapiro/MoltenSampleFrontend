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
        this.onChangeUsername = this.onChangeUsername.bind(this);
        this.onChangePassword = this.onChangePassword.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);



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

    handleSubmit(ev){
        //api will handle hashing
        ev.preventDefault();
        //VERSION FOR DB
        // const newSignup= {
        //     username: this.state.username,
        //     password: this.state.password,
        // }
        //VERSION FOR TEST
        const newSignup= {
            user_name: this.state.username,
            //user_pass: this.state.password,
            user_roles: ['user']
        }

        //TODO: Post to /users/sign-up
        console.log("about to login user");
        this.props.loginUser(newSignup);
        this.props.history.push('/'); //need to be async??
    }

    render(){
        return(
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

                    <label htmlFor="password" className="mb-1 text-muted">Submit</label>
                    <div className="form-group">
                        <input type="submit" value="Submit" className="btn btn-primary"></input>
                    </div>
                    <button className="btn btn-brand text-light float-right border-0 rounded-pill">jhvjfjh{this.props.type === 'signup' ? "Sign Up" : "Login"}</button>
						
							
                        
                </form>
            </div>
        )
    }


}