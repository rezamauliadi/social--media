import React from "react";
import { shallow } from "enzyme";

import PhotoCard from "./index.js";
import dummy from "./dummy.js";

describe("Component: PhotoCard", () => {
  it("should match snapshot when showing albums", () => {
    const props = {
      items: dummy.albums,
      isAlbum: true,
      onPhotoClick: jest.fn()
    };
    const component = shallow(<PhotoCard {...props} />);

    expect(component).toMatchSnapshot();
  });

  it("should match snapshot when showing photos", () => {
    const props = {
      items: dummy.photos,
      isAlbum: false,
      onPhotoClick: jest.fn()
    };
    const component = shallow(<PhotoCard {...props} />);

    expect(component).toMatchSnapshot();
  });

  it("should call onPhotoClick", () => {
    const fnMock = jest.fn();
    const props = {
      items: dummy.photos,
      isAlbum: false,
      onPhotoClick: fnMock
    };
    const component = shallow(<PhotoCard {...props} />);

    component
      .find("Card")
      .at(0)
      .simulate("click");

    expect(fnMock).toHaveBeenCalled();
  });
});
