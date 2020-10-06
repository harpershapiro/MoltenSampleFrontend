import React, {Component} from 'react';
import Post from './post.component.js'
import axios from 'axios';
const BACK_PORT = 4000;

export default class Home extends Component {

    constructor(props){
        super(props);

        this.state = { posts: [] }
                      //images: []  };
        this.postDeleted = this.postDeleted.bind(this);

    }

    componentDidMount(){
        axios.get(`http://localhost:${BACK_PORT}/molten/posts`)
            .then(res => {
                this.setState({posts: res.data,
                });
                //this.getImageUrls();
            })
            .catch(function (error){
                console.log(error);
            })
    }

    postDeleted(postId){
        //update state: delete item from posts with id postId
        var oldPosts = this.state.posts;
        var newPosts = oldPosts.filter(post=>{
            if(post._id == postId){
                return false;
            } else {
                return true;
            }
        });
        this.setState({posts: newPosts});
    }

    postList(){
        var postDeleted = this.postDeleted;
        return this.state.posts.map(function(currentPost, i){
            return <Post post={currentPost} key={i} postDeleted={postDeleted}/>
        })
    }

    render(){
        return (
            <div>
                {this.postList()}
            </div>
        )
    }
}