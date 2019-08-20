import React from "react";
import PropTypes from "prop-types";

import { Comment } from "semantic-ui-react";

import getAvatar from "src/helpers/avatar-helper";

const PostComment = ({ comment }) => {
  const nameStyle = {
    width: "70%",
    whiteSpace: "nowrap",
    overflow: "hidden",
    textOverflow: "ellipsis",
    display: "inline-block"
  };

  const metaStyle = {
    marginLeft: "0",
    display: "block"
  };

  return (
    <Comment>
      <Comment.Avatar style={{ height: "35px" }} src={getAvatar(11)} />
      <Comment.Content>
        <Comment.Metadata style={metaStyle}>
          <div>1 day ago</div>
        </Comment.Metadata>
        <Comment.Author as="a" style={nameStyle}>
          {comment.name}
        </Comment.Author>
        <Comment.Text>{comment.body}</Comment.Text>
      </Comment.Content>
    </Comment>
  );
};

PostComment.propTypes = {
  comment: PropTypes.object
};

export default PostComment;
