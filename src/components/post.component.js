import React, { Component } from "react";
import axios from "axios";
import { hasRole, isAuth } from "../auth.js";
import DownloadButton from "./downloadButton.js";
import { API_PATH } from "../config";
import "react-confirm-alert/src/react-confirm-alert.css"; // Import css
import { confirmAlert } from "react-confirm-alert"; // Import

export default class Post extends Component {
  constructor(props) {
    super(props);

    this.state = { imageUrl: "", packUrl: "" };

    this.deletePost = this.deletePost.bind(this);
    this.deleteConfirm = this.deleteConfirm.bind(this);
  }

  hidePost() {
    //todo: add hidden field in model, make a new page for hidden posts?
  }

  componentDidMount() {
    this.fetchImage(
      this.props.post.post_url.concat(".", this.props.post.img_ext)
    );
    // //set full pack url
    let fullPackUrl = this.props.post.post_url.concat(
      ".",
      this.props.post.pack_ext
    );
    this.setState({ packUrl: fullPackUrl });
  }

  fetchImage(urlFromPost) {
    //const imageName = 'daffycolorado.JPG'
    const imageName = urlFromPost.split("/").slice(-1)[0];
    const url = API_PATH.concat(`/files/fetchImage/${imageName}`);
    axios.get(url, { responseType: "blob" }).then((res) => {
      //console.log(`ImageData: ${res.data} `)
      //var file = new File( res.data, "image", { type: "image/jpeg" } );
      var localImageUrl = URL.createObjectURL(res.data);
      console.log(`about to return image tag at ${localImageUrl}`);
      //return (<img src={imageUrl} />);
      //return imageUrl;
      this.setState({ imageUrl: localImageUrl });
    });
  }

  deleteConfirm() {
    confirmAlert({
      title: "Confirm to submit",
      message: "Are you sure to do this.",
      buttons: [
        {
          label: "Yes",
          onClick: () => this.deletePost(),
        },
        {
          label: "No",
          onClick: () => {},
        },
      ],
    });
  }

  deletePost() {
    const post = this.props.post;
    const postId = post._id;
    //this.fetchImage(post.post_url.concat('.',post.img_ext));
    // //set full pack url
    //let fullPackUrl = post.post_url.concat('.',post.pack_ext);
    //this.setState({packUrl: fullPackUrl});
    //TODO: CONFIRM WINDOW
    axios.delete(API_PATH.concat(`/posts/delete/${postId}`)).then((res) => {
      this.props.postDeleted(post);
    });
  }

  render() {
    //set full pack url
    //var fullPackUrl = this.props.post.post_url.concat('.',this.props.post.pack_ext);
    //this.setState({packUrl: fullPackUrl});
    return (
      <div className="card" align="center">
        <div>
          <img className="card-img-top" src={this.state.imageUrl}></img>
        </div>
        <div className="card-body">
          <h1 className="display-4">{this.props.post.post_title}</h1>
          <h3>by {this.props.post.post_submitter}</h3>
          <p>{this.props.post.post_desc}</p>
          <p>size: {this.props.post.post_size} bytes</p>

          <DownloadButton
            fileUrl={this.state.packUrl}
            fileName={this.props.post.post_title.concat(
              ".",
              this.props.post.pack_ext
            )}
          />

          {isAuth(this.props.user) && hasRole(this.props.user, ["admin"]) && (
            <button
              type="button"
              className="btn-secondary"
              onClick={this.deleteConfirm}
            >
              Delete
            </button>
          )}
        </div>
      </div>
    );
  }
}
