import React, { Component } from "react";
import axios from "axios";
import { userContext } from "../userContext.js";
import { API_PATH, FILE_LOCATION } from "../config";
import cogoToast from "cogo-toast";

var md5 = require("md5");

const FileType = require("file-type");

export default class SubmitPage extends Component {
  constructor(props) {
    super(props);

    this.state = {
      submission_url: "",
      img_ext: "",
      pack_ext: "",
      submission_title: "",
      submission_user: this.props.user.user_name,
      submission_date: "",
      submission_desc: "",
      submission_size: 0,
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

    //get extensions and types
    let packExt = this.packUploadInput.files[0].name.split(".").slice(-1)[0];
    let imgExt = this.imgUploadInput.files[0].name.split(".").slice(-1)[0];
    let imgMimeType = this.imgUploadInput.files[0].type;
    let packMimeType = this.packUploadInput.files[0].type;

    //check for accepted types
    if (packMimeType != "application/x-zip-compressed") {
      cogoToast.warn("Invalid sample pack file.");
      return;
    } else if (
      imgMimeType != "image/jpeg" &&
      imgMimeType !== "image/png" &&
      imgMimeType !== "image/gif"
    ) {
      cogoToast.warn("Invalid image type.");
      return;
    }

    this.setState({
      ...this.state,
      img_ext: `${imgExt}`,
      pack_ext: `${packExt}`,
    });

    //Create unique file location
    var date = Date.now();
    var filename = md5(date.toString());

    packData.append("file", this.packUploadInput.files[0]);
    packData.append("filename", `packs/${filename}.${packExt}`);
    imgData.append("file", this.imgUploadInput.files[0]);
    imgData.append("filename", `images/${filename}.${imgExt}`);

    //CONVERT ALL THIS CODE WITH ASYNC/AWAIT

    //upload SAMPLE PACK
    //set load overlay until response
    this.props.setLoadOverlay(true);
    fetch(API_PATH.concat(`/files/upload/${FILE_LOCATION}`), {
      method: "POST",
      body: packData,
    })
      .then((response) => {
        response.json().then((body) => {
          console.log("bytes uploaded: " + body.size);
          this.setState({
            ...this.state,
            submission_url: filename,
            submission_date: date,
            submission_size: body.size,
          });
          this.props.setLoadOverlay(false);
        });
      }) //upload IMAGE
      .then(() =>
        fetch(API_PATH.concat(`/files/upload/${FILE_LOCATION}`), {
          method: "POST",
          body: imgData,
        }).then((response) => {
          response.json().then((body) => {
            this.addSubToDB();
          });
        })
      );
  }

  //submit to db, reset state, redirect to home
  addSubToDB() {
    const newSubmission = {
      submission_url: this.state.submission_url,
      //submission_img_url: this.state.submission_img_url,
      img_ext: this.state.img_ext,
      pack_ext: this.state.pack_ext,
      submission_title: this.state.submission_title,
      submission_user: this.state.submission_user,
      submission_date: this.state.submission_date,
      submission_desc: this.state.submission_desc,
      submission_size: this.state.submission_size,
    };

    console.log(newSubmission);

    axios
      .post(API_PATH.concat("/submissions/add"), newSubmission)
      .then((res) => {
        //AFTER DB UPLOAD
        console.log(res.data);
        this.setState({
          submission_url: "",
          //submission_img_url: '',
          img_ext: "",
          pack_ext: "",
          submission_title: "",
          submission_user: "",
          submission_date: "",
          submission_desc: "",
          submission_size: 0,
        });
        this.props.history.push("/");
      });
  }

  onChangeSubmissionTitle(e) {
    this.setState({
      submission_title: e.target.value,
    });
  }

  onChangeSubmissionDesc(e) {
    this.setState({
      submission_desc: e.target.value,
    });
  }

  render() {
    //this.getUserFromContext();
    return (
      <div>
        <h1> Submit </h1>
        <form onSubmit={this.handleUploadFile}>
          <label>Sample Pack File (.zip)</label>
          <div className="form-group">
            <input
              ref={(ref) => {
                this.packUploadInput = ref;
              }}
              type="file"
              accept=".zip"
            />
          </div>

          <label>Image File (.jpg .png .gif)</label>
          <div className="form-group">
            <input
              ref={(ref) => {
                this.imgUploadInput = ref;
              }}
              type="file"
              accept=".jpg,.png,.gif"
            />
          </div>

          <label>Title</label>
          <div className="form-group">
            <input
              type="text"
              className="form-control"
              value={this.state.submission_title}
              onChange={this.onChangeSubmissionTitle}
            ></input>
          </div>

          <label>Description</label>
          <div className="form-group">
            <input
              type="text"
              className="form-control"
              value={this.state.submission_desc}
              onChange={this.onChangeSubmissionDesc}
            ></input>
          </div>

          <div className="form-group">
            <input
              type="submit"
              value="Submit"
              className="btn btn-primary"
            ></input>
          </div>
        </form>
      </div>
    );
  }
}
