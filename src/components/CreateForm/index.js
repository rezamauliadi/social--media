import React, { Component } from "react";

import { Button, Form, Message } from "semantic-ui-react";

import API from "src/api";
class CreateForm extends Component {
  state = {
    userId: 1,
    body: "",
    title: "",
    invalid: false,
    loading: false
  };

  getPayload = type => {
    const { body, title, userId } = this.state;

    if (type === "posts") {
      return { title, body, userId };
    }
    return {
      body,
      name: title,
      postId: this.props.postId,
      email: "user@email.com"
    };
  };

  submitItem = async () => {
    this.setState({ loading: true, invalid: false });

    const { body, title } = this.state;
    if (!body || !title) {
      this.setState({ loading: false, invalid: true });
      return;
    }

    const { type } = this.props;
    const payload = this.getPayload(type);
    const endpoint = type === "posts" ? API.createPost : API.createComment;
    const item = await endpoint(payload);

    this.props.onSubmit(item);
    this.setState({ loading: false, title: "", body: "" });
  };

  changeValue = (_event, { name, value }) => {
    this.setState({ [name]: value });
  };

  render() {
    const { body, title, invalid, loading } = this.state;

    return (
      <Form warning={invalid}>
        <Form.TextArea
          style={{ marginBottom: "-8px" }}
          placeholder="Write your post!"
          name="body"
          value={body}
          onChange={this.changeValue}
        />
        <Form.Input
          placeholder="Give it a title!"
          name="title"
          value={title}
          onChange={this.changeValue}
        />
        <Message warning>
          It will be great if you put some words in the post and give it a cool
          title.
        </Message>
        <Button
          content="Post It!"
          labelPosition="left"
          icon="send"
          loading={loading}
          primary
          onClick={() => this.submitItem()}
        />
      </Form>
    );
  }
}

export default CreateForm;
