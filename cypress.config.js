const { defineConfig } = require("cypress");

module.exports = defineConfig({
  e2e: {
    setupNodeEvents(on, config) {
      // implement node event listeners here
    },
  },
  env: {
    username: process.env.username,
    password: process.env.password,
    senior_convert_url: process.env.senior_convert_url,
    site_readiness_url: process.env.site_readiness_url,
  },
});
