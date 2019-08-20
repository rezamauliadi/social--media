import React, { Component } from "react";

import { Button, Form, Message } from "semantic-ui-react";

class PostForm extends Component {
  state = {
    userId: 1,
    body: "",
    title: "",
    invalid: false,
    loading: false
  };

  async addPost() {
    this.setState({ loading: true, invalid: false });

    const { body, title, userId } = this.state;
    if (!body || !title) {
      this.setState({ loading: false, invalid: true });
      return;
    }

    const response = await fetch("https://jsonplaceholder.typicode.com/posts", {
      method: "POST",
      body: JSON.stringify({ title, body, userId }),
      headers: {
        "Content-type": "application/json; charset=UTF-8"
      }
    });
    const createdPost = await response.json();
    this.props.onSubmitPost(createdPost);
    this.setState({ loading: false });
  }

  changeValue = (_event, { name, value }) => {
    this.setState({ [name]: value });
  };

  render() {
    const { body, title, invalid, loading } = this.state;

    return (
      <Form warning={invalid}>
        <Form.TextArea
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
          onClick={() => this.addPost()}
        />
      </Form>
    );
  }
}

export default PostForm;
