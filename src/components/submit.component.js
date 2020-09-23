import React, {Component} from 'react';
import axios from 'axios';
const BACK_PORT = 4000;

export default class Submit extends Component {

    constructor(props){
        super(props);

        this.state = {
            didUpload: false,
            submission_url: '',
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

        const data = new FormData();
        data.append('file', this.uploadInput.files[0]);
        data.append('filename', this.state.submission_title);

        console.log("fetching upload path");
        fetch(`http://localhost:${BACK_PORT}/upload`, { 
            method: 'POST',
            body: data,
        }).then((response) => {
            response.json().then((body) => {
                console.log("setting state fileURL to" + `http://localhost:${BACK_PORT}/${body.file}`);
                this.setState({ ...this.state,
                                didUpload: true, //may not need this
                                submission_url: `http://localhost:${BACK_PORT}/${body.file}`,
                                submission_user: 'default',
                                submission_date: 'default'
                            });
                this.addSubToDB(); //not working, check async stuff
            });
        });

        //console.log("ABOUT TO PUSH TO DB");
        //also resets state
        //redirect home. TODO: add a confirmation message
        

    }

    addSubToDB(){
        const newSubmission = {
            submission_url: this.state.submission_url,
            submission_title: this.state.submission_title,
            submission_user: this.state.submission_user,
            submission_date: this.state.submission_date,
            submission_desc: this.state.submission_desc
        }

        console.log(newSubmission);

        axios.post(`http://localhost:${BACK_PORT}/molten/add`,newSubmission)
            .then((res)=>{
                //AFTER DB UPLOAD
                console.log(res.data)
                this.setState({
                    didUpload: false,
                    submission_url: '',
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
                    <div>
                        <input ref={(ref) => {this.uploadInput = ref;}} type="file" />
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

