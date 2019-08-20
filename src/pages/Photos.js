import React, { Component } from "react";
import { Link } from "react-router-dom";

import { Button, Dimmer, Header, Icon, Loader } from "semantic-ui-react";
import PhotoCard from "src/components/PhotoCard";

class Photos extends Component {
  state = {
    album: {},
    photos: [],
    loading: true
  };

  async getAlbum(id) {
    const url = `http://jsonplaceholder.typicode.com/albums/${id}`;
    const response = await fetch(url);
    const data = await response.json();
    this.setState({ album: data });
  }

  async getAlbumPhotos(id) {
    const url = `http://jsonplaceholder.typicode.com/photos?albumId=${id}`;
    const response = await fetch(url);
    const data = await response.json();
    this.setState({ photos: data });
  }

  async componentDidMount() {
    const albumId = this.props.match.params.albumId;
    await this.getAlbum(albumId);
    await this.getAlbumPhotos(albumId);
    this.setState({ loading: false });
  }

  renderAlbumPhotos = () => {
    if (this.state.loading) {
      return (
        <Dimmer active>
          <Loader />
        </Dimmer>
      );
    } else {
      return (
        <div>
          <Button
            as={Link}
            to={`/users/${this.props.match.params.userId}/albums`}
          >
            Back
          </Button>
          <Header as="h2" style={{ marginBottom: "6px" }}>
            Album: {this.state.album.title}
          </Header>
          <Header
            as="h5"
            style={{ marginTop: "0", color: "rgba(0, 0, 0, 0.3)" }}
          >
            <Icon name="image" size="tiny" />
            {this.state.photos.length} photos
          </Header>

          <div style={{ padding: "12px 24px" }}>
            <PhotoCard items={this.state.photos} />
          </div>
        </div>
      );
    }
  };

  render() {
    return this.renderAlbumPhotos();
  }
}

export default Photos;
