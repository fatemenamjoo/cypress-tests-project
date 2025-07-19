const { defineConfig } = require("cypress");

module.exports = defineConfig({
  e2e: {
    setupNodeEvents(on, config) {
      // implement node event listeners here
    },
    viewportWidth: 1800, // عرض مورد نظر
    viewportHeight: 1000, // ارتفاع مورد نظر
  },
});
