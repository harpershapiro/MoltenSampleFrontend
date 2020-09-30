import React, {Component} from 'react';
//import axios from 'axios';

export default class Post extends Component {
    constructor(props){
        super(props);
    
    }

    render(){
        return(
            <div className="jumbotron">
                <h1>{this.props.post.post_title}</h1>
                <h3>{this.props.post.post_submitter}</h3>
                <p>{this.props.post.post_desc}</p>
            </div>
        );
    }
}
