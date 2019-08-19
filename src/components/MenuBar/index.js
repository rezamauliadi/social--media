import React, { Component } from "react";
import PropTypes from "prop-types";

import { Link } from "react-router-dom";
import { Container, Divider, Header, Image, Menu } from "semantic-ui-react";

import getAvatar from "src/helpers/avatar-helper";

const MenuBar = ({ active }) => {
  const menus = [
    { route: "/", name: "Home", key: "home" },
    { route: "/friends", name: "Friends", key: "friends" }
  ];

  const isActive = key => key === active;

  return (
    <div>
      <Container text>
        <Menu style={{ marginTop: "1rem" }} secondary>
          {menus.map((menu, index) => (
            <Menu.Item
              as={Link}
              to={menu.route}
              key={index}
              name={menu.name}
              active={isActive(menu.key)}
              style={{ marginTop: "6px" }}
            />
          ))}
          <Menu.Menu position="right">
            <Menu.Item>
              <Header as="h4">
                <Image src={getAvatar(0)} avatar />
                Hi! You
              </Header>
            </Menu.Item>
          </Menu.Menu>
        </Menu>
      </Container>

      <Divider style={{ marginBottom: "0" }} />
    </div>
  );
};

MenuBar.propTypes = {
  active: PropTypes.string
};

export default MenuBar;
