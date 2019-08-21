import React from "react";
import PropTypes from "prop-types";

import { Button, Image, Modal } from "semantic-ui-react";

const ModalPhoto = ({ photo, showPhoto, onModalClose }) => {
  return (
    <Modal open={showPhoto} onClose={onModalClose} closeIcon>
      <Modal.Header>Title: {photo.title}</Modal.Header>
      <Modal.Content>
        <center>
          <Image src={photo.url} style={{ zIndex: "1001" }} />
        </center>
      </Modal.Content>
      <Modal.Actions>
        <Button positive content="Nice!" onClick={onModalClose} />
      </Modal.Actions>
    </Modal>
  );
};

ModalPhoto.propTypes = {
  photo: PropTypes.object
};

export default ModalPhoto;
