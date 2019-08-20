import React, { Component } from "react";

import MenuBar from "src/components/MenuBar";
import UserList from "src/components/UserList";
import { Container, Dimmer, Header, Loader, Segment } from "semantic-ui-react";

import API from "src/api";

class Friends extends Component {
  state = {
    users: [],
    loading: true
  };

  getUsers = async () => {
    const users = await API.retrieveUsers();
    this.setState({ users });
  };

  userList = () => {
    if (this.state.loading) {
      return (
        <Dimmer active>
          <Loader />
        </Dimmer>
      );
    }

    const url = this.props.match.url;
    return <UserList users={this.state.users} url={url} />;
  };

  async componentDidMount() {
    await this.getUsers();
    this.setState({ loading: false });
  }

  render() {
    return (
      <div>
        <MenuBar active="users" />

        <div style={{ background: "rgba(0, 0, 0, 0.08)", padding: "30px 0" }}>
          <Container text>
            <Header as="h2">Your Friends</Header>
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
