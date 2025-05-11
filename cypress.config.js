const { defineConfig } = require("cypress");

module.exports = defineConfig({

  // Viewport settings
  viewportWidth: 1280,
  viewportHeight: 720,

  // Timeout settings
  defaultCommandTimeout: 4000,
  pageLoadTimeout: 30000,

  // Environment variables
  env: {
    apiUrl: 'https://api.example.com',
    username: 'standard_user',
    password: 'secret_sauce'
  },

  // Video and screenshot settings
  video: true,
  screenshotOnRunFailure: true,
  screenshotsFolder: 'cypress/screenshots',
  videosFolder: 'cypress/videos',

  e2e: {
    baseUrl: 'https://www.saucedemo.com',  // Example: Swag Labs demo site
    // Pattern for finding test files
    specPattern: 'cypress/e2e/**/*.cy.{js,jsx,ts,tsx}',
    
    // Support file location
    supportFile: 'cypress/support/e2e.js',

    // Node event listeners
    setupNodeEvents(on, config) {
      // implement node event listeners here
    },

    // Browser settings
    chromeWebSecurity: false,
    
    // Retry failed tests
    retries: {
      runMode: 2,
      openMode: 0
    }
  },
});
