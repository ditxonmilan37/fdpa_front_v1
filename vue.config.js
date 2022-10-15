const { defineConfig } = require("@vue/cli-service");
module.exports = defineConfig({
  transpileDependencies: ["vuetify"],

  pwa: {
    name: 'Sistema Administrativo FDPA',
    themeColor: '#15182F',
    msTileColor: '#15182F',
    appleMobileWebAppCapable: 'yes',
    appleMobileWebAppStatusBarStyle: '#15182F',
  },

});


