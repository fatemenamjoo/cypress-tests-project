// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add('login', (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })

Cypress.Commands.add('login', (username, password) => {
  cy.visit(Cypress.env('baseUrl') + '/Account/Login')
  //username
  //password
  cy.get('#username').type(Cypress.env('username'));
  cy.get('#password').type(Cypress.env('password'));
  cy.get('#LoginInput_RememberMe').check()

  cy.get('button[name="Action"][value="Login"]')
    .should('have.class', 'btn-primary')
    .and('contain', 'Login')
    .click()

  cy.get('button[value="Login"]')
    .should('have.attr', 'type', 'name="Action"') // white به RGB تبدیل شده
    .find('span')
    .should('contain', 'Back to CRM')
    .click()
});