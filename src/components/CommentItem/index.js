import React, { Component } from "react";

import { Button, Comment, Form, Label, Message } from "semantic-ui-react";

import API from "src/api";
import getAvatar from "src/helpers/avatar-helper";

class CommentItem extends Component {
  state = {
    id: 0,
    postId: 0,
    name: "",
    body: "",
    tempName: "",
    tempBody: "",
    showUpdateForm: false,
    deletingComment: false,
    updatingComment: false,
    invalidForm: false,
    opacity: "1",
    commentButtonText: "Show Comments"
  };

  changeValue = (_event, { name, value }) => {
    this.setState({ [name]: value });
  };

  updateComment = async () => {
    this.setState({ updatingComment: true, invalidForm: false });

    const { id, body, name, email, postId } = this.state;
    if (!body || !name) {
      this.setState({ updatingComment: false, invalidForm: true });
      return;
    }
    if (id > 500) {
      // handle comment id not found if exceed 500
      this.setState({ showUpdateForm: false, updatingComment: false });
      return;
    }

    const payload = { id, name, body, email, postId };
    const updatedComment = await API.updateComment(payload, id);

    this.props.onUpdateComment(updatedComment);
    this.setState({ showUpdateForm: false, updatingComment: false });
  };

  deleteComment = async () => {
    this.setState({ deletingComment: true });

    const { id } = this.state;
    const status = await API.deleteComment(id);

    if (status === 200) {
      this.setState({ opacity: "0", deletingComment: false });
      setTimeout(() => {
        this.props.onDeleteComment(id);
      }, 500);
    }
  };

  toggleUpdateForm = isOpen => {
    if (isOpen) {
      const { name, body } = this.state;
      this.setState({
        tempName: name,
        tempBody: body,
        showUpdateForm: isOpen
      });
    } else {
      const { tempName, tempBody } = this.state;
      this.setState({
        name: tempName,
        body: tempBody,
        showUpdateForm: isOpen
      });
    }
  };

  renderCommentContent = () => {
    const {
      name,
      body,
      showUpdateForm,
      invalidForm,
      deletingComment,
      updatingComment
    } = this.state;

    if (showUpdateForm) {
      return (
        <Form warning={invalidForm}>
          <Form.Input
            placeholder="Give it a title!"
            name="name"
            value={name}
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
            basic
            size="tiny"
            icon="send"
            loading={updatingComment}
            disabled={deletingComment || updatingComment}
            onClick={() => this.updateComment()}
          />
          <Button
            basic
            size="tiny"
            icon="cancel"
            disabled={deletingComment || updatingComment}
            onClick={() => this.toggleUpdateForm(false)}
          />
        </Form>
      );
    }
    return (
      <div>
        <div style={{ fontWeight: "bold", fontStyle: "italic" }}>{name}</div>
        <div>{body}</div>
      </div>
    );
  };

  async componentDidMount() {
    const { id, postId, name, email, body } = this.props.comment;
    this.setState({
      id,
      postId,
      name,
      email,
      body
    });
  }

  render() {
    const {
      opacity,
      deletingComment,
      updatingComment,
      showUpdateForm
    } = this.state;
    const { comment } = this.props;

    return (
      <div style={{ opacity, transition: "opacity 500ms linear" }}>
        <Comment>
          <Comment.Avatar style={{ height: "35px" }} src={getAvatar(11)} />
          <Comment.Content>
            <Comment.Author as="a">
              <Label size="small">{comment.email.toLowerCase()}</Label>
            </Comment.Author>
            <Comment.Metadata>
              <div>1 day ago</div>
            </Comment.Metadata>
            <Comment.Text>
              {this.renderCommentContent()}
              <div style={{ display: showUpdateForm ? "none" : "block" }}>
                <Button
                  basic
                  size="tiny"
                  icon="pencil"
                  loading={updatingComment}
                  disabled={deletingComment || updatingComment}
                  onClick={() => this.toggleUpdateForm(true)}
                />
                <Button
                  basic
                  size="tiny"
                  icon="trash"
                  loading={deletingComment}
                  disabled={deletingComment || updatingComment}
                  onClick={() => this.deleteComment()}
                />
              </div>
            </Comment.Text>
          </Comment.Content>
        </Comment>
      </div>
    );
  }
}

export default CommentItem;
