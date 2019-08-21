import React from "react";
import { shallow } from "enzyme";

import MenuBar from "./index.js";

describe("Component: MenuBar", () => {
  it("should match snapshot with active home", () => {
    const component = shallow(<MenuBar active="home" />);

    expect(component).toMatchSnapshot();
  });

  it("should match snapshot with active users", () => {
    const component = shallow(<MenuBar active="users" />);

    expect(component).toMatchSnapshot();
  });
});
