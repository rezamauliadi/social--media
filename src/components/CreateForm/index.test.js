import React from "react";
import { shallow } from "enzyme";

import CreateForm from "./index.js";
import API from "src/api";

describe("Component: CreateForm", () => {
  const fnMock = jest.fn();
  const props = { type: "posts", onSubmit: fnMock };

  it("should match snapshot", () => {
    const component = shallow(<CreateForm {...props} />);
    expect(component).toMatchSnapshot();
  });

  describe("button click", () => {
    it("should call submitItem when submit button clicked", () => {
      const component = shallow(<CreateForm {...props} />);
      const instance = component.instance();

      jest.spyOn(instance, "submitItem");
      component
        .find("Button")
        .at(0)
        .simulate("click");
      expect(instance.submitItem).toHaveBeenCalled();
    });
  });

  describe("changeValue", () => {
    it("should set correct state when changeValue", () => {
      const component = shallow(<CreateForm {...props} />);
      const instance = component.instance();
      const data = {
        name: "title",
        value: "foo"
      };

      instance.changeValue({}, data);
      expect(component.state("title")).toBe("foo");
    });
  });

  describe("getPayload", () => {
    it("should return correct payload (type: posts)", () => {
      const component = shallow(<CreateForm {...props} />);
      const instance = component.instance();
      const expected = { title: "bar", body: "foo", userId: 1 };

      component.setState({ title: "bar", body: "foo" });
      const payload = instance.getPayload("posts");

      expect(payload).toEqual(expected);
    });

    it("should return correct payload (type: comments)", () => {
      const component = shallow(<CreateForm {...props} />);
      const instance = component.instance();
      const expected = {
        body: "foo",
        email: "user@email.com",
        name: "bar",
        postId: 1
      };

      component.setState({ title: "bar", body: "foo" });
      const payload = instance.getPayload("comments");

      expect(payload).toEqual(expected);
    });
  });

  describe("submitItem", () => {
    it("should do submitItem (type: posts)", done => {
      const component = shallow(<CreateForm {...props} />);
      const instance = component.instance();

      jest.spyOn(API, "createPost").mockImplementation(() => {});
      jest.spyOn(instance.props, "onSubmit");
      jest.spyOn(instance, "getPayload");
      component.setState({ body: "foo", title: "bar" });

      instance.submitItem();

      process.nextTick(() => {
        expect(instance.getPayload).toHaveBeenCalled();
        expect(instance.props.onSubmit).toHaveBeenCalled();
        done();
      });
    });

    it("should do submitItem (type: comments)", done => {
      const newProps = { type: "comments", onSubmit: fnMock };
      const component = shallow(<CreateForm {...newProps} />);
      const instance = component.instance();

      jest.spyOn(API, "createComment").mockImplementation(() => {});
      jest.spyOn(instance.props, "onSubmit");
      jest.spyOn(instance, "getPayload");
      component.setState({ body: "foo", title: "bar" });

      instance.submitItem();

      process.nextTick(() => {
        expect(instance.getPayload).toHaveBeenCalled();
        expect(instance.props.onSubmit).toHaveBeenCalled();
        done();
      });
    });
  });
});
