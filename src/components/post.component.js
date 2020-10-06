import React, {Component} from 'react';
import axios from 'axios';
const BACK_PORT = 4000

export default class Post extends Component {
    constructor(props){
        super(props);
        this.deletePost=this.deletePost.bind(this);
    }

    hidePost(){
        //todo: add hidden field in model, make a new page for hidden posts?
    }

    deletePost(){
        const postId = this.props.post._id;
        //TODO: CONFIRM WINDOW
        axios.delete(`http://localhost:${BACK_PORT}/molten/posts/delete/${postId}`)
            .then((res)=>{
                this.props.postDeleted(postId);
            })
    }

    render(){
        return(
            <div className="jumbotron">
                <h1>{this.props.post.post_title}</h1>
                <h3>{this.props.post.post_submitter}</h3>
                <p>{this.props.post.post_desc}</p>
                <button onClick={this.deletePost}>Delete</button>
            </div>
        );
    }
}
