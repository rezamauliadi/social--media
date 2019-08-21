import React, { Component } from "react";
import PropTypes from "prop-types";

import { Button, Comment, Label, Loader } from "semantic-ui-react";
import CommentItem from "src/components/CommentItem";
import CreateForm from "src/components/CreateForm";

import API from "src/api";

class CommentList extends Component {
  state = {
    comments: [],
    showComments: false,
    hasFetchComments: false,
    fetchingComments: false,
    commentButtonText: "Show Comments"
  };

  getComments = async () => {
    const { postId } = this.props;
    const comments = await API.retrieveCommentsByPost(postId);
    return comments;
  };

  pushNewComment = newComment => {
    const comments = [...this.state.comments];
    comments.push(newComment);
    this.setState({ comments });
  };

  updateComment = updatedComment => {
    const { comments } = this.state;
    const commentIndex = comments.findIndex(
      comment => comment.id === updatedComment.id
    );
    const newCommenttList = [...comments];
    newCommenttList.splice(commentIndex, 1, updatedComment);
    this.setState({ comments: newCommenttList });
  };

  removeComment = commentId => {
    const { comments } = this.state;
    const commentIndex = comments.findIndex(
      comment => comment.id === commentId
    );
    const newCommenttList = [...comments];
    newCommenttList.splice(commentIndex, 1);
    this.setState({ comments: newCommenttList });
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

  createCommentForm = () => {
    return (
      <div style={{ marginTop: "18px" }}>
        <CreateForm type="comments" onSubmit={this.pushNewComment} />
      </div>
    );
  };

  commentList = () => {
    const { comments } = this.state;
    const { postId } = this.props;
    return comments.map(comment => (
      <CommentItem
        comment={comment}
        key={`${postId}-${comment.id}`}
        onUpdateComment={this.updateComment}
        onDeleteComment={this.removeComment}
      />
    ));
  };

  renderComments = () => {
    const { comments, hasFetchComments, showComments } = this.state;

    if (comments.length && showComments) {
      return (
        <div>
          {this.commentList()}
          {this.createCommentForm()}
        </div>
      );
    } else if (!comments.length && hasFetchComments && showComments) {
      return (
        <div>
          <Label basic>No comment yet...</Label>
          {this.createCommentForm()}
        </div>
      );
    }
    return <div />;
  };

  render() {
    return (
      <div>
        <Button
          size="mini"
          style={{ marginLeft: "50px" }}
          onClick={() => this.toggleComments()}
        >
          {this.commentButtonContent()}
        </Button>
        <Comment.Group style={{ marginLeft: "60px" }}>
          {this.renderComments()}
        </Comment.Group>
      </div>
    );
  }
}

CommentList.propTypes = {
  postId: PropTypes.number
};

export default CommentList;
