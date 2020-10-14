import React, {Component} from 'react';
import axios from 'axios';
import {hasRole, isAuth} from "../auth.js";
import DownloadButton from "./downloadButton.js";
require('dotenv/config');

const API_PATH = process.env.API_PATH


export default class Post extends Component {
    constructor(props){
        super(props);

        this.state={imageUrl: '',
                    packUrl: ''}

        this.deletePost=this.deletePost.bind(this);
    }

    hidePost(){
        //todo: add hidden field in model, make a new page for hidden posts?
    }

    componentDidMount(){
        this.fetchImage(this.props.post.post_url.concat('.',this.props.post.img_ext));
        //set full pack url
        let fullPackUrl = this.props.post.post_url.concat('.',this.props.post.pack_ext);
        this.setState({packUrl: fullPackUrl});
    }

    fetchImage(urlFromPost) {
        //const imageName = 'daffycolorado.JPG'
        const imageName = urlFromPost.split('/').slice(-1)[0];
        const url = `http://localhost:${BACK_PORT}/molten/files/fetchImage/${imageName}`
        axios.get(url, {responseType: 'blob'})
        .then(res => {
            //console.log(`ImageData: ${res.data} `)
            //var file = new File( res.data, "image", { type: "image/jpeg" } );
            var localImageUrl = URL.createObjectURL(res.data);
            console.log(`about to return image tag at ${localImageUrl}` )
            //return (<img src={imageUrl} />);
            //return imageUrl; 
            this.setState({imageUrl: localImageUrl});          
        })
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
                <img src={this.state.imageUrl}></img>
                {isAuth(this.props.user) && hasRole(this.props.user,['admin']) && <button onClick={this.deletePost}>Delete</button>}
                <DownloadButton fileUrl={this.state.packUrl} fileName={this.props.post.post_title.concat('.',this.props.post.pack_ext)} />
            </div>
        );
    }
}
