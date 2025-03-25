/** @type {import('ts-jest').JestConfigWithTsJest} **/
import * as structuredClone from '@ungap/structured-clone'; // can be written as import { structuredClone } from '@ungap/structured-clone';  if esModuleInterop flag is used

export default {
  testEnvironment: "jsdom",
  setupFilesAfterEnv: ["<rootDir>/src/setupTests.js"],
  moduleNameMapper: {
    "\\.(css|less|scss|sass)$": "identity-obj-proxy",
    "\\.(gif|ttf|eot|svg)$": "<rootDir>/__mocks__/fileMock.js",
    "^@/(.*)$": "<rootDir>/src/$1",
  },
  transform: {
    "^.+\.[jt]sx?$": ["ts-jest", {}],
  },
  moduleFileExtensions: ["js", "jsx", "ts", "tsx"],
  testMatch: ["**/__tests__/**/*.[jt]s?(x)", "**/?(*.)+(spec|test).[jt]s?(x)"],
  transformIgnorePatterns: [
    "/node_modules/(?!@babel)",
  ],
  globals: {
    structuredClone: structuredClone.default, // 'structuredClone' is a default export so I access it via .default
  },
};
