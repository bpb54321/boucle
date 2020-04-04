const { Client } = require("pg");

/// <reference types="cypress" />
// ***********************************************************
// This example plugins/index.js can be used to load plugins
//
// You can change the location of this file or turn off loading
// the plugins file with the 'pluginsFile' configuration option.
//
// You can read more here:
// https://on.cypress.io/plugins-guide
// ***********************************************************

// This function is called when a project is opened or re-opened (e.g. due to
// the project's config changing)

/**
 * @type {Cypress.PluginConfig}
 */
module.exports = (on, config) => {
  // `on` is used to hook into various events Cypress emits
  // `config` is the resolved Cypress config
  on("task", {
    "clips:delete-all": async () => {
      const client = new Client({
        user: "postgres",
        host: "localhost",
        database: "postgres",
        password: "admin",
        port: 6432
      });

      await client.connect();

      await client.query("DELETE from clip");
      await client.end();

      // tasks should not resolve with undefined
      return null;
    }
  });
};
