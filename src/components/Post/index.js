import React, { Component } from "react";

import { Link } from "react-router-dom";
import {
  Button,
  Comment,
  Divider,
  Feed,
  Image,
  Loader
} from "semantic-ui-react";
import PostComment from "src/components/PostComment";

import getAvatar from "src/helpers/avatar-helper";

class Post extends Component {
  state = {
    comments: [],
    showComments: false,
    buttonText: "Show Comments",
    fetchingComments: false,
    deletingPost: false,
    hasFetch: false,
    opacity: "1"
  };

  deletePost = async id => {
    this.setState({ deletingPost: true });
    const url = `http://jsonplaceholder.typicode.com/posts/${id}`;
    const response = await fetch(url, { method: "DELETE" });

    if (response.status === 200) {
      this.setState({ opacity: "0", deletePost: false });
      setTimeout(() => {
        this.props.onDeletePost(id);
      }, 500);
    }
  };

  getComments = async id => {
    const url = `http://jsonplaceholder.typicode.com/comments?postId=${id}`;
    const response = await fetch(url);
    const data = await response.json();
    return data;
  };

  toggleComments = async id => {
    const { comments, hasFetch, showComments } = this.state;

    if (!showComments) {
      if (comments.length || (!comments.length && hasFetch)) {
        this.setState({ showComments: true, buttonText: "Hide Comments" });
      } else {
        this.setState({ fetchingComments: true });
        const comments = await this.getComments(id);
        this.setState({
          comments,
          buttonText: "Hide Comments",
          fetchingComments: false,
          hasFetch: true,
          showComments: true
        });
      }
    } else {
      this.setState({ showComments: false, buttonText: "Show Comments" });
    }
  };

  buttonContent = () => {
    if (this.state.fetchingComments) {
      return (
        <div>
          <Loader style={{ marginRight: "4px" }} size="mini" active inline />{" "}
          Loading...
        </div>
      );
    } else {
      return this.state.buttonText;
    }
  };

  renderComments = () => {
    const { comments, hasFetch, showComments } = this.state;

    if (comments.length && showComments) {
      return comments.map((comment, index) => (
        <PostComment comment={comment} key={index} />
      ));
    } else if (!comments.length && hasFetch && showComments) {
      return <div>No comment...</div>;
    } else {
      return <div />;
    }
  };

  render() {
    const { deletingPost, opacity } = this.state;
    const { post, user } = this.props;

    return (
      <div style={{ opacity, transition: "opacity 500ms linear" }}>
        <Feed>
          <Feed.Event>
            <Feed.Label>
              <Image src={getAvatar(user.id)} />
            </Feed.Label>
            <Feed.Content>
              <Feed.Summary>
                <Feed.User as={Link} to={`users/${user.id}/posts`}>
                  {user.name}
                </Feed.User>{" "}
                posted!
                <Feed.Date>1 day ago</Feed.Date>
              </Feed.Summary>
              <Feed.Extra text>
                <div style={{ fontWeight: "bold", fontStyle: "italic" }}>
                  {post.title}
                </div>
                {post.body}
              </Feed.Extra>
            </Feed.Content>
          </Feed.Event>
        </Feed>
        <Button
          size="mini"
          style={{ marginLeft: "50px" }}
          onClick={() => this.toggleComments(post.id)}
        >
          {this.buttonContent()}
        </Button>
        <Button
          size="tiny"
          color="red"
          floated="right"
          icon="trash"
          loading={deletingPost}
          onClick={() => this.deletePost(post.id)}
        />

        <Comment.Group style={{ marginLeft: "60px" }}>
          {this.renderComments()}
        </Comment.Group>
        <Divider />
      </div>
    );
  }
}

export default Post;
