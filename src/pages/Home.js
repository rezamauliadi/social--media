import React, { Component } from "react";

import MenuBar from "src/components/MenuBar";
import Post from "src/components/Post";
import CreateForm from "src/components/CreateForm";
import { Container, Dimmer, Header, Loader, Segment } from "semantic-ui-react";

import API from "src/api";

class Home extends Component {
  state = {
    users: [],
    posts: [],
    loading: true
  };

  getUsers = async () => {
    const users = await API.retrieveUsers();
    this.setState({ users });
  };

  getPosts = async () => {
    const posts = await API.retrievePosts();
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

  getUser = (post, users) => users.find(user => user.id === post.userId);

  homeFeeds = () => {
    const { loading, posts, users } = this.state;

    if (loading) {
      return (
        <Dimmer active>
          <Loader />
        </Dimmer>
      );
    }

    return posts.map(post => (
      <Post
        key={post.id}
        post={post}
        user={this.getUser(post, users)}
        onDeletePost={this.removePost}
        onUpdatePost={this.updatePost}
      />
    ));
  };

  async componentDidMount() {
    await this.getUsers();
    await this.getPosts();
    this.setState({ loading: false });
  }

  render() {
    return (
      <div>
        <MenuBar active="home" />

        <div style={{ background: "rgba(0, 0, 0, 0.08)", padding: "30px 0" }}>
          <Container text>
            <Header as="h2">Your Feed</Header>
            <Segment>
              <CreateForm type="posts" onSubmit={this.pushNewPost} />
              <div style={{ padding: "24px" }}>{this.homeFeeds()}</div>
            </Segment>
          </Container>
        </div>
      </div>
    );
  }
}

export default Home;
