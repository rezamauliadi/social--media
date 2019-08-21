module.exports = {
  verbose: true,
  modulePaths: ["<rootDir>"],
  moduleFileExtensions: ["js", "json"],
  transform: {
    "^.+\\.js?$": "babel-jest"
  },
  moduleNameMapper: {
    "^src(.*)$": "<rootDir>/src$1"
  },
  snapshotSerializers: ["<rootDir>/node_modules/enzyme-to-json/serializer"],
  setupFiles: ["<rootDir>/setupTests.js"]
};
