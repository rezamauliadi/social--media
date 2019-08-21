import React from "react";
import { shallow } from "enzyme";

import ModalPhoto from "./index.js";

describe("Component: ModalPhoto", () => {
  const photo = {
    albumId: 1,
    id: 1,
    title: "accusamus beatae ad facilis cum similique qui sunt",
    url: "https://via.placeholder.com/600/92c952",
    thumbnailUrl: "https://via.placeholder.com/150/92c952"
  };

  const defaultProps = {
    photo,
    onModalClose: jest.fn()
  };

  it("should match snapshot when show photo is true", () => {
    const props = { ...defaultProps, showPhoto: true };
    const component = shallow(<ModalPhoto {...props} />);

    expect(component).toMatchSnapshot();
  });

  it("should match snapshot when show photo is false", () => {
    const props = { ...defaultProps, showPhoto: false };
    const component = shallow(<ModalPhoto {...props} />);

    expect(component).toMatchSnapshot();
  });
});
