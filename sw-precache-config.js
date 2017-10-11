module.exports = {
  staticFileGlobs: [
    'dist/**.html',
    'dist/**.js',
    'dist/**.css',
    'dist/**.eot',
    'dist/**.ico',
    'dist/**.svg',
    'dist/**.woff2',
    'dist/**.ttf',
    'dist/**.woff',
    'dist/app/**',
    'dist/assets/images/*',
    'dist/assets/icons/*'
  ],
  root: 'dist',
  stripPrefix: 'dist/',
  navigateFallback: '/index.html'
};
