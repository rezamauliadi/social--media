import React, { Component } from "react";

import MenuBar from "src/components/MenuBar";

import {
  Container,
  Dimmer,
  Item,
  Loader,
  Menu,
  Segment
} from "semantic-ui-react";

import Post from "src/components/Post";

import getAvatar from "src/helpers/avatar-helper";

class User extends Component {
  state = {
    user: {},
    posts: [],
    loading: true
  };

  async getUser(id) {
    const url = `http://jsonplaceholder.typicode.com/users/${id}`;
    const response = await fetch(url);
    const data = await response.json();
    this.setState({ user: data });
  }

  async getUserPosts(id) {
    const url = `http://jsonplaceholder.typicode.com/posts?userId=${id}`;
    const response = await fetch(url);
    const data = await response.json();
    this.setState({ posts: data });
  }

  async componentDidMount() {
    const userId = this.props.match.params.userId;
    await this.getUser(userId);
    await this.getUserPosts(userId);
    this.setState({ loading: false });
  }

  userPosts = () => {
    return (
      <Container text>
        <Segment>
          <div style={{ padding: "12px 24px" }}>
            <Item.Group>
              <Item>
                <Item.Image size="tiny" src={getAvatar(this.state.user.id)} />

                <Item.Content>
                  <Item.Header as="a">{this.state.user.name}</Item.Header>
                  <Item.Meta>{this.state.user.username}</Item.Meta>
                  <Item.Extra>{this.state.user.email}</Item.Extra>
                </Item.Content>
              </Item>
            </Item.Group>
          </div>
        </Segment>

        <Segment>
          <Menu pointing secondary>
            <Menu.Item name="posts" />
            <Menu.Item name="albums" />
          </Menu>
          <div style={{ padding: "12px 24px" }}>
            {this.state.posts.map(post => (
              <Post key={post.id} post={post} user={this.state.user} />
            ))}
          </div>
        </Segment>
      </Container>
    );
  };

  thisUser = () => {
    if (this.state.loading) {
      return (
        <Dimmer active>
          <Loader />
        </Dimmer>
      );
    } else {
      return <div>{this.userPosts()}</div>;
    }
  };

  render() {
    return (
      <div>
        <MenuBar />

        <div style={{ background: "rgba(0, 0, 0, 0.08)", padding: "30px 0" }}>
          {this.thisUser()}
        </div>
      </div>
    );
  }
}

export default User;
