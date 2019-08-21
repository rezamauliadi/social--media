import React, { Component } from "react";

import { Dimmer, Divider, Header, Loader } from "semantic-ui-react";
import Post from "src/components/Post";
import CreateForm from "src/components/CreateForm";

import API from "src/api";

class Posts extends Component {
  state = {
    posts: [],
    loading: true
  };

  getUserPosts = async () => {
    const posts = await API.retrievePostsByUser(this.props.user.id);
    this.setState({ posts });
  };

  pushNewPost = newPost => {
    const posts = [newPost, ...this.state.posts];
    this.setState({ posts });
  };

  updatePost = updatedPost => {
    const { posts } = this.state;
    const postIndex = posts.findIndex(post => post.id === updatedPost.id);
    const newPostList = [...posts];
    newPostList.splice(postIndex, 1, updatedPost);
    this.setState({ posts: newPostList });
  };

  removePost = postId => {
    const { posts } = this.state;
    const postIndex = posts.findIndex(post => post.id === postId);
    const newPostList = [...posts];
    newPostList.splice(postIndex, 1);
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
    }

    return (
      <div style={{ padding: "12px 24px" }}>
        <Header as="h2">{user.name}'s posts</Header>
        <CreateForm type="posts" onSubmit={this.pushNewPost} />
        <Divider style={{ margin: "30px 0" }} />

        {posts.map(post => (
          <Post
            key={post.id}
            post={post}
            user={user}
            onDeletePost={this.removePost}
            onUpdatePost={this.updatePost}
          />
        ))}
      </div>
    );
  };

  async componentDidMount() {
    await this.getUserPosts();
    this.setState({ loading: false });
  }

  render() {
    return this.renderUserPosts();
  }
}

export default Posts;
