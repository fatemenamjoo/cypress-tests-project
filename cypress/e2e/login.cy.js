/// <reference types="cypress" />


describe('LOGIN with valid data', () => {
  it('page login', () => {
    cy.visit(Cypress.env('baseUrl') + '/Account/Login')

  })

  it('Enter username & password in login', () => {
    cy.visit(Cypress.env('baseUrl') + '/Account/Login')
    //username
    //password
    cy.get('#username').type(Cypress.env('username'));
    cy.get('#password').type(Cypress.env('password'));
    cy.get('#LoginInput_RememberMe').check()

    cy.get('button[name="Action"][value="Login"]')
      .should('have.class', 'btn-primary')
      .and('contain', 'Login')
      .click();

    cy.get('button[value="Login"]')
      .should('have.attr', 'type', 'name="Action"') // white به RGB تبدیل شده
      .find('span')
      .should('contain', 'Back to CRM')
      .click();

  })
})

describe('login with invalid data', () => {
  it('Enter invalid username in login', () => {
    cy.visit(Cypress.env('baseUrl') + '/Account/Login')
    cy.get('#username').type(Cypress.env('usernameinvalid'));
    cy.get('#password').type(Cypress.env('password'));
    cy.get('#LoginInput_RememberMe').check()

    cy.get('button[name="Action"][value="Login"]')
      .should('have.class', 'btn-primary')
      .and('contain', 'Login')
      .click();

    cy.get('.alert.alert-warning')
      .should('exist')
      .and('be.visible')
      .within(() => {
        // بررسی قسمت strong در پیام
        cy.get('strong')
          .should('contain', 'Invalid login request');

        // بررسی متن کامل پیام
        cy.root()
          .should('contain', 'There are no login schemes configured for this client');
      });
  })

  it('Enter invalid password in login', () => {
    cy.visit(Cypress.env('baseUrl') + '/Account/Login')

    cy.get('#username').type(Cypress.env('username'));
    cy.get('#password').type(Cypress.env('passwordinvalid'));
    cy.get('#LoginInput_RememberMe').check()

    cy.get('button[name="Action"][value="Login"]')
      .should('have.class', 'btn-primary')
      .and('contain', 'Login')
      .click();

    cy.root()
      .should('contain', 'Invalid username or password!');
  })
})