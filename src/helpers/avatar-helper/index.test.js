import getAvatar from "./index.js";

describe("Helper: Avatar", () => {
  describe("getAvatar", () => {
    it("should return correct avatar url", () => {
      const userId = 2;
      const expectedUrl = "/images/jenny.jpg";

      expect(getAvatar(userId)).toEqual(expectedUrl);
    });

    it("should return default avatar url if no id", () => {
      const expectedUrl = "/images/joe.jpg";

      expect(getAvatar()).toEqual(expectedUrl);
    });

    it("should return default avatar url if id is 100", () => {
      const userId = 100;
      const expectedUrl = "/images/joe.jpg";

      expect(getAvatar(userId)).toEqual(expectedUrl);
    });
  });
});
