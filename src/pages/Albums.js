import React, { Component } from "react";

import { Dimmer, Header, Loader } from "semantic-ui-react";
import PhotoCard from "src/components/PhotoCard";

import API from "src/api";

class Albums extends Component {
  state = {
    albums: [],
    loading: true
  };

  getUserAlbums = async () => {
    const data = await API.retrieveAlbumsByUser(this.props.user.id);
    const albums = data.map(d => {
      const album = d;
      album.thumbnailUrl = "/images/placeholder.png";
      album.url = `${this.props.userUrl}/photos/${album.id}`;
      return album;
    });
    this.setState({ albums });
  };

  renderUserAlbums = () => {
    if (this.state.loading) {
      return (
        <Dimmer active>
          <Loader />
        </Dimmer>
      );
    }

    return (
      <div style={{ padding: "12px 24px" }}>
        <Header as="h2" style={{ marginBottom: "30px" }}>
          {this.props.user.name}'s albums
        </Header>
        <PhotoCard items={this.state.albums} isAlbum={true} />
      </div>
    );
  };

  async componentDidMount() {
    await this.getUserAlbums();
    this.setState({ loading: false });
  }

  render() {
    return this.renderUserAlbums();
  }
}

export default Albums;
