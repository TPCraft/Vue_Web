const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
  assetsDir: "assets",
  transpileDependencies: [
    'vuetify'
  ]
})
