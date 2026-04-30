// metro.config.js
//
// Custom Metro configuration for GearForge.
//
// Primary purpose: ensure Metro can correctly resolve Node-core polyfill
// packages (e.g. `assert`) on Windows, especially when the project lives
// inside OneDrive which can cause symlink / path-resolution issues.

const { getDefaultConfig } = require("expo/metro-config");

const config = getDefaultConfig(__dirname);

// Ensure Metro resolves the `assert` polyfill (and similar Node built-ins)
// using the installed npm package rather than trying a bare built-in lookup,
// which fails in React Native / Hermes environments.
config.resolver.extraNodeModules = {
  ...config.resolver.extraNodeModules,
  assert: require.resolve("assert"),
};

module.exports = config;
