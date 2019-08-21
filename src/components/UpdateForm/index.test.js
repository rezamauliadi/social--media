import React from "react";
import { shallow } from "enzyme";

import UpdateForm from "./index.js";
import API from "src/api";

describe("Component: UpdateForm", () => {
  const fnMock = jest.fn();
  const props = {
    id: 1,
    parentId: 1,
    type: "posts",
    title: "foo",
    body: "bar",
    additionalInfo: "user@email.com",
    onClose: fnMock,
    afterSubmit: fnMock
  };

  it("should match snapshot", () => {
    const component = shallow(<UpdateForm {...props} />);
    expect(component).toMatchSnapshot();
  });

  describe("button click", () => {
    it("should call onClose when close button clicked", () => {
      const component = shallow(<UpdateForm {...props} />);
      const instance = component.instance();

      jest.spyOn(instance, "closeForm");
      jest.spyOn(instance.props, "onClose");
      component
        .find("Button")
        .at(1)
        .simulate("click");

      expect(instance.closeForm).toHaveBeenCalled();
      expect(instance.props.onClose).toHaveBeenCalled();
    });

    it("should do update when update button clicked", () => {
      const component = shallow(<UpdateForm {...props} />);
      const instance = component.instance();

      jest.spyOn(instance, "submitForm");
      jest.spyOn(instance, "getPayload");
      component
        .find("Button")
        .at(0)
        .simulate("click");

      expect(instance.submitForm).toHaveBeenCalled();
      expect(instance.getPayload).toHaveBeenCalled();
    });
  });

  describe("changeValue", () => {
    it("should set correct state when changeValue", () => {
      const component = shallow(<UpdateForm {...props} />);
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
      const component = shallow(<UpdateForm {...props} />);
      const instance = component.instance();
      const expected = {
        id: 1,
        title: "foo",
        body: "bar",
        userId: 1
      };

      const payload = instance.getPayload("posts");
      expect(payload).toEqual(expected);
    });

    it("should return correct payload (type: comments)", () => {
      const component = shallow(<UpdateForm {...props} />);
      const instance = component.instance();
      const expected = {
        id: 1,
        body: "bar",
        email: "user@email.com",
        name: "foo",
        postId: 1
      };

      const payload = instance.getPayload("comments");
      expect(payload).toEqual(expected);
    });
  });

  describe("submitForm", () => {
    it("should return on submitForm when no body or title", done => {
      const component = shallow(<UpdateForm {...props} />);
      const instance = component.instance();

      jest.spyOn(API, "updatePost").mockImplementation(() => {});
      jest.spyOn(instance, "getPayload");
      component.setState({ body: "", title: "" });

      instance.submitForm();

      process.nextTick(() => {
        expect(instance.getPayload).not.toHaveBeenCalled();
        done();
      });
    });

    it("should return payload on submitForm when id exceed maxDummy", done => {
      const component = shallow(<UpdateForm {...props} />);
      const instance = component.instance();

      jest.spyOn(instance.props, "afterSubmit");
      component.setState({ id: 101 });

      instance.submitForm();

      process.nextTick(() => {
        expect(instance.props.afterSubmit).toHaveBeenCalled();
        done();
      });
    });

    it("should do submitForm (type: posts)", done => {
      const component = shallow(<UpdateForm {...props} />);
      const instance = component.instance();

      jest.spyOn(API, "updatePost").mockImplementation(() => {});
      jest.spyOn(instance.props, "afterSubmit");
      jest.spyOn(instance, "getPayload");

      instance.submitForm();

      process.nextTick(() => {
        expect(instance.getPayload).toHaveBeenCalled();
        expect(instance.props.afterSubmit).toHaveBeenCalled();
        done();
      });
    });

    it("should do submitForm (type: comments)", done => {
      const newProps = { ...props };
      newProps.type = "comments";
      const component = shallow(<UpdateForm {...newProps} />);
      const instance = component.instance();

      jest.spyOn(API, "updateComment").mockImplementation(() => {});
      jest.spyOn(instance.props, "afterSubmit");
      jest.spyOn(instance, "getPayload");

      instance.submitForm();

      process.nextTick(() => {
        expect(instance.getPayload).toHaveBeenCalled();
        expect(instance.props.afterSubmit).toHaveBeenCalled();
        done();
      });
    });
  });
});
