import React, {Component} from 'react';
import axios from 'axios';
import DownloadButton from "./downloadButton.js";
import {API_PATH} from "../config"

export default class Submission extends Component {
    constructor(props){
        super(props);


        //var localImageUrl = this.fetchImage(this.props.sub.submission_img_url);
        //console.log(`local image url: ${localImageUrl}`)
        this.state = {imageUrl: '', packUrl: ''}
        this.fetchImage = this.fetchImage.bind(this);
        this.makePost = this.makePost.bind(this);
        this.deleteSub = this.deleteSub.bind(this);

        

        //functions
    }

    componentDidMount(){
        this.fetchImage((this.props.sub.submission_url).concat('.',this.props.sub.img_ext));
    }

        //refactor to a new js file if this is working
    fetchImage(urlFromSub) {
            const url = API_PATH.concat(`/files/fetchImage/${urlFromSub}`);
            axios.get(url, {responseType: 'blob'})
            .then(res => {
                //console.log(`ImageData: ${res.data} `)
                //var file = new File( res.data, "image", { type: "image/jpeg" } );
                var localImageUrl = URL.createObjectURL(res.data);
                //return (<img src={imageUrl} />);
                //return imageUrl; 
                this.setState({imageUrl: localImageUrl});          
            })
        }

    //Post a submission (admin only)
    makePost(e){
        var date = Date.now();
        const newPost = {
            post_url: this.props.sub.submission_url,
            //post_img_url: this.props.sub.submission_img_url,
            img_ext: this.props.sub.img_ext,
            pack_ext: this.props.sub.pack_ext,
            post_date: date,
            post_submitter: this.props.sub.submission_user,
            post_accepter: "default",
            post_title: this.props.sub.submission_title,
            post_desc: this.props.sub.submission_desc
        }        

        axios.post(API_PATH.concat('/posts/add'),newPost)
            .then((res)=>{
                const oldSubId = this.props.sub._id;
                //console.log(`${oldSubId}`);
                axios.delete(API_PATH.concat(`/submissions/delete/${oldSubId}`))
                    .then((res)=>{
                        this.props.history.push('/');
                    })
            });
        

    }

    deleteSub(){
        const subId = this.props.sub._id;
        //TODO: CONFIRM WINDOW
        axios.delete(API_PATH.concat(`/submissions/delete/${subId}`))
            .then((res)=>{
                this.props.submissionDeleted(subId);
            })
    }

    // addPostToDB(){

    // }


    // render(){
    //     //var imageUrl=this.fetchImage(this.props.sub.submission_img_url);
    //     return(
    //         <div>
    //         <tr>    
    //                 <td>
    //                     <button onClick={this.makePost}>Post</button>
    //                     <button onClick={this.deleteSub}>Delete</button>
    //                 </td>          
    //                 <td><h1>{this.props.sub.submission_title}</h1></td>
    //                 <td>{this.props.sub.submission_desc}</td>
    //                 <td>{this.props.sub.img_ext}</td>
    //                 <td>{this.props.sub.pack_ext}</td>
    //                 <td>{this.props.sub.submission_user}</td>
    //                 <td>{this.props.sub.submission_date}</td>
    //                 <img style={{height:"300px"}} src={this.state.imageUrl} />
    //         </tr>
    //         </div>

    //     );
    // }

    render(){
        return(
            <div className="card" align="center">
                <img className="card-img-top" src={this.state.imageUrl}></img>
                <div className="card-body">
                    <h1 className="display-4">{this.props.sub.submission_title}</h1>
                    <h3>by {this.props.sub.submission_user}</h3>
                    <p>{this.props.sub.submission_desc}</p>

                    <DownloadButton fileUrl={this.state.packUrl} fileName={this.props.sub.submission_title.concat('.',this.props.sub.pack_ext)} />
                    <button type="button" className="btn-secondary" onClick={this.deleteSub}>Delete</button>
                    <button type="button" className="btn-primary" onClick={this.makePost}>Post</button>
                </div>

            </div>
        );
    }
}