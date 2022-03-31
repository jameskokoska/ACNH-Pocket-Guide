const createExpoWebpackConfigAsync = require('@expo/webpack-config');

module.exports = async function (env, argv) {
  const config = await createExpoWebpackConfigAsync(
    {
      ...env,
      babel: {
        dangerouslyAddModulePathsToTranspile: ['toggle-switch-react-native', 'react-native-onboarding-swiper'],
      },
      resolve: {
        fallback: {
          util: require.resolve("util/")
        }
      }
    },
    argv,
  );
  // Customize the config before returning it.
  return config;
};