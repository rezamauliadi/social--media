import React from "react";
import { shallow } from "enzyme";

import UserList from "./index.js";
import dummy from "./dummy.js";

describe("Component: UserList", () => {
  const users = dummy;
  const url = "/users";

  it("should match snapshot", () => {
    const props = { users, url };
    const component = shallow(<UserList {...props} />);

    expect(component).toMatchSnapshot();
  });
});
