import React, {Component} from 'react';
import Post from './post.component.js'
import axios from 'axios';
import {API_PATH} from "../config"
//const API_PATH = (process.env.NODE_ENV==="development" ? DEV_API_PATH : PROD_API_PATH)
//const API_PATH = (process.env.NODE_ENV==="development" ? "http://localhost:4000/molten" : process.env.API_PATH)


export default class Home extends Component {

    constructor(props){
        super(props);

        this.state = { posts: [] }
                      //images: []  };
        this.postDeleted = this.postDeleted.bind(this);
        this.postList = this.postList.bind(this);

    }

    componentDidMount(){
        axios.get(API_PATH.concat('/posts'))
            .then(res => {
                this.setState({posts: res.data,
                });
                //this.getImageUrls();
            })
            .catch(function (error){
                console.log(error);
            })
    }

    postDeleted(post){
        //update state: delete item from posts with id postId
        // var oldPosts = this.state.posts;
        // var newPosts = oldPosts.filter(post=>{
        //     if(post._id == postId){
        //         return false;
        //     } else {
        //         return true;
        //     }
        // });
        // this.setState({posts: newPosts});

        //TODO: Delete image and pack from filesystem
        let imageString = '/files/deleteImage/'+post.post_url+'.'+post.img_ext
        let packString = '/files/deletePack/'+post.post_url+'.'+post.pack_ext

        console.log("sending delete to " + API_PATH.concat(imageString));
        axios.delete(API_PATH.concat(imageString))
            .then(axios.delete(API_PATH.concat(packString))
            .then((res) => window.location.reload(false)))
        
            .catch(e=> console.log(e))
    }

    postList(){
        var postDeleted = this.postDeleted;
        var user = this.props.user;
        return this.state.posts.map(function(currentPost, i){
            return <Post post={currentPost} key={i} postDeleted={postDeleted} user={user}/>
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