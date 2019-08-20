import React, { Component } from "react";

import { Loader } from "semantic-ui-react";
import Post from "src/components/Post";

class Posts extends Component {
  state = {
    posts: [],
    loading: true
  };

  async getUserPosts(id) {
    const url = `http://jsonplaceholder.typicode.com/posts?userId=${id}`;
    const response = await fetch(url);
    const data = await response.json();
    this.setState({ posts: data });
  }

  async componentDidMount() {
    await this.getUserPosts(this.props.user.id);
    this.setState({ loading: false });
  }

  userPosts = () => {
    return (
      <div style={{ padding: "12px 24px" }}>
        {this.state.posts.map(post => (
          <Post key={post.id} post={post} user={this.props.user} />
        ))}
      </div>
    );
  };

  renderUserPosts = () => {
    if (this.state.loading) {
      return <Loader />;
    } else {
      return <div>{this.userPosts()}</div>;
    }
  };

  render() {
    return this.renderUserPosts();
  }
}

export default Posts;
