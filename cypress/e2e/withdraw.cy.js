
describe('withdraw', () => {
    it('Local Exchange', () => {
        cy.visit(Cypress.env('baseUrl') + '/Account/Login')

        cy.get('#username').type(Cypress.env('username'));
        cy.get('#password').type(Cypress.env('password'));
        cy.get('#LoginInput_RememberMe').check()

        cy.get('button[name="Action"][value="Login"]')
            .should('have.class', 'btn-primary')
            .and('contain', 'Login')
            .click();

        cy.url().then((currentUrl) => {
            if (currentUrl.includes('httpStatusCode=400')) {
            }

            cy.get('button[value="Login"]', { timeout: 5000 }) // timeout رو بیشتر بزار
                .should('contain.text', 'Back to CRM')
                .click()

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
                    cy.get('li').should('have.length', 3);

                    cy.get('li').eq(0).should('contain', 'Local exchange');
                    cy.get('li').eq(1).should('contain', 'TopChange');
                    cy.get('li').eq(2).should('contain', 'CryptoExchange');
                    // cy.get('li').eq(3).should('contain', 'Wallet To Wallet Transfer');

                    cy.get('li').eq(0).should('contain', 'Local exchange').click();
                })

                cy.get('#number_input_format_amount')
                    .click()

                cy.get('#number_input_format_amount')
                    .type(Cypress.env('amountlocalexchangewithdraw'))

                cy.get('#whiteListId_autocomplete_free_solo')
                    .click()

                cy.get('#whiteListId_autocomplete_free_solo')
                    .type(Cypress.env('accountnumberlocalexchange'))
                // cy.wait(5000)
                // cy.contains('p', 'Withdraw', { timeout: 5000 })
                //     .parent('button.MuiButton-colorPrimary')
                //     .should('be.visible')
                //     .first()
                //     .click( {force: true})

                // cy.get('button.MuiButton-colorPrimary')
                //     .click({ multiple: true ,force: true})


                // cy.contains('h6', 'Create Whitelist')
                //     .should('be.visible')

                // cy.get('input[name="bankName"]')
                //     .click()

                // cy.get('input[name="holderName"]')
                //     .click()

                // cy.get('input[name="accountNumber"]')
                //     .click()

                // cy.get('#number_input_format_isinNumber')
                //     .click()

                // cy.contains('p', 'Create')
                //     .parent('button')
                //     .should('be.visible')

                // cy.contains('p', 'Discard')
                //     .parent('button')
                //     .should('be.visible')
                //     .click()

                cy.contains('p', 'Cancel')
                    .parent('button')
                    .should('be.visible')
                    .click()

            })
        })
    })

    it('Top change', () => {
        cy.visit(Cypress.env('baseUrl') + '/Account/Login')

        cy.get('#username').type(Cypress.env('username'));
        cy.get('#password').type(Cypress.env('password'));
        cy.get('#LoginInput_RememberMe').check()

        cy.get('button[name="Action"][value="Login"]')
            .should('have.class', 'btn-primary')
            .and('contain', 'Login')
            .click();

        cy.url().then((currentUrl) => {
            if (currentUrl.includes('httpStatusCode=400')) {
                cy.visit(Cypress.env('baseUrl'))
            }

            cy.get('button[value="Login"]', { timeout: 5000 }) // timeout رو بیشتر بزار
                .should('contain.text', 'Back to CRM')
                .click()

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
                    cy.get('li').should('have.length', 3);

                    cy.get('li').eq(0).should('contain', 'Local exchange');
                    cy.get('li').eq(1).should('contain', 'TopChange');
                    cy.get('li').eq(2).should('contain', 'CryptoExchange');
                    // cy.get('li').eq(3).should('contain', 'Wallet To Wallet Transfer');

                    cy.get('li').eq(1).should('contain', 'TopChange').click();
                })

                cy.get('#number_input_format_amountInDollar')
                    .click()

                cy.get('#number_input_format_amountInDollar')
                    .type(Cypress.env('amountlocalexchangewithdraw'))

                cy.get('#whiteListId_autocomplete_free_solo')
                    .click()

                cy.get('#whiteListId_autocomplete_free_solo')
                    .type(Cypress.env('walletnumbertopchange'))

                // cy.contains('h6', 'Create Whitelist')
                //     .should('be.visible')

                // cy.get('input[name="holderName"]')
                //     .should('be.visible')

                // cy.get('input[name="accountNumber"]')
                //     .should('be.visible')

                // cy.get('p')
                //     .contains('Create')
                //     .parent('button')
                //     .should('be.visible')

                // cy.get('p')
                //     .contains('Discard')
                //     .parent('button')
                //     .should('be.visible')
                //     .click()

            })
        })
    })

})