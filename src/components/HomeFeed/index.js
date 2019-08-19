import React from "react";
import PropTypes from "prop-types";

import { Feed, Image } from "semantic-ui-react";

import getAvatar from "src/helpers/avatar-helper";

const HomeFeed = ({ post, users }) => {
  const getUser = () => users.find(user => user.id === post.userId);

  const user = getUser();

  return (
    <Feed>
      <Feed.Event>
        <Feed.Label>
          <Image src={getAvatar(user.id)} />
        </Feed.Label>
        <Feed.Content>
          <Feed.Summary>
            <a>{user.name}</a> posted
          </Feed.Summary>
          <Feed.Extra text>{post.body}</Feed.Extra>
        </Feed.Content>
      </Feed.Event>
    </Feed>
  );
};

HomeFeed.propTypes = {
  post: PropTypes.object,
  users: PropTypes.array
};

export default HomeFeed;
