import React, {Component} from 'react';
import axios from 'axios';
import {userContext} from "../userContext.js";
var md5 = require('md5')

const FileType = require('file-type');
const BACK_PORT = 4000;

export default class SubmitPage extends Component {

    constructor(props){
        super(props);

        this.state = {
            submission_url: '',
            img_ext: '',
            pack_ext: '',
            submission_title: '',
            submission_user: this.props.user.user_name,
            submission_date: '',
            submission_desc: '',
        };



        //set user

        this.onChangeSubmissionTitle = this.onChangeSubmissionTitle.bind(this);
        this.onChangeSubmissionDesc = this.onChangeSubmissionDesc.bind(this);
        this.handleUploadFile = this.handleUploadFile.bind(this);
        this.addSubToDB = this.addSubToDB.bind(this);
        //this.getUserFromContext = this.getUserFromContext.bind(this);
    }

    // componentDidMount(){
    //     this.getUserFromContext();
    // }

    //uploads submitted file to backend uploads/packs or uploads/images
    handleUploadFile(ev) { 
        ev.preventDefault();

        console.log(`Form submitted:`);
        console.log(`Submission Title: ${this.state.submission_title}`);
        console.log(`Submission Description: ${this.state.submission_desc}`);

        const packData = new FormData();
        const imgData = new FormData();


        //get extensions of each upload - works as long as the file actually has a '.ext'
        let packExt = this.packUploadInput.files[0].name.split('.').slice(-1)[0];
        let imgExt = this.imgUploadInput.files[0].name.split('.').slice(-1)[0];

        console.log(packExt);
        console.log(imgExt);
        this.setState({...this.state,
            img_ext: `${imgExt}`,
            pack_ext: `${packExt}`
        })
        var date = Date.now();
        var filename = md5(date.toString());
        

        

        packData.append('file', this.packUploadInput.files[0]);
        packData.append('filename', `packs/${filename}.${packExt}`);
        imgData.append('file',this.imgUploadInput.files[0]);
        imgData.append('filename', `images/${filename}.${imgExt}`);


        //CONVERT ALL THIS CODE WITH ASYNC/AWAIT

        console.log("fetching upload path");
        //upload sample pack
        fetch(`http://localhost:${BACK_PORT}/upload`, { 
            method: 'POST',
            body: packData,
        }).then((response) => {
            response.json().then((body) => {
                //let date = Date.now();
                this.setState({ ...this.state,
                                //submission_pack_url: `http://localhost:${BACK_PORT}/${body.file}`,
                                submission_url: filename,
                                submission_date: date
                            });
            });
        }) //upload image
        .then(() => fetch(`http://localhost:${BACK_PORT}/upload`, { 
            method: 'POST',
            body: imgData,
        }).then((response) => {
            response.json().then((body) => {
                // this.setState({ 
                //     //...this.state,
                //     //submission_img_url: `http://localhost:${BACK_PORT}/${body.file}`
                //     submission_img_url: `${body.file}`
                // });
                //submit to db
                this.addSubToDB(); 
            });
        }))

    }

    //submit to db, reset state, redirect to home
    addSubToDB(){
        const newSubmission = {
            submission_url: this.state.submission_url,
            //submission_img_url: this.state.submission_img_url,
            img_ext: this.state.img_ext,
            pack_ext: this.state.pack_ext,
            submission_title: this.state.submission_title,
            submission_user: this.state.submission_user,
            submission_date: this.state.submission_date,
            submission_desc: this.state.submission_desc
        }

        console.log(newSubmission);

        axios.post(`http://localhost:${BACK_PORT}/molten/submissions/add`,newSubmission)
            .then((res)=>{
                //AFTER DB UPLOAD
                console.log(res.data)
                this.setState({
                    submission_url: '',
                    //submission_img_url: '',
                    img_ext: '',
                    pack_ext: '',
                    submission_title: '',
                    submission_user: '',
                    submission_date: '',
                    submission_desc: '',
                })
                this.props.history.push("/");
            
            });
    }

    // getUserFromContext(){
    //     return(
    //         <userContext.Consumer>
    //             {ctx=> (
    //                 this.setState({submission_user: ctx.user.user_name})
    //             )}
    //         </userContext.Consumer>
    //     )
    // }

    onChangeSubmissionTitle(e){
        this.setState({
            submission_title: e.target.value
        });
    }

    onChangeSubmissionDesc(e){
        this.setState({
            submission_desc: e.target.value
        });
    }



    render(){
        //this.getUserFromContext();
        return (
            <div>
                <h1> Submit </h1>
                <form onSubmit={this.handleUploadFile}>
                    <label>Sample Pack File</label>
                    <div className="form-group">
                        <input ref={(ref) => {this.packUploadInput = ref;}} type="file" />
                    </div>

                    <label>Image File</label>
                    <div className="form-group">
                        <input ref={(ref) => {this.imgUploadInput = ref;}} type="file" />
                    </div>

                    <label>Title</label>
                    <div className="form-group">
                        <input type="text" 
                                className="form-control"
                                value={this.state.submission_title}
                                onChange={this.onChangeSubmissionTitle}></input>
                    </div>

                    <label>Description</label>
                    <div className="form-group">
                        <input type="text" 
                                className="form-control"
                                value={this.state.submission_desc}
                                onChange={this.onChangeSubmissionDesc}></input>
                    </div>

                    <div className="form-group">
                        <input type="submit" value="Submit" className="btn btn-primary"></input>
                    </div>
                </form>

            </div>
        );
    }

    
}

