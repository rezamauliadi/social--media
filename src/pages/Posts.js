import React, { Component } from "react";

import { Dimmer, Divider, Header, Loader } from "semantic-ui-react";
import Post from "src/components/Post";
import PostForm from "src/components/PostForm";

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

  pushNewPost = newPost => {
    const newPostList = [newPost, ...this.state.posts];
    this.setState({ posts: newPostList });
  };

  renderUserPosts = () => {
    const { loading, posts } = this.state;
    const { user } = this.props;

    if (loading) {
      return (
        <Dimmer active>
          <Loader />
        </Dimmer>
      );
    } else {
      return (
        <div style={{ padding: "12px 24px" }}>
          <Header as="h2">{user.name}'s posts</Header>

          <PostForm pushNewPost={this.pushNewPost} />
          <Divider style={{ margin: "30px 0" }} />

          {posts.map(post => (
            <Post key={post.id} post={post} user={user} />
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
