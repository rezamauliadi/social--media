import React, { Component } from "react";

import MenuBar from "src/components/MenuBar";
import HomeFeed from "src/components/HomeFeed";

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

  homeFeeds = () => {
    if (this.state.loading) {
      return (
        <Dimmer active>
          <Loader />
        </Dimmer>
      );
    } else {
      return this.state.posts.map((post, index) => (
        <HomeFeed key={index} post={post} users={this.state.users} />
      ));
    }
  };

  render() {
    return (
      <div>
        <MenuBar active="home" />

        <div style={{ background: "rgba(0, 0, 0, 0.08)", padding: "30px 0" }}>
          <Container text>
            <Header as="h2">Home Feed</Header>
            <Segment>
              <div style={{ padding: "24px" }}>{this.homeFeeds()}</div>
            </Segment>
          </Container>
        </div>
      </div>
    );
  }
}

export default Home;
