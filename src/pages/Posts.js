import React, { Component } from "react";

import { Dimmer, Header, Loader } from "semantic-ui-react";
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

  renderUserPosts = () => {
    if (this.state.loading) {
      return (
        <Dimmer active>
          <Loader />
        </Dimmer>
      );
    } else {
      return (
        <div style={{ padding: "12px 24px" }}>
          <Header as="h2" style={{ marginBottom: "30px" }}>
            {this.props.user.name}'s posts
          </Header>
          {this.state.posts.map(post => (
            <Post key={post.id} post={post} user={this.props.user} />
          ))}
        </div>
      );
    }
  };

  render() {
    return this.renderUserPosts();
  }
}

export default Posts;
