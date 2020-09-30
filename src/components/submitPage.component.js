import React, {Component} from 'react';
import axios from 'axios';
const FileType = require('file-type');
const BACK_PORT = 4000;

export default class SubmitPage extends Component {

    constructor(props){
        super(props);

        this.state = {
            didUpload: false,
            submission_pack_url: '',
            submission_img_url: '',
            submission_title: '',
            submission_user: '',
            submission_date: '',
            submission_desc: '',
        };

        this.onChangeSubmissionTitle = this.onChangeSubmissionTitle.bind(this);
        this.onChangeSubmissionDesc = this.onChangeSubmissionDesc.bind(this);
        this.handleUploadFile = this.handleUploadFile.bind(this);
        this.addSubToDB = this.addSubToDB.bind(this);
    }

    handleUploadFile(ev) { 
        ev.preventDefault();

        console.log(`Form submitted:`);
        console.log(`Submission Title: ${this.state.submission_title}`);
        console.log(`Submission Description: ${this.state.submission_desc}`);

        const packData = new FormData();
        const imgData = new FormData();


        //console.log(this.packUploadInput.files[0]);
        //get file types TODO: restrict them
        
        /*
        (async () => {
            console.log(await FileType.fromFile(this.packUploadInput.files[0].name));
            console.log(await FileType.fromFile(this.imgUploadInput.files[0].name));
        })();*/

        //get extensions of each upload - works as long as the file actually has a '.ext'
        let packExt = this.packUploadInput.files[0].name.split('.').slice(-1)[0];
        let imgExt = this.imgUploadInput.files[0].name.split('.').slice(-1)[0];

        console.log(packExt);
        console.log(imgExt);
        

        packData.append('file', this.packUploadInput.files[0]);
        packData.append('filename', `packs/${this.state.submission_title}.${packExt}`);
        imgData.append('file',this.imgUploadInput.files[0]);
        imgData.append('filename', `images/${this.state.submission_title}.${imgExt}`);


        //CONVERT ALL THIS CODE WITH ASYNC/AWAIT

        console.log("fetching upload path");
        //upload sample pack
        fetch(`http://localhost:${BACK_PORT}/upload`, { 
            method: 'POST',
            body: packData,
        }).then((response) => {
            response.json().then((body) => {
                console.log("setting state fileURL to" + `http://localhost:${BACK_PORT}/${body.file}`);
                this.setState({ ...this.state,
                                didUpload: true, //may not need this
                                //submission_pack_url: `http://localhost:${BACK_PORT}/${body.file}`,
                                submission_pack_url: `${body.file}`,
                                submission_img_url: 'default',
                                submission_user: 'default',
                                submission_date: 'default'
                            });
            });
        }) //upload image
        .then(() => fetch(`http://localhost:${BACK_PORT}/upload`, { 
            method: 'POST',
            body: imgData,
        }).then((response) => {
            response.json().then((body) => {
                this.setState({ 
                    //...this.state,
                    //submission_img_url: `http://localhost:${BACK_PORT}/${body.file}`
                    submission_img_url: `${body.file}`
                });
                //submit to db
                this.addSubToDB(); 
            });
        }))

    }

    addSubToDB(){
        const newSubmission = {
            submission_pack_url: this.state.submission_pack_url,
            submission_img_url: this.state.submission_img_url,
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
                    didUpload: false,
                    submission_pack_url: '',
                    submission_img_url: '',
                    submission_title: '',
                    submission_user: '',
                    submission_date: '',
                    submission_desc: '',
                })
                this.props.history.push("/");
            
            });
    }

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

