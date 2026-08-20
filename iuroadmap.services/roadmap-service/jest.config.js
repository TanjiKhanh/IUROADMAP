const { createDefaultPreset } = require("ts-jest");

const tsJestTransformCfg = createDefaultPreset().transform;

/** @type {import("jest").Config} **/
module.exports = {
  testEnvironment: "node",
  transform: {
    ...tsJestTransformCfg,
  },
  // Ignore compiled output and coverage artifacts so Jest only runs source tests
  testPathIgnorePatterns: ["<rootDir>/dist/", "<rootDir>/coverage/"],
  moduleFileExtensions: ["ts", "js", "json", "node"],
};