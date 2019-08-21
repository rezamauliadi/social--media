import React, { Component } from "react";
import PropTypes from "prop-types";

import { Button, Form, Message } from "semantic-ui-react";

import API from "src/api";

class UpdateForm extends Component {
  state = {
    id: 0,
    body: "",
    title: "",
    type: "",
    tempBody: "",
    tempTitle: "",
    invalid: false,
    loading: false,
    maxDummyId: {
      posts: 100,
      comments: 500
    }
  };

  changeValue = (_event, { name, value }) => {
    this.setState({ [name]: value });
  };

  getPayload = type => {
    const { id, body, title } = this.state;

    if (type === "posts") {
      const { parentId: userId } = this.props;
      return { id, title, body, userId };
    }

    const { parentId: postId, additionalInfo: email } = this.props;
    return {
      id,
      body,
      postId,
      email,
      name: title
    };
  };

  submitForm = async () => {
    this.setState({ loading: true, invalid: false });

    const { id, body, title, maxDummyId } = this.state;
    const { type } = this.props;

    if (!body || !title) {
      this.setState({ loading: false, invalid: true });
      return;
    }

    const payload = this.getPayload(type);
    if (id > maxDummyId[type]) {
      this.setState({ loading: false });
      this.props.afterSubmit(payload);
    } else {
      const endpoint = type === "posts" ? API.updatePost : API.updateComment;
      const item = await endpoint(payload, id);
      this.setState({ loading: false });
      this.props.afterSubmit(item);
    }
  };

  closeForm = () => {
    const { tempTitle, tempBody } = this.state;
    this.props.onClose(tempTitle, tempBody);
  };

  async componentDidMount() {
    const { id, title, body, type } = this.props;
    this.setState({
      id,
      title,
      body,
      type,
      tempBody: body,
      tempTitle: title
    });
  }

  render() {
    const { body, title, invalid, loading } = this.state;

    return (
      <Form warning={invalid}>
        <Form.Input
          placeholder="Give it a title!"
          name="title"
          value={title}
          onChange={this.changeValue}
        />
        <Form.TextArea
          placeholder="Write your post!"
          name="body"
          value={body}
          rows="5"
          onChange={this.changeValue}
        />
        <Message size="mini" warning>
          It will be great if you put some words in the post and give it a cool
          title.
        </Message>
        <Button
          size="tiny"
          icon="send"
          primary
          loading={loading}
          disabled={loading}
          onClick={() => this.submitForm()}
        />
        <Button
          size="tiny"
          icon="cancel"
          color="orange"
          disabled={loading}
          onClick={() => this.closeForm()}
        />
      </Form>
    );
  }
}

UpdateForm.propTypes = {
  id: PropTypes.number,
  parentId: PropTypes.number,
  type: PropTypes.string,
  title: PropTypes.string,
  body: PropTypes.string,
  additionalInfo: PropTypes.string,
  onClose: PropTypes.func,
  afterSubmit: PropTypes.func
};

export default UpdateForm;
