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
    loading: false
  };

  getComments = async id => {
    const url = `http://jsonplaceholder.typicode.com/comments?postId=${id}`;
    const response = await fetch(url);
    const data = await response.json();
    return data;
  };

  toggleComments = async id => {
    if (!this.state.showComments) {
      if (this.state.comments.length) {
        this.setState({ showComments: true, buttonText: "Hide Comments" });
      } else {
        this.setState({ loading: true });
        const comments = await this.getComments(id);
        this.setState({
          comments,
          showComments: true,
          buttonText: "Hide Comments",
          loading: false
        });
      }
    } else {
      this.setState({ showComments: false, buttonText: "Show Comments" });
    }
  };

  buttonContent = () => {
    if (this.state.loading) {
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
    if (this.state.comments.length && this.state.showComments) {
      return this.state.comments.map((comment, index) => (
        <PostComment comment={comment} key={index} />
      ));
    } else {
      return <div />;
    }
  };

  render() {
    return (
      <div>
        <Feed>
          <Feed.Event>
            <Feed.Label>
              <Image src={getAvatar(this.props.user.id)} />
            </Feed.Label>
            <Feed.Content>
              <Feed.Date>1 day ago</Feed.Date>
              <Feed.Summary>
                <Link to={`users/${this.props.user.id}/posts`}>
                  {this.props.user.name}
                </Link>{" "}
                posted!
              </Feed.Summary>
              <Feed.Extra text>{this.props.post.body}</Feed.Extra>
            </Feed.Content>
          </Feed.Event>
        </Feed>
        <Button
          size="mini"
          style={{ marginLeft: "50px" }}
          onClick={() => this.toggleComments(this.props.post.id)}
        >
          {this.buttonContent()}
        </Button>

        <Comment.Group style={{ marginLeft: "60px" }}>
          {this.renderComments()}
        </Comment.Group>
        <Divider />
      </div>
    );
  }
}

export default Post;
