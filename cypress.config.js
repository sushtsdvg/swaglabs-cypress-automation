const { defineConfig } = require("cypress");

module.exports = defineConfig({
  allowCypressEnv: false,

  e2e: {
    baseUrl: "https://www.saucedemo.com/",
    testIsolation: false,
    // setupNodeEvents(on, config) {
    //   // implement node event listeners here
    // },
  },
});
