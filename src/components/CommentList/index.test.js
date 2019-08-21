import React from "react";
import { shallow } from "enzyme";

import CommentList from "./index.js";
import dummy from "./dummy.js";
import API from "src/api";

describe("Component: CommentList", () => {
  const props = { postId: 1 };

  it("should match snapshot", () => {
    const component = shallow(<CommentList {...props} />);
    expect(component).toMatchSnapshot();
  });

  describe("button call", () => {
    it("should call submitItem when submit button clicked", () => {
      const component = shallow(<CommentList {...props} />);
      const instance = component.instance();

      jest.spyOn(instance, "toggleComments");
      component
        .find("Button")
        .at(0)
        .simulate("click");
      expect(instance.toggleComments).toHaveBeenCalled();
    });
  });

  describe("renderComments", () => {
    it("should match snapshot if has comments", () => {
      const component = shallow(<CommentList {...props} />);
      component.setState({ comments: dummy, showComments: true });

      expect(component).toMatchSnapshot();
    });

    it("should match snapshot if has no comments and has fetch comment", () => {
      const component = shallow(<CommentList {...props} />);
      component.setState({
        comments: [],
        hasFetchComments: true,
        showComments: true
      });

      expect(component).toMatchSnapshot();
    });
  });

  describe("toggleComments", () => {
    it("should set correct button text when has comments", () => {
      const component = shallow(<CommentList {...props} />);
      const instance = component.instance();

      component.setState({ comments: dummy, showComments: false });
      instance.toggleComments();

      expect(component.state("showComments")).toBe(true);
      expect(component.state("commentButtonText")).toBe("Hide Comments");
    });

    it("should set correct button text when has no comments and has fetch", () => {
      const component = shallow(<CommentList {...props} />);
      const instance = component.instance();

      component.setState({
        comments: dummy,
        showComments: false,
        hasFetchComments: true
      });
      instance.toggleComments();

      expect(component.state("showComments")).toBe(true);
      expect(component.state("commentButtonText")).toBe("Hide Comments");
    });

    it("should call getComments and set correct button text when has no comments", done => {
      const component = shallow(<CommentList {...props} />);
      const instance = component.instance();

      jest.spyOn(instance, "getComments").mockImplementation(() => dummy);
      component.setState({
        comments: [],
        showComments: false,
        hasFetchComments: false
      });
      instance.toggleComments();

      process.nextTick(() => {
        expect(instance.getComments).toHaveBeenCalled();
        expect(component.state("showComments")).toBe(true);
        expect(component.state("commentButtonText")).toBe("Hide Comments");
        done();
      });
    });

    it("should set correct button text when showComment is true", () => {
      const component = shallow(<CommentList {...props} />);
      const instance = component.instance();

      component.setState({ showComments: true });
      instance.toggleComments();

      expect(component.state("showComments")).toBe(false);
      expect(component.state("commentButtonText")).toBe("Show Comments");
    });
  });

  describe("removeComment", () => {
    it("should remove specific comment by id", () => {
      const component = shallow(<CommentList {...props} />);
      const instance = component.instance();

      const commentId = 2;
      const commentIndex = 1;
      const expected = [...dummy];
      expected.splice(commentIndex, 1);

      component.setState({ comments: dummy });
      instance.removeComment(commentId);

      expect(component.state("comments")).toEqual(expected);
    });
  });

  describe("updateComment", () => {
    const updatedComment = {
      postId: 1,
      id: 2,
      name: "updated",
      body: "updated",
      email: "email@email.com"
    };

    it("should update specific comment by id", () => {
      const component = shallow(<CommentList {...props} />);
      const instance = component.instance();

      const commentIndex = 1;
      const expected = [...dummy];
      expected.splice(commentIndex, 1, updatedComment);

      component.setState({ comments: dummy });
      instance.updateComment(updatedComment);

      expect(component.state("comments")).toEqual(expected);
    });
  });

  describe("pushNewComment", () => {
    const newComment = {
      postId: 1,
      id: 4,
      name: "new",
      body: "new",
      email: "email@email.com"
    };

    it("should add new comment", () => {
      const component = shallow(<CommentList {...props} />);
      const instance = component.instance();

      const expected = [...dummy];
      expected.push(newComment);

      component.setState({ comments: dummy });
      instance.pushNewComment(newComment);

      expect(component.state("comments")).toEqual(expected);
    });
  });

  describe("getComments", () => {
    it("should call retrieveCommentsByPost", done => {
      const component = shallow(<CommentList {...props} />);
      const instance = component.instance();

      jest.spyOn(API, "retrieveCommentsByPost").mockImplementation(() => dummy);

      instance.getComments();
      process.nextTick(() => {
        expect(API.retrieveCommentsByPost).toHaveBeenCalled();
        done();
      });
    });
  });
});
