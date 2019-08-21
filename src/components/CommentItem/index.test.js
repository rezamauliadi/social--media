import React from "react";
import { shallow } from "enzyme";

import CommentItem from "./index.js";
import API from "src/api";

describe("Component: CommentItem", () => {
  const comment = {
    postId: 1,
    id: 1,
    name: "comment name",
    email: "email@email.com",
    body: "comment body"
  };
  const fnMock = jest.fn();
  const props = {
    comment,
    onUpdateComment: fnMock,
    onDeleteComment: fnMock
  };

  it("should match snapshot", () => {
    const component = shallow(<CommentItem {...props} />);
    expect(component).toMatchSnapshot();
  });

  describe("button click", () => {
    it("should call openUpdateForm when update button clicked", () => {
      const component = shallow(<CommentItem {...props} />);
      const instance = component.instance();

      jest.spyOn(instance, "openUpdateForm");
      component
        .find("Button")
        .at(0)
        .simulate("click");
      expect(instance.openUpdateForm).toHaveBeenCalled();
    });

    it("should call deleteComment when delete button clicked", () => {
      const component = shallow(<CommentItem {...props} />);
      const instance = component.instance();

      jest.spyOn(instance, "deleteComment");
      jest.spyOn(instance.props, "onDeleteComment");

      component
        .find("Button")
        .at(1)
        .simulate("click");
      expect(instance.deleteComment).toHaveBeenCalled();
      setTimeout(() => {
        expect(instance.props.onDeleteComment).toHaveBeenCalled();
      }, 500);
    });
  });

  describe("afterSubmitForm", () => {
    it("should call onUpdateComment", () => {
      const component = shallow(<CommentItem {...props} />);
      const instance = component.instance();

      jest.spyOn(instance.props, "onUpdateComment");
      instance.afterSubmitForm();

      expect(instance.props.onUpdateComment).toHaveBeenCalled();
      expect(component.state("showUpdateForm")).toBe(false);
    });
  });

  describe("deleteComment", () => {
    it("should call deleteComment API", done => {
      const component = shallow(<CommentItem {...props} />);
      const instance = component.instance();

      jest.spyOn(API, "deleteComment").mockImplementation(() => 200);
      jest.spyOn(instance.props, "onDeleteComment");
      jest.spyOn(global, "setTimeout");

      instance.deleteComment();
      process.nextTick(() => {
        expect(component.state("opacity")).toBe("0");
        expect(component.state("deletingComment")).toBe(false);

        expect(global.setTimeout).toHaveBeenCalled();
        expect(instance.props.onDeleteComment).toHaveBeenCalled();

        API.deleteComment.mockClear();
        done();
      });
    });
  });

  describe("openUpdateForm", () => {
    it("should set showUpdateForm to true", () => {
      const component = shallow(<CommentItem {...props} />);
      const instance = component.instance();

      instance.openUpdateForm();
      expect(component.state("showUpdateForm")).toBe(true);
    });
  });

  describe("closeUpdateForm", () => {
    it("should set showUpdateForm to false", () => {
      const component = shallow(<CommentItem {...props} />);
      const instance = component.instance();

      instance.closeUpdateForm();
      expect(component.state("showUpdateForm")).toBe(false);
    });
  });
});
