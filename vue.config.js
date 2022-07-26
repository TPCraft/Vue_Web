const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
  assetsDir: "assets",
  lintOnSave: false,
  transpileDependencies: [
    'vuetify'
  ]
})
