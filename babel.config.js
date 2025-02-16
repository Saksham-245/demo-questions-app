/**
 * Babel configuration for the Expo React Native application
 *
 * Configures:
 * - Expo preset for React Native compatibility
 * - React Native Reanimated plugin for gesture and animation support
 *
 * @param {*} api - Babel API object
 * @returns {object} Babel configuration object
 */
module.exports = function (api) {
  api.cache(true);
  return {
    presets: ['babel-preset-expo'],
    plugins: ['react-native-reanimated/plugin'],
  };
};
