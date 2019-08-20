import React, { Component } from "react";
import { Route, Link } from "react-router-dom";

import {
  Button,
  Container,
  Dimmer,
  Icon,
  Item,
  Label,
  Loader,
  Segment
} from "semantic-ui-react";
import MenuBar from "src/components/MenuBar";
import Posts from "./Posts";
import Albums from "./Albums";
import Photos from "./Photos";

import getAvatar from "src/helpers/avatar-helper";

class User extends Component {
  state = {
    user: {},
    loading: true
  };

  async getUser(id) {
    const url = `http://jsonplaceholder.typicode.com/users/${id}`;
    const response = await fetch(url);
    const data = await response.json();
    this.setState({ user: data });
  }

  async componentDidMount() {
    const userId = this.props.match.params.userId;
    await this.getUser(userId);
    this.setState({ loading: false });
  }

  userInfoSegment = () => {
    return (
      <Segment>
        <div style={{ padding: "12px 24px" }}>
          <Item.Group>
            <Item>
              <Item.Image size="tiny" src={getAvatar(this.state.user.id)} />
              <Item.Content>
                <Item.Header as="a">{this.state.user.name}</Item.Header>
                <Item.Meta>{this.state.user.username}</Item.Meta>
                <Item.Description>
                  <Label as="a">
                    <Icon name="mail" />
                    {this.state.user.email.toLowerCase()}
                  </Label>
                  <Label as="a">
                    <Icon name="map pin" />
                    {this.state.user.address.city}
                  </Label>
                </Item.Description>
              </Item.Content>
            </Item>
          </Item.Group>
          <Button as={Link} to={`${this.props.match.url}/posts`} primary>
            <Icon name="chat" />
            Posts
          </Button>
          <Button as={Link} to={`${this.props.match.url}/albums`} primary>
            <Icon name="image" />
            Albums
          </Button>
        </div>
      </Segment>
    );
  };

  renderUserPage = () => {
    if (this.state.loading) {
      return (
        <Dimmer active>
          <Loader />
        </Dimmer>
      );
    } else {
      const props = {
        user: this.state.user,
        userUrl: this.props.match.url
      };
      return (
        <Container text>
          {this.userInfoSegment()}

          <Segment>
            <div style={{ padding: "12px 24px" }}>
              <Route
                path="/users/:userId/posts"
                render={() => <Posts {...props} />}
              />
              <Route
                path="/users/:userId/albums"
                render={() => <Albums {...props} />}
              />
              <Route path="/users/:userId/photos/:albumId" component={Photos} />
            </div>
          </Segment>
        </Container>
      );
    }
  };

  render() {
    return (
      <div>
        <MenuBar />

        <div style={{ background: "rgba(0, 0, 0, 0.08)", padding: "30px 0" }}>
          {this.renderUserPage()}
        </div>
      </div>
    );
  }
}

export default User;
