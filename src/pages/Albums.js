import React, { Component } from "react";
import { Link } from "react-router-dom";

import { Card, Image, Loader } from "semantic-ui-react";

class Albums extends Component {
  state = {
    albums: [],
    loading: true
  };

  async getUserAlbums(id) {
    const url = `http://jsonplaceholder.typicode.com/albums?userId=${id}`;
    const response = await fetch(url);
    const data = await response.json();
    this.setState({ albums: data });
  }

  async componentDidMount() {
    await this.getUserAlbums(this.props.user.id);
    this.setState({ loading: false });
  }

  userPosts = () => {
    const cardTitleStyle = {
      width: "140px",
      whiteSpace: "nowrap",
      overflow: "hidden",
      textOverflow: "ellipsis"
    };

    return (
      <div style={{ padding: "12px 24px" }}>
        <Card.Group itemsPerRow={3}>
          {this.state.albums.map(album => (
            <Card
              key={album.id}
              as={Link}
              to={`${this.props.url}/photos/${album.id}`}
              color="blue"
            >
              <Image src="/images/placeholder.png" wrapped ui={false} />
              <Card.Content>
                <Card.Header style={cardTitleStyle}>{album.title}</Card.Header>
              </Card.Content>
            </Card>
          ))}
        </Card.Group>
      </div>
    );
  };

  renderUserPosts = () => {
    if (this.state.loading) {
      return <Loader />;
    } else {
      return <div>{this.userPosts()}</div>;
    }
  };

  render() {
    return this.renderUserPosts();
  }
}

export default Albums;
