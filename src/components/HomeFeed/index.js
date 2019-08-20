import React from "react";
import PropTypes from "prop-types";

import Post from "src/components/Post";

const HomeFeed = ({ post, users }) => {
  const getUser = () => users.find(user => user.id === post.userId);

  return <Post post={post} user={getUser()} />;
};

HomeFeed.propTypes = {
  post: PropTypes.object,
  users: PropTypes.array
};

export default HomeFeed;
