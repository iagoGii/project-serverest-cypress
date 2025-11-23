const { defineConfig } = require("cypress");
require('dotenv').config();

module.exports = defineConfig({
  defaultCommandTimeout: 10000,
  pageLoadTimeout: 60000,
  requestTimeout: 15000,
  responseTimeout: 15000,
  e2e: {
    setupNodeEvents(on, config) {},
    viewportWidth: 1920,
    viewportHeight: 1080,
    video: false,
    screenshotOnRunFailure: false,
    retries: {
      runMode: 2,
      openMode: 0
    },
    env: {
      frontendUrl: process.env.FRONTEND_URL,
      apiUrl: process.env.API_URL
    }
  },
});
