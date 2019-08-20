import React, { Component } from "react";
import { Route, Link } from "react-router-dom";

import {
  Container,
  Dimmer,
  Icon,
  Item,
  Label,
  Loader,
  Menu,
  Segment
} from "semantic-ui-react";
import MenuBar from "src/components/MenuBar";
import Posts from "./Posts";
import Albums from "./Albums";

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
                <Item.Extra>
                  <Label as="a">
                    <Icon name="mail" />
                    {this.state.user.email.toLowerCase()}
                  </Label>
                  <Label as="a">
                    <Icon name="map pin" />
                    {this.state.user.address.city}
                  </Label>
                </Item.Extra>
              </Item.Content>
            </Item>
          </Item.Group>
        </div>
      </Segment>
    );
  };

  userMenus = () => {
    const menus = [
      { route: `${this.props.match.url}/posts`, name: "Posts", key: "posts" },
      { route: `${this.props.match.url}/albums`, name: "Albums", key: "albums" }
    ];

    return (
      <Menu pointing secondary>
        {menus.map(menu => (
          <Menu.Item
            as={Link}
            to={menu.route}
            key={menu.key}
            name={menu.name}
          />
        ))}
      </Menu>
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
        url: this.props.match.url
      };
      return (
        <Container text>
          {this.userInfoSegment()}

          <Segment>
            {this.userMenus()}
            <div style={{ padding: "12px 24px" }}>
              <Route
                path="/users/:userId/posts"
                render={() => <Posts {...props} />}
              />
              <Route
                path="/users/:userId/albums"
                render={() => <Albums {...props} />}
              />
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
