import React, { Component } from "react";

import { Dimmer, Header, Loader } from "semantic-ui-react";
import PhotoCard from "src/components/PhotoCard";

class Albums extends Component {
  state = {
    albums: [],
    loading: true
  };

  async getUserAlbums(id) {
    const url = `http://jsonplaceholder.typicode.com/albums?userId=${id}`;
    const response = await fetch(url);
    const data = await response.json();
    const newData = data.map(d => {
      const album = d;
      album.thumbnailUrl = "/images/placeholder.png";
      album.url = `${this.props.userUrl}/photos/${album.id}`;
      return album;
    });
    this.setState({ albums: newData });
  }

  async componentDidMount() {
    await this.getUserAlbums(this.props.user.id);
    this.setState({ loading: false });
  }

  renderUserAlbums = () => {
    if (this.state.loading) {
      return (
        <Dimmer active>
          <Loader />
        </Dimmer>
      );
    } else {
      return (
        <div style={{ padding: "12px 24px" }}>
          <Header as="h2" style={{ marginBottom: "30px" }}>
            {this.props.user.name}'s albums
          </Header>
          <PhotoCard items={this.state.albums} isAlbum={true} />
        </div>
      );
    }
  };

  render() {
    return this.renderUserAlbums();
  }
}

export default Albums;
