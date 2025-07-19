
/*
login to wallet
-data wallet
-Show payment methods for withdraw
-Show payment methods for deposit
-filter
-Show transaction history and detail
*/

describe('Wallet', () => {
  it('login & show Data Wallet', () => {
    cy.visit(Cypress.env('baseUrl') + '/Account/Login')
    cy.get('#username').type(Cypress.env('username'));
    cy.get('#password').type(Cypress.env('password'));
    cy.get('#LoginInput_RememberMe').check()

    cy.get('button[name="Action"][value="Login"]')
      .should('have.class', 'btn-primary')
      .and('contain', 'Login')
      .click();

    cy.get('button[value="Login"]')
      .should('have.attr', 'type', 'name="Action"')
      .find('span')
      .should('contain', 'Back to CRM')
      .click();

    cy.origin(Cypress.env('CRMUrl'), () => {
      cy.get('span', { timeout: 10000 })
        .contains('Wallet')
        .should('be.visible')
        .click();

      cy.get('p')
        .should('have.class', 'mui-1fha575')
        .contains('DeltaFx')

      cy.get('span')
        .should('have.class', 'mui-12mwsu1')
        .contains('Wallet Number')

      cy.get('p')
        .should('have.class', 'mui-1upl7do')
        .contains('Your Wallet');

      cy.get('h4')
        .should('have.class', 'mui-maiapk')

      cy.get('span')
        .should('have.class', 'mui-w0pj6f')

    });
  })
})

describe('Withdraw', () => {
  it('Show payment methods for withdraw', () => {
    cy.visit(Cypress.env('baseUrl') + '/Account/Login')
    cy.get('#username').type(Cypress.env('username'));
    cy.get('#password').type(Cypress.env('password'));
    cy.get('#LoginInput_RememberMe').check()

    cy.get('button[name="Action"][value="Login"]')
      .should('have.class', 'btn-primary')
      .and('contain', 'Login')
      .click();

    // cy.login(Cypress.env('username'),Cypress.env('password'));

    if (cy.url().should('eq', Cypress.env('baseUrl') + '/Error?httpStatusCode=400')) {

      cy.visit(Cypress.env('baseUrl'))

      cy.get('button[value="Login"]')
        .should('have.attr', 'type', 'name="Action"')
        .find('span')
        .should('contain', 'Back to CRM')
        .click();

      cy.origin(Cypress.env('CRMUrl'), () => {
        cy.get('span', { timeout: 10000 })
          .contains('Wallet')
          .should('be.visible')
          .click();

        cy.url().should('eq', Cypress.env('CRMUrl') + '/wallet')

        cy.get('p')
          .should('have.class', 'mui-1dt4uyi')
          .contains('Withdraw')
          .click()

        cy.get('h6')
          .should('have.class', 'mui-5j9sfm')
          .contains('Withdraw')

        cy.get('#withdrawType_input_label')
          .contains('Payment Method')
        cy.get('#mui-component-select-withdrawType').click();

        // گام ۲: بررسی اینکه UL ظاهر شده و ۴ آیتم داره
        cy.get('ul[role="listbox"]').should('be.visible').within(() => {
          cy.get('li').should('have.length', 4);

          cy.get('li').eq(0).should('contain', 'Local exchange');
          cy.get('li').eq(1).should('contain', 'TopChange');
          cy.get('li').eq(2).should('contain', 'CryptoExchange');
          cy.get('li').eq(3).should('contain', 'Wallet To Wallet Transfer');
        })
      })
    }
  })
})

describe('Deposit', () => {
  it('Show payment methods for deposit', () => {
    cy.visit(Cypress.env('baseUrl') + '/Account/Login')
    cy.get('#username').type(Cypress.env('username'));
    cy.get('#password').type(Cypress.env('password'));
    cy.get('#LoginInput_RememberMe').check()

    cy.get('button[name="Action"][value="Login"]')
      .should('have.class', 'btn-primary')
      .and('contain', 'Login')
      .click();

    if (cy.url().should('eq', Cypress.env('baseUrl') + '/Error?httpStatusCode=400')) {

      cy.visit(Cypress.env('baseUrl'))

      cy.get('button[value="Login"]')
        .should('have.attr', 'type', 'name="Action"')
        .find('span')
        .should('contain', 'Back to CRM')
        .click();

      cy.origin(Cypress.env('CRMUrl'), () => {
        cy.get('span', { timeout: 10000 })
          .contains('Wallet')
          .should('be.visible')
          .click();

        cy.url().should('eq', Cypress.env('CRMUrl') + '/wallet')

        cy.get('button[type="button"]')
          .should('have.class', 'mui-g2g0ky')

        cy.get('p')
          .should('have.class', 'mui-1dt4uyi')
          .contains('Deposit')
          .click()

        cy.get('h6')
          .should('have.class', 'mui-5j9sfm')
          .contains('Deposit')

        cy.get('#depositType_input_label')
          .contains('Payment Method')

        cy.get('#mui-component-select-depositType').click();

        // گام ۲: بررسی اینکه UL ظاهر شده و ۴ آیتم داره
        cy.get('ul[role="listbox"]').should('be.visible').within(() => {
          cy.get('li').should('have.length', 3);

          cy.get('li').eq(0).should('contain', 'TRC20 (Tether)');
          cy.get('li').eq(1).should('contain', 'Local exchange');
          cy.get('li').eq(2).should('contain', 'TopChange');
        })
      })
    }
  })
})

describe('Transaction History', () => {
  it('Show transaction history', () => {
    cy.visit(Cypress.env('baseUrl') + '/Account/Login')
    cy.get('#username').type(Cypress.env('username'));
    cy.get('#password').type(Cypress.env('password'));
    cy.get('#LoginInput_RememberMe').check()

    cy.get('button[name="Action"][value="Login"]')
      .should('have.class', 'btn-primary')
      .and('contain', 'Login')
      .click();

    if (cy.url().should('eq', Cypress.env('baseUrl') + '/Error?httpStatusCode=400')) {

      cy.visit(Cypress.env('baseUrl'))

    } else {

      cy.visit(Cypress.env('baseUrl'))
    }

    cy.get('button[value="Login"]')
      .should('have.attr', 'type', 'name="Action"')
      .find('span')
      .should('contain', 'Back to CRM')
      .click();

    cy.origin(Cypress.env('CRMUrl'), () => {
      cy.get('span', { timeout: 10000 })
        .contains('Wallet')
        .should('be.visible')
        .click();

      cy.url().should('eq', Cypress.env('CRMUrl') + '/wallet')

      cy.get('h1')
        .should('be.visible')
        .contains('Transaction History')

      cy.get('#PaymentType_input_label')
        .contains('Payment Type')

      cy.get('#mui-component-select-PaymentType')
        .contains('All')
        .click()

      cy.get('ul[role="listbox"]').should('be.visible').within(() => {
        cy.get('li').should('have.length', 5);

        cy.get('li[aria-selected="true"]').eq(0).should('contain', 'All');
        cy.get('li').eq(1).should('contain', 'Deposit');
        cy.get('li').eq(2).should('contain', 'Withdraw');
        cy.get('li').eq(3).should('contain', 'Account Transactions');
        cy.get('li').eq(4).should('contain', 'Wallet To Wallet');
      })

      cy.get('li[aria-selected="true"]').should('contain', 'All').click();

      cy.get('#MethodTypes_multi_select_filter')
        .contains('All')
        .click()

      cy.get('ul.mui-1e6sbsr[role="menu"]').should('be.visible').within(() => {
        cy.get('li').should('have.length', 14);

        cy.get('li').eq(0).should('contain', 'All');
        cy.get('li').eq(1).should('contain', 'Crypto Manual');
        cy.get('li').eq(2).should('contain', 'Add Fund');
        cy.get('li').eq(3).should('contain', 'Remove Fund');
        cy.get('li').eq(4).should('contain', 'Client To IB');
        cy.get('li').eq(5).should('contain', 'IB To Client');
        cy.get('li').eq(6).should('contain', 'Crypto Auto Deposit');
        cy.get('li').eq(7).should('contain', 'Crypto Auto Withdraw');
        cy.get('li').eq(8).should('contain', 'Social Trading');
        cy.get('li').eq(9).should('contain', 'Local Exchange');
        cy.get('li').eq(10).should('contain', 'Top Change');
        cy.get('li').eq(11).should('contain', 'Crypto (Direct)');
        cy.get('li').eq(12).should('contain', 'Special Transfer');
        cy.get('li').eq(13).should('contain', 'Rebate');
      })

      cy.get('button')
        .should('be.visible')
        .contains('Cancel')

      cy.get('button')
        .should('be.visible')
        .contains('Apply')
        .click()


      //Date filter
      const now = new Date()
      const currentYear = now.getFullYear()
      const currentMonth = now.toLocaleString('default', { month: 'long' }) // خروجی مثل: "May"

      cy.get('#RegisterTime_range_picker_filter')
        .should('be.visible')
        .click()

      cy.get('p')
        .should('be.visible')
        .contains('Date')

      cy.get('#mui-component-select-RegisterTime_rangePicker_filter_year')
        .click()

      cy.get('ul[role="listbox"]').within(() => {
        cy.contains('li', currentYear.toString()).click()
      })


      cy.get('#mui-component-select-RegisterTime_rangePicker_filter_month')
        .click()

      cy.get('ul[role="listbox"]').within(() => {
        cy.contains('li', currentMonth).click()
      })

      cy.get('button')
        .should('be.visible')
        .contains('Apply')

      cy.get('button')
        .should('be.visible')
        .contains('Clear')
        .click()

      // Status filter
      cy.get('#mui-component-select-PaymentStatus')
        .should('be.visible')
        .contains('All')
        .click()

      cy.get('ul[role="listbox"]').should('be.visible').within(() => {
        cy.get('li').should('have.length', 4);

        cy.get('li').eq(0).should('contain', 'All');
        cy.get('li').eq(1).should('contain', 'In Progress');
        cy.get('li').eq(2).should('contain', 'Success');
        cy.get('li').eq(3).should('contain', 'Canceled/Rejected');

        cy.get('li.Mui-selected').should('contain', 'All').click();
      })

      cy.get('ul[role="listbox"]').should('not.exist');


      cy.get('nav h6')
        .invoke('text')
        .then((text) => text.includes('from 0'))
        .then((isEmpty) => {

          if (isEmpty) {

            cy.get('p').contains('No data to display').should('be.visible');

          } else {

            cy.get('tr')
              .should('be.visible')
              .first()
              .within(() => {

                cy.contains('th', 'Payment Type')
                cy.contains('th', 'Amount')
                cy.contains('th', 'Method Type')
                cy.contains('th', 'Login')
                cy.contains('th', 'Status')
                cy.contains('th', 'Time (UTC)')

              })


            cy.get('div[role="combobox"]').should('contain', '5 Per Page')


            cy.get('tbody.MuiTableBody-root > tr', { timeout: 10000 }).then(rows => {
              const rowCount = rows.length
              expect(rowCount).to.be.lte(5)
            })

            cy.get('td button')
              .first()
              .click()

            // detail tranzaction history
            cy.get('h6')
              .contains('Transaction Details')
              .should('be.visible')

            cy.get('button i.icon-Close')
              .parent('button') // چون آیکن داخل دکمه است
              .click()

          }
        })

    })
  })
})