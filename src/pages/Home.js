import React, { Component } from "react";

import MenuBar from "src/components/MenuBar";
import Post from "src/components/Post";
import PostForm from "src/components/PostForm";

import { Container, Dimmer, Header, Loader, Segment } from "semantic-ui-react";

class Home extends Component {
  state = {
    users: [],
    posts: [],
    loading: true
  };

  async getUsers() {
    const response = await fetch("http://jsonplaceholder.typicode.com/users");
    const data = await response.json();
    this.setState({ users: data });
  }

  async getPosts() {
    const response = await fetch("http://jsonplaceholder.typicode.com/posts");
    const data = await response.json();
    this.setState({ posts: data });
  }

  async componentDidMount() {
    await this.getUsers();
    await this.getPosts();
    this.setState({ loading: false });
  }

  pushNewPost = newPost => {
    const newPostList = [newPost, ...this.state.posts];
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
    } else {
      return posts.map(post => (
        <Post key={post.id} post={post} user={this.getUser(post, users)} />
      ));
    }
  };

  render() {
    return (
      <div>
        <MenuBar active="home" />

        <div style={{ background: "rgba(0, 0, 0, 0.08)", padding: "30px 0" }}>
          <Container text>
            <Header as="h2">Your Feed</Header>
            <Segment>
              <PostForm pushNewPost={this.pushNewPost} />
              <div style={{ padding: "24px" }}>{this.homeFeeds()}</div>
            </Segment>
          </Container>
        </div>
      </div>
    );
  }
}

export default Home;
