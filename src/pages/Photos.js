import React, { Component } from "react";
import { Link } from "react-router-dom";

import { Button, Dimmer, Header, Icon, Loader } from "semantic-ui-react";
import PhotoCard from "src/components/PhotoCard";
import ModalPhoto from "src/components/ModalPhoto";

import API from "src/api";

class Photos extends Component {
  state = {
    album: {},
    photos: [],
    photo: {},
    loading: true,
    showPhoto: false
  };

  getAlbum = async albumId => {
    const album = await API.retrieveAlbum(albumId);
    this.setState({ album });
  };

  getAlbumPhotos = async albumId => {
    const photos = await API.retrievePhotosByAlbum(albumId);
    this.setState({ photos });
  };

  openPhoto = async id => {
    const photo = await API.retrievePhoto(id);
    this.setState({ showPhoto: true, photo });
  };

  closePhoto = () => {
    this.setState({ showPhoto: false });
  };

  renderAlbumPhotos = () => {
    const { loading, album, photos, showPhoto, photo } = this.state;

    if (loading) {
      return (
        <Dimmer active>
          <Loader />
        </Dimmer>
      );
    }

    const { userId } = this.props.match.params;
    return (
      <div>
        <Button as={Link} to={`/users/${userId}/albums`}>
          Back
        </Button>
        <Header as="h2" style={{ marginBottom: "6px" }}>
          Album: {album.title}
        </Header>
        <Header as="h5" style={{ marginTop: "0", color: "rgba(0, 0, 0, 0.3)" }}>
          <Icon name="image" size="tiny" />
          {photos.length} photos
        </Header>

        <div style={{ padding: "12px 24px" }}>
          <PhotoCard items={photos} onPhotoClick={this.openPhoto} />
        </div>
        <ModalPhoto
          showPhoto={showPhoto}
          photo={photo}
          onModalClose={this.closePhoto}
        />
      </div>
    );
  };

  async componentDidMount() {
    const { albumId } = this.props.match.params;
    await this.getAlbum(albumId);
    await this.getAlbumPhotos(albumId);
    this.setState({ loading: false });
  }

  render() {
    return this.renderAlbumPhotos();
  }
}

export default Photos;
