import React, {Component} from 'react';
import Post from './post.component.js'
import axios from 'axios';
const BACK_PORT = 4000;

export default class Home extends Component {

    constructor(props){
        super(props);

        this.state = { posts: [] }
                      //images: []  };
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

    postList(){
        return this.state.posts.map(function(currentPost, i){
            return <Post post={currentPost} key={i}/>
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