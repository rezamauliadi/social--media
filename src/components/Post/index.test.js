import React from "react";
import { shallow } from "enzyme";

import Post from "./index.js";
import dummy from "./dummy.js";
import API from "src/api";

describe("Component: Post", () => {
  const fnMock = jest.fn();
  const props = {
    post: dummy.post,
    user: dummy.user,
    onDeletePost: fnMock,
    onUpdatePost: fnMock
  };

  it("should match snapshot", () => {
    const component = shallow(<Post {...props} />);
    expect(component).toMatchSnapshot();
  });

  describe("button click", () => {
    it("should call openUpdateForm when update button clicked", () => {
      const component = shallow(<Post {...props} />);
      const instance = component.instance();

      jest.spyOn(instance, "openUpdateForm");
      component
        .find("Button")
        .at(1)
        .simulate("click");
      expect(instance.openUpdateForm).toHaveBeenCalled();
    });

    it("should call deletePost when delete button clicked", () => {
      const component = shallow(<Post {...props} />);
      const instance = component.instance();

      jest.spyOn(instance, "deletePost");
      jest.spyOn(instance.props, "onDeletePost");

      component
        .find("Button")
        .at(0)
        .simulate("click");
      expect(instance.deletePost).toHaveBeenCalled();
      setTimeout(() => {
        expect(instance.props.onDeletePost).toHaveBeenCalled();
      }, 500);
    });
  });

  describe("afterSubmitForm", () => {
    it("should call onUpdatePost", () => {
      const component = shallow(<Post {...props} />);
      const instance = component.instance();

      jest.spyOn(instance.props, "onUpdatePost");
      instance.afterSubmitForm();

      expect(instance.props.onUpdatePost).toHaveBeenCalled();
      expect(component.state("showUpdateForm")).toBe(false);
    });
  });

  describe("deletePost", () => {
    it("should call deletePost API", done => {
      const component = shallow(<Post {...props} />);
      const instance = component.instance();

      jest.spyOn(API, "deletePost").mockImplementation(() => 200);
      jest.spyOn(instance.props, "onDeletePost");
      jest.spyOn(global, "setTimeout");

      instance.deletePost();
      process.nextTick(() => {
        expect(component.state("opacity")).toBe("0");
        expect(component.state("deletingPost")).toBe(false);

        expect(global.setTimeout).toHaveBeenCalled();
        expect(instance.props.onDeletePost).toHaveBeenCalled();

        API.deletePost.mockClear();
        done();
      });
    });
  });

  describe("openUpdateForm", () => {
    it("should set showUpdateForm to true", () => {
      const component = shallow(<Post {...props} />);
      const instance = component.instance();

      instance.openUpdateForm();
      expect(component.state("showUpdateForm")).toBe(true);
    });
  });

  describe("closeUpdateForm", () => {
    it("should set showUpdateForm to false", () => {
      const component = shallow(<Post {...props} />);
      const instance = component.instance();

      instance.closeUpdateForm();
      expect(component.state("showUpdateForm")).toBe(false);
    });
  });
});
