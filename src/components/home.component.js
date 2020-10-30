import React, { Component } from "react";
import Post from "./post.component.js";
import axios from "axios";
import { API_PATH, FILE_LOCATION } from "../config";


export default class Home extends Component {
  constructor(props) {
    super(props);

    this.state = { posts: [] };
    //images: []  };
    this.postDeleted = this.postDeleted.bind(this);
    this.postList = this.postList.bind(this);
  }

  componentDidMount() {
    axios
      .get(API_PATH.concat("/posts"))
      .then((res) => {
        this.setState({ posts: res.data });
        //this.getImageUrls();
      })
      .catch(function (error) {
        console.log(error);
      });
  }

  postDeleted(post) {
    let imageString =
      `/files/deleteImage/${FILE_LOCATION}/` + post.post_url + "." + post.img_ext;
    let packString = `/files/deletePack/${FILE_LOCATION}/` + post.post_url + "." + post.pack_ext;

    //delete resources and refresh
    axios
      .delete(API_PATH.concat(imageString))
      .then(
        axios
          .delete(API_PATH.concat(packString))
          .then((res) => window.location.reload(false))
      )

      .catch((e) => console.log(e));
  }

  postList() {
    var postDeleted = this.postDeleted;
    var user = this.props.user;
    return this.state.posts.map(function (currentPost, i) {
      return (
        <Post
          post={currentPost}
          key={i}
          postDeleted={postDeleted}
          user={user}
        />
      );
    });
  }

  render() {
    return <div>{this.postList()}</div>;
  }
}
