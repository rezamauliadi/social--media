import React, { Component } from "react";

import { Button, Comment, Label } from "semantic-ui-react";
import UpdateForm from "src/components/UpdateForm";

import API from "src/api";
import getAvatar from "src/helpers/avatar-helper";

class CommentItem extends Component {
  state = {
    showUpdateForm: false,
    deletingComment: false,
    opacity: "1"
  };

  deleteComment = async () => {
    this.setState({ deletingComment: true });

    const { id } = this.props.comment;
    const status = await API.deleteComment(id);

    if (status === 200) {
      this.setState({ opacity: "0", deletingComment: false });
      setTimeout(() => {
        this.props.onDeleteComment(id);
      }, 500);
    }
  };

  afterSubmitForm = updatedComment => {
    this.props.onUpdateComment(updatedComment);
    this.setState({ showUpdateForm: false });
  };

  openUpdateForm = () => {
    this.setState({ showUpdateForm: true });
  };

  closeUpdateForm = () => {
    this.setState({ showUpdateForm: false });
  };

  renderCommentContent = () => {
    const { showUpdateForm } = this.state;
    const { comment } = this.props;

    if (showUpdateForm) {
      return (
        <UpdateForm
          type="comments"
          id={comment.id}
          title={comment.name}
          body={comment.body}
          parentId={comment.postId}
          additionalInfo={comment.email}
          onClose={this.closeUpdateForm}
          afterSubmit={this.afterSubmitForm}
        />
      );
    }

    return (
      <div>
        <div style={{ fontWeight: "bold", fontStyle: "italic" }}>
          {comment.name}
        </div>
        <div>{comment.body}</div>
      </div>
    );
  };

  render() {
    const { opacity, deletingComment, showUpdateForm } = this.state;
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
                  disabled={deletingComment}
                  onClick={() => this.openUpdateForm()}
                />
                <Button
                  basic
                  size="tiny"
                  icon="trash"
                  loading={deletingComment}
                  disabled={deletingComment}
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
