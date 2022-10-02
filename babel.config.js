const Components = require('prismjs/components');
const AllLanguages = Object.keys(Components.languages).filter((item) => item !== 'meta');

module.exports = {
  presets: [
    '@vue/cli-plugin-babel/preset'
  ],
  plugins: [
    [
      'prismjs',
      {
        languages: AllLanguages,
      },
    ],
  ]
}
