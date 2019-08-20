import React, { Component } from "react";

import { Link } from "react-router-dom";
import {
  Button,
  Comment,
  Divider,
  Feed,
  Form,
  Image,
  Label,
  Loader,
  Message
} from "semantic-ui-react";
import PostComment from "src/components/PostComment";
import PostForm from "src/components/PostForm";

import API from "src/api";
import getAvatar from "src/helpers/avatar-helper";

class Post extends Component {
  state = {
    id: 0,
    userId: 0,
    title: "",
    body: "",
    tempTitle: "",
    tempBody: "",
    comments: [],
    showComments: false,
    showUpdateForm: false,
    hasFetchComments: false,
    fetchingComments: false,
    deletingPost: false,
    updatingPost: false,
    invalidForm: false,
    opacity: "1",
    commentButtonText: "Show Comments"
  };

  changeValue = (_event, { name, value }) => {
    this.setState({ [name]: value });
  };

  updatePost = async () => {
    this.setState({ updatingPost: true, invalidForm: false });

    const { id, body, title, userId } = this.state;
    if (!body || !title) {
      this.setState({ updatingPost: false, invalidForm: true });
      return;
    }
    if (id > 100) {
      // handle post id not found if exceed 100
      this.setState({ showUpdateForm: false, updatingPost: false });
      return;
    }

    const payload = { id, title, body, userId };
    const updatedPost = await API.updatePost(payload, id);

    this.props.onUpdatePost(updatedPost);
    this.setState({ showUpdateForm: false, updatingPost: false });
  };

  deletePost = async () => {
    this.setState({ deletingPost: true });

    const { id } = this.state;
    const status = await API.deletePost(id);

    if (status === 200) {
      this.setState({ opacity: "0", deletePost: false });
      setTimeout(() => {
        this.props.onDeletePost(id);
      }, 500);
    }
  };

  getComments = async () => {
    const { id } = this.state;
    const comments = await API.retrieveCommentsByPost(id);
    return comments;
  };

  pushNewComment = newComment => {
    const comments = [...this.state.comments];
    comments.push(newComment);
    this.setState({ comments });
  };

  toggleComments = async () => {
    const { comments, hasFetchComments, showComments } = this.state;

    if (!showComments) {
      if (comments.length || (!comments.length && hasFetchComments)) {
        this.setState({
          showComments: true,
          commentButtonText: "Hide Comments"
        });
      } else {
        this.setState({ fetchingComments: true });
        const comments = await this.getComments();
        this.setState({
          comments,
          commentButtonText: "Hide Comments",
          fetchingComments: false,
          hasFetchComments: true,
          showComments: true
        });
      }
    } else {
      this.setState({
        showComments: false,
        commentButtonText: "Show Comments"
      });
    }
  };

  commentButtonContent = () => {
    const { fetchingComments, commentButtonText } = this.state;

    if (fetchingComments) {
      return (
        <div>
          <Loader style={{ marginRight: "4px" }} size="mini" active inline />{" "}
          Loading...
        </div>
      );
    }
    return commentButtonText;
  };

  commentForm = () => {
    return (
      <div style={{ marginTop: "18px" }}>
        <PostForm type="comments" onSubmit={this.pushNewComment} />
      </div>
    );
  };

  commentList = () => {
    const { comments, id } = this.state;
    return comments.map(comment => (
      <PostComment comment={comment} key={`${id}-${comment.id}`} />
    ));
  };

  renderComments = () => {
    const { comments, hasFetchComments, showComments } = this.state;

    if (comments.length && showComments) {
      return (
        <div>
          {this.commentList()}
          {this.commentForm()}
        </div>
      );
    } else if (!comments.length && hasFetchComments && showComments) {
      return (
        <div>
          <Label basic>No comment yet...</Label>
          {this.commentForm()}
        </div>
      );
    }
    return <div />;
  };

  toggleUpdateForm = isOpen => {
    if (isOpen) {
      const { title, body } = this.state;
      this.setState({
        tempTitle: title,
        tempBody: body,
        showUpdateForm: isOpen
      });
    } else {
      const { tempTitle, tempBody } = this.state;
      this.setState({
        title: tempTitle,
        body: tempBody,
        showUpdateForm: isOpen
      });
    }
  };

  renderPostContent = () => {
    const {
      title,
      body,
      showUpdateForm,
      invalidForm,
      deletingPost,
      updatingPost
    } = this.state;

    if (showUpdateForm) {
      return (
        <Form warning={invalidForm}>
          <Form.Input
            placeholder="Give it a title!"
            name="title"
            value={title}
            onChange={this.changeValue}
          />
          <Form.TextArea
            placeholder="Write your post!"
            name="body"
            value={body}
            rows="5"
            onChange={this.changeValue}
          />
          <Message size="mini" warning>
            It will be great if you put some words in the post and give it a
            cool title.
          </Message>
          <Button
            size="tiny"
            icon="send"
            primary
            loading={updatingPost}
            disabled={deletingPost || updatingPost}
            onClick={() => this.updatePost()}
          />
          <Button
            size="tiny"
            icon="cancel"
            color="orange"
            disabled={deletingPost || updatingPost}
            onClick={() => this.toggleUpdateForm(false)}
          />
        </Form>
      );
    }
    return (
      <div>
        <div style={{ fontWeight: "bold", fontStyle: "italic" }}>{title}</div>
        {body}
      </div>
    );
  };

  async componentDidMount() {
    const { post } = this.props;
    this.setState({
      userId: post.userId,
      id: post.id,
      title: post.title,
      body: post.body
    });
  }

  render() {
    const { deletingPost, updatingPost, opacity } = this.state;
    const { user } = this.props;

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
          size="mini"
          style={{ marginLeft: "50px" }}
          onClick={() => this.toggleComments()}
        >
          {this.commentButtonContent()}
        </Button>
        <Button
          size="tiny"
          color="red"
          floated="right"
          icon="trash"
          loading={deletingPost}
          disabled={deletingPost || updatingPost}
          onClick={() => this.deletePost()}
        />
        <Button
          size="tiny"
          color="yellow"
          floated="right"
          icon="pencil"
          loading={updatingPost}
          disabled={deletingPost || updatingPost}
          onClick={() => this.toggleUpdateForm(true)}
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
