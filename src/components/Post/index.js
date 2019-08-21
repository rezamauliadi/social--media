import React, { Component } from "react";

import { Link } from "react-router-dom";
import { Button, Divider, Feed, Image, Message } from "semantic-ui-react";
import CommentList from "src/components/CommentList";
import UpdateForm from "src/components/UpdateForm";

import API from "src/api";
import getAvatar from "src/helpers/avatar-helper";

class Post extends Component {
  state = {
    showUpdateForm: false,
    deletingPost: false,
    opacity: "1"
  };

  deletePost = async () => {
    this.setState({ deletingPost: true });

    const { id } = this.props.post;
    const status = await API.deletePost(id);

    if (status === 200) {
      this.setState({ opacity: "0", deletingPost: false });
      setTimeout(() => {
        this.props.onDeletePost(id);
      }, 500);
    }
  };

  afterSubmitForm = updatedPost => {
    this.props.onUpdatePost(updatedPost);
    this.setState({ showUpdateForm: false });
  };

  openUpdateForm = () => {
    this.setState({ showUpdateForm: true });
  };

  closeUpdateForm = () => {
    this.setState({ showUpdateForm: false });
  };

  renderPostContent = () => {
    const { showUpdateForm } = this.state;
    const { post } = this.props;

    if (showUpdateForm) {
      return (
        <UpdateForm
          type="posts"
          id={post.id}
          title={post.title}
          body={post.body}
          parentId={post.userId}
          onClose={this.closeUpdateForm}
          afterSubmit={this.afterSubmitForm}
        />
      );
    }

    return (
      <div>
        <div style={{ fontWeight: "bold", fontStyle: "italic" }}>
          {post.title}
        </div>
        {post.body}
      </div>
    );
  };

  render() {
    const { deletingPost, opacity, showUpdateForm } = this.state;
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
              <Feed.Extra text>{this.renderPostContent()}</Feed.Extra>
            </Feed.Content>
          </Feed.Event>
        </Feed>
        <Button
          size="tiny"
          color="red"
          floated="right"
          icon="trash"
          loading={deletingPost}
          disabled={deletingPost}
          onClick={() => this.deletePost()}
          style={{ display: showUpdateForm ? "none" : "block" }}
        />
        <Button
          size="tiny"
          color="yellow"
          floated="right"
          icon="pencil"
          disabled={deletingPost}
          onClick={() => this.openUpdateForm()}
          style={{ display: showUpdateForm ? "none" : "block" }}
        />

        <CommentList postId={post.id} />
        <Divider />
      </div>
    );
  }
}

export default Post;
