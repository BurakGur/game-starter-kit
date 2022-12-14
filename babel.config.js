module.exports = {
  presets: ['module:metro-react-native-babel-preset'],
  plugins: [
    [
      'module-resolver',
      {
        root: ['./src'],
        alias: {
          '@': './src',
          '@components': './src/components',
          '@layouts': './src/layouts',
          '@screens': './src/screens',
          '@navigation': './src/navigation',
          '@utils': './src/utils',
          '@assets': './src/assets',
          '@constants': './src/constants',
          '@styles': './src/styles',
          '@store': './src/store',
          '@services': './src/services',
          '@config': './src/config',
          '@theme': './src/theme',
          '@locale': './src/locale',
          '@icons': './src/icons',
        },
      },
    ],
  ],
};
