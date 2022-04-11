module.exports = {
  testPathIgnorePatterns: ["/node_modules/", "/.next/", "/.vercel/", "/.github/"],
  setupFilesAfterEnv: ["<rootDir>/src/tests/setupTests.ts"],
  transform: {
    "^.+\\.(js|jsx|ts|tsx)$": "<rootDir>/node_modules/babel-jest",
  },
  testEnvironment: 'jsdom'
};