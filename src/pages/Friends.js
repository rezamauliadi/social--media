import React, { Component } from "react";

import MenuBar from "src/components/MenuBar";
import UserList from "src/components/UserList";

import { Container, Dimmer, Header, Loader, Segment } from "semantic-ui-react";

class Friends extends Component {
  state = {
    users: [],
    loading: true
  };

  async getUsers() {
    const response = await fetch("http://jsonplaceholder.typicode.com/users");
    const data = await response.json();
    this.setState({ users: data });
  }

  async componentDidMount() {
    await this.getUsers();
    this.setState({ loading: false });
  }

  userList = () => {
    if (this.state.loading) {
      return (
        <Dimmer active>
          <Loader />
        </Dimmer>
      );
    } else {
      return <UserList users={this.state.users} />;
    }
  };

  render() {
    return (
      <div>
        <MenuBar active="friends" />

        <div style={{ background: "rgba(0, 0, 0, 0.08)", padding: "30px 0" }}>
          <Container text>
            <Header as="h2">Friends</Header>
            <Segment>
              <div style={{ padding: "24px" }}>{this.userList()}</div>
            </Segment>
          </Container>
        </div>
      </div>
    );
  }
}

export default Friends;
