import React from "react";
import PropTypes from "prop-types";

import { Link } from "react-router-dom";
import { Divider, Feed, Image } from "semantic-ui-react";

import getAvatar from "src/helpers/avatar-helper";

const Post = ({ post, user }) => {
  return (
    <div>
      <Feed>
        <Feed.Event>
          <Feed.Label>
            <Image src={getAvatar(user.id)} />
          </Feed.Label>
          <Feed.Content>
            <Feed.Date>1 day ago</Feed.Date>
            <Feed.Summary>
              <Link to={`users/${user.id}`}>{user.name}</Link> posted!
            </Feed.Summary>
            <Feed.Extra text>{post.body}</Feed.Extra>
          </Feed.Content>
        </Feed.Event>
      </Feed>
      <Divider />
    </div>
  );
};

Post.propTypes = {
  post: PropTypes.object,
  users: PropTypes.array
};

export default Post;
