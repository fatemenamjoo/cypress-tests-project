
/*
باید برای بخش لویالتی و کوئست و کمیپن ها هم تست نوشته شود.
*/

describe('Dashboard', () => {
  it('Login to dashboard', () => {
    cy.visit(Cypress.env('baseUrl') + '/Account/Login')
    //username
    //password
    cy.get('#username').type(Cypress.env('username'));
    cy.get('#password').type(Cypress.env('password'));
    cy.get('#LoginInput_RememberMe').check()

    cy.get('button[name="Action"][value="Login"]', { timeout: 1000 })
      .should('have.class', 'btn-primary')
      .and('contain', 'Login')
      .click();

    cy.get('button[value="Login"]')
      //cy.get('button').contains('Login')
      .should('have.attr', 'type', 'name="Action"') // white به RGB تبدیل شده
      .find('span')
      .should('contain', 'Back to CRM')
      .click();
    cy.origin(Cypress.env('CRMUrl'), () => {
      // این کد در context دامنه جدید اجرا می‌شود
      cy.url().should('eq', Cypress.env('CRMUrl') + '/');
      cy.contains('h6', 'Dashboard').should('be.visible');
      cy.contains('h6', 'Tickets').should('be.visible');
      cy.contains('h6', 'Your Accounts').should('be.visible');
      cy.contains('h6', 'Download Trading Platforms').should('be.visible');
      cy.contains('p', 'Your Wallet').should('be.visible');
      cy.contains('button', 'Withdraw / Deposit').should('be.visible');
    });

  })

  it('pin account in dashboard', () => {
    cy.visit(Cypress.env('baseUrl') + '/Account/Login')
    //username
    //password
    cy.get('#username').type(Cypress.env('username'));
    cy.get('#password').type(Cypress.env('password'));
    cy.get('#LoginInput_RememberMe').check()

    cy.get('button[name="Action"][value="Login"]', { timeout: 10000 })
      .should('have.class', 'btn-primary')
      .and('contain', 'Login')
      .click();

    if (cy.url().should('eq', Cypress.env('baseUrl') + '/Error?httpStatusCode=400')) {

      cy.visit(Cypress.env('baseUrl'))

      cy.get('button[value="Login"]', { timeout: 1000 })
        .should('have.attr', 'type', 'name="Action"') // white به RGB تبدیل شده
        .find('span')
        .should('contain', 'Back to CRM')
        .click();

      cy.origin(Cypress.env('CRMUrl'), () => {
        cy.url().should('eq', Cypress.env('CRMUrl') + '/');
        cy.contains('button', 'Pin Account').should('be.visible').click()
        cy.contains('p', 'Accounts List').should('be.visible', 'exist')

        cy.get('.MuiTableRow-root').then(($rows) => {
          // ردیف اول - DeltaBasic
          cy.wrap($rows).eq(0).within(() => {
            cy.get('.MuiTypography-body1');
            cy.get('.MuiTypography-body2').click();
          });
        });

        cy.get('button[aria-label="close"]')
          .should('be.visible')
          .click();
      })
    }
  })

  it('deposit/eithdraw dashboard', () => {
    cy.visit(Cypress.env('baseUrl') + '/Account/Login')
    //username
    //password
    cy.get('#username').type(Cypress.env('username'));
    cy.get('#password').type(Cypress.env('password'));
    cy.get('#LoginInput_RememberMe').check()

    cy.get('button[name="Action"][value="Login"]', { timeout: 10000 })
      .should('have.class', 'btn-primary')
      .and('contain', 'Login')
      .click();

    if (cy.url().should('eq', Cypress.env('baseUrl') + '/Error?httpStatusCode=400')) {

      cy.visit(Cypress.env('baseUrl'))

      cy.get('button[value="Login"]')
        //cy.get('button').contains('Login')
        .should('have.attr', 'type', 'name="Action"') // white به RGB تبدیل شده
        .find('span')
        .should('contain', 'Back to CRM')
        .click();

      cy.origin(Cypress.env('CRMUrl'), () => {
        cy.url().should('eq', Cypress.env('CRMUrl') + '/');
        cy.contains('button', 'Withdraw / Deposit').should('be.visible').click()
        cy.url().should('eq', Cypress.env('CRMUrl') + '/wallet')
      })
    }
  })
})
