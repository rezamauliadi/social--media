import React from "react";
import PropTypes from "prop-types";

import { Comment, Label } from "semantic-ui-react";

import getAvatar from "src/helpers/avatar-helper";

const PostComment = ({ comment }) => {
  return (
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
          <div style={{ fontWeight: "bold", fontStyle: "italic" }}>
            {comment.name}
          </div>
          {comment.body}
        </Comment.Text>
      </Comment.Content>
    </Comment>
  );
};

PostComment.propTypes = {
  comment: PropTypes.object
};

export default PostComment;
