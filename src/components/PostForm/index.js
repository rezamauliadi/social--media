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

  getFetchSetting = () => {
    let payload = {};
    let url = "";

    const { body, title, userId } = this.state;
    if (this.props.type === "posts") {
      payload = { title, body, userId };
      url = "https://jsonplaceholder.typicode.com/posts";
    } else if (this.props.type === "comments") {
      payload = {
        body,
        name: title,
        postId: this.props.postId,
        email: "user@email.com"
      };
      url = "https://jsonplaceholder.typicode.com/comments";
    }
    return { payload, url };
  };

  submitItem = async () => {
    this.setState({ loading: true, invalid: false });

    const { body, title } = this.state;
    if (!body || !title) {
      this.setState({ loading: false, invalid: true });
      return;
    }

    const { payload, url } = this.getFetchSetting();
    const response = await fetch(url, {
      method: "POST",
      body: JSON.stringify(payload),
      headers: {
        "Content-type": "application/json; charset=UTF-8"
      }
    });
    const createdItem = await response.json();
    console.log(createdItem);
    this.props.onSubmit(createdItem);
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

export default PostForm;
