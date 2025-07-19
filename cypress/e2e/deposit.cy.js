
describe('Deposit', () => {
    it('Trc20(Tether)', () => {
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
                // اگر ارور خورد، سعی کنیم برگردیم به authserver
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
                    .contains('Deposit')
                    .parent('button')
                    .click()

                cy.get('h6')
                    .should('have.class', 'mui-5j9sfm')
                    .contains('Deposit')

                cy.get('#depositType_input_label')
                    .contains('Payment Method')

                cy.get('#mui-component-select-depositType').click();

                cy.get('ul[role="listbox"]').should('be.visible').within(() => {
                    cy.get('li').should('have.length', 3);

                    // cy.get('li').eq(0).should('contain', 'Crypto(Direct)');
                    cy.get('li').eq(0).should('contain', 'TRC20 (Tether)');
                    cy.get('li').eq(1).should('contain', 'Local exchange');
                    cy.get('li').eq(2).should('contain', 'TopChange');

                    cy.get('li').eq(0).should('contain', 'TRC20 (Tether)').click();
                })

                cy.contains('p', 'Commission')
                    .should('be.visible')

                cy.contains('p', 'Minimum Deposit')
                    .should('be.visible')

                cy.contains('p', 'You can scan our wallet QR code or enter our wallet address.')
                    .should('be.visible')

                cy.contains('span', 'Please be sure to visit this page and confirm our wallet address before making a deposit.')
                    .should('be.visible')

                //QR code
                cy.get('.MuiStack-root.mui-1o6thii')
                    .should('exist')
                    .within(() => {
                        // بررسی وجود svg
                        cy.get('svg')
                            .should('exist')
                            .and('have.attr', 'xmlns', 'http://www.w3.org/2000/svg')
                            .and('have.attr', 'viewBox', '0 0 29 29')
                            .and('have.attr', 'height', '200')
                            .and('have.attr', 'width', '200');
                    });

                cy.get('i.icon-Copy')
                    .parent('button')
                    .click()

                cy.get('a[href="/tickets?DetailedTypes=5"]')

                cy.contains('p', 'Watch requests')
                    .should('be.visible')
                    .click()

            })
        })
    })

    it('Local exchange', () => {
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
                    .contains('Deposit')
                    .parent('button')
                    .click()

                cy.get('h6')
                    .should('have.class', 'mui-5j9sfm')
                    .contains('Deposit')

                cy.get('#depositType_input_label')
                    .contains('Payment Method')

                cy.get('#mui-component-select-depositType').click();

                cy.get('ul[role="listbox"]').should('be.visible').within(() => {
                    cy.get('li').should('have.length', 3);

                    // cy.get('li').eq(0).should('contain', 'Crypto(Direct)');
                    cy.get('li').eq(0).should('contain', 'TRC20 (Tether)');
                    cy.get('li').eq(1).should('contain', 'Local exchange');
                    cy.get('li').eq(2).should('contain', 'TopChange');

                    cy.get('li').eq(1).should('contain', 'Local exchange').click();
                })

                cy.get('#number_input_format_amount')
                    .click()

                cy.get('#number_input_format_amount', { timeout: 40000 })
                    .type(Cypress.env('amountlocalexchange'))


                cy.contains('p', 'Amount In Dollar:', { timeout: 40000 })

                cy.contains('p', 'Commission Amount:')

                cy.contains('p', 'Commission Applied Amount:')

                cy.contains('p', 'Cancel')
                    .parent('button')
                    .should('be.visible')

                cy.contains('span', 'Tickets')
                    .should('be.visible')

                // cy.url().should('eq', Cypress.env('CRMUrl') + '/tickets?DetailedTypes=0&Skip=0&Take=5&IsDescending=true')

                // cy.contains('h6', 'Tickets')

                // cy.get('#DetailedTypes_multi_select_filter')
                //     .should('contain', 'Local Exchange')

                // cy.get('#mui-component-select-Status')
                //     .should('contain', 'All')

                // cy.get('tbody tr td a')
                //     .contains('Account Number Entered')
                //     .should('be.visible')

                // cy.get('i.icon-DirectionRight')
                //     .parent('button')
                //     .click()

                // cy.contains('h6', 'Ticket Detail')
                //     .should('be.visible')

                // cy.get('i.icon-DirectionLeft-sign')
                //     .parent('button')
                //     .should('be.visible')

                // cy.contains('p', 'Back')

                // cy.contains('p', 'User Details')

                // cy.contains('span', 'Name:')

                // cy.contains('span', 'Email:')

                // cy.contains('span', 'Wallet Number:')

                // cy.contains('span', 'Credit:')

                // cy.contains('span', 'Balance:')

                // cy.contains('p', 'Bank Info')

                // cy.contains('span', 'Bank Name:')

                // cy.contains('span', 'Holder Name:')

                // cy.contains('span', 'Card Number:')

                // cy.contains('span', 'Account Number:')

                // cy.contains('span', 'ISIN Number:')

                // cy.contains('p', 'Request Details')

                // cy.contains('span', 'Subject:')

                // cy.contains('span', 'Deposit')

                // cy.contains('span', 'Type:')

                // cy.contains('span', 'Local Exchange')

                // cy.contains('span', 'Status:')

                // cy.contains('span', 'Account Number Entered')

                // cy.contains('span', 'Amount In Iranian Rial:')

                // cy.contains('span', Cypress.env('amount'))

                // cy.contains('span', 'Dollar Price:')

                // cy.contains('span', 'Amount:')

                // cy.contains('span', 'Commission:')

                // cy.contains('span', 'Commission Applied Amount:')

                // cy.contains('span', 'Created Date:')

                // cy.get('div.MuiAlert-colorWarning')
                //     .should('be.visible')

                // cy.contains('p', 'Cancel Request')
                //     .parent('button')

                // cy.contains('p', 'Upload Receipt File')
                //     .parent('button')
                //     .click()

                // cy.get('i.icon-DirectionLeft-sign')
                //     .parent('button')

                // cy.contains('h6', 'Upload Receipt File')
                //     .should('be.visible')

                // cy.get('div.MuiAlert-colorWarning')
                //     .should('be.visible')

                // cy.get('input[name="bankReferenceId"]')
                //     .click()

                // function getRandomInt(max) {
                //     return Math.floor(Math.random() * max);
                // }

                // cy.get('input[name="bankReferenceId"]').type(getRandomInt(10000000));

                // cy.get('input[name="crop_bankReceipDocumentId_image"]')
                //     .should('be.visible')

                // cy.contains('p', 'Submit')
                //     .parent('button')

                // cy.contains('p', 'Cancel Request')
                //     .parent('button')
                //     .click()

                // cy.contains('h6', 'Cancel Local Exchange Deposit Request')

                // cy.contains('p', 'Are you sure you want to cancel local exchange deposit request?')

                // cy.get('p')
                //     .should('contain', 'Cancel Request');

                // cy.get('i.icon-Close')
                //     .parent('button')
                //     .click()

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
                    .contains('Deposit')
                    .parent('button')
                    .click()

                cy.get('h6')
                    .should('have.class', 'mui-5j9sfm')
                    .contains('Deposit')

                cy.get('#depositType_input_label')
                    .contains('Payment Method')

                cy.get('#mui-component-select-depositType').click();

                cy.get('ul[role="listbox"]').should('be.visible').within(() => {
                    cy.get('li').should('have.length', 3);

                    // cy.get('li').eq(0).should('contain', 'Crypto(Direct)');
                    cy.get('li').eq(0).should('contain', 'TRC20 (Tether)');
                    cy.get('li').eq(1).should('contain', 'Local exchange');
                    cy.get('li').eq(2).should('contain', 'TopChange');

                    cy.get('li').eq(2).should('contain', 'TopChange').click();
                })

                cy.get('#number_input_format_amountInDollar')
                    .click()

                cy.get('#number_input_format_amountInDollar')
                    .type(Cypress.env('amounttopchange'))

                cy.contains('p', 'Cancel')
                    .parent('button')

                cy.contains('p', 'Deposit')
                    .parent('button')

                cy.contains('p', 'Cancel')
                    .parent('button')
                    .click()


                cy.get('span', { timeout: 10000 })
                    .contains('Tickets')
                    .parents('div')
                    .should('be.visible')
                    .first()
                    .click()

                cy.get('#DetailedTypes_multi_select_filter')
                    .click()

                cy.get('ul.mui-1e6sbsr[role="menu"]', { timeout: 10000 }).should('be.visible').within(() => {
                    cy.get('li').should('have.length', 25);

                    cy.get('li').eq(0).should('contain', 'All');
                    cy.get('li').eq(1).should('contain', 'Local Exchange');
                    cy.get('li').eq(2).should('contain', 'Top Change');
                    cy.get('li').eq(3).should('contain', 'Crypto Exchange');
                    cy.get('li').eq(4).should('contain', 'Crypto Auto Withdraw');
                    cy.get('li').eq(5).should('contain', 'TPay (crypto)');
                    cy.get('li').eq(6).should('contain', 'Crypto (Direct)');
                    cy.get('li').eq(7).should('contain', 'Special Transfer');
                    cy.get('li').eq(8).should('contain', 'Add Fund');
                    cy.get('li').eq(9).should('contain', 'Remove Fund');
                    cy.get('li').eq(10).should('contain', 'IB To Client');
                    cy.get('li').eq(11).should('contain', 'Client To IB');
                    cy.get('li').eq(12).should('contain', 'TopChange WhiteList');
                    cy.get('li').eq(13).should('contain', 'Crypto WhiteList');
                    cy.get('li').eq(14).should('contain', 'LocalExchange WhiteList');
                    cy.get('li').eq(15).should('contain', 'IB Request');
                    cy.get('li').eq(16).should('contain', 'Set IB');
                    cy.get('li').eq(17).should('contain', 'Remove IB');
                    cy.get('li').eq(18).should('contain', 'Change Leverage');
                    cy.get('li').eq(19).should('contain', 'Support Chat');
                    cy.get('li').eq(20).should('contain', 'Pro Trader Request');
                    cy.get('li').eq(21).should('contain', 'Remove Fund (Social Trade)');
                    cy.get('li').eq(22).should('contain', 'Add Fund (Social Trade)');
                    cy.get('li').eq(23).should('contain', 'Wallet Transaction (Social Trade)');
                    cy.get('li').eq(24).should('contain', 'Follow Request (Social Trade)');

                    cy.get('li').eq(2).should('contain', 'Top Change').click();
                })


                cy.contains('button', 'Apply')
                    .click()

                cy.get('nav h6')
                    .invoke('text')
                    .then((text) => text.includes('from 0'))
                    .then((isEmpty) => {

                        if (isEmpty) {

                            cy.get('p').contains('No data to display').should('be.visible');

                        } else {


                            // بررسی اینکه "5 Per Page" فعال باشد
                            cy.get('div[role="combobox"]').should('contain', '5 Per Page')

                            // بررسی تعداد ردیف‌های جدول (نباید بیشتر از 5 باشد)
                            cy.get('tbody.MuiTableBody-root > tr', { timeout: 10000 }).then(rows => {
                                const rowCount = rows.length
                                expect(rowCount).to.be.lte(5) // باید کمتر مساوی ۵ باشد
                            })

                            cy.get('button i.icon-DirectionRight')
                                .first()
                                .parent('button')
                                .click()

                            cy.contains('h6', 'Ticket Detail')
                                .should('be.visible')

                            cy.contains('span', 'Subject:')

                            cy.contains('span', 'Deposit')

                            cy.contains('span', 'Type:')

                            cy.contains('span', 'Top Change')

                            cy.contains('span', 'Created Date:')

                            cy.contains('span', 'Name:')

                            cy.contains('span', 'Email:')

                            cy.contains('span', 'Balance:')

                            cy.contains('span', 'Credit:')

                            cy.contains('span', 'Status:')

                            cy.contains('span', 'Wallet:')

                            cy.contains('span', 'Amount:')

                            cy.contains('span', 'Commission:')

                            cy.contains('span', 'Commission applied amount:')

                            cy.contains('span', 'Invoice number:')

                            cy.contains('span', 'Transaction id:')

                            cy.contains('p', 'Back')

                            cy.get('i.icon-DirectionLeft-sign')
                                .parent('button')
                                .click()

                            cy.get('h6', { timeout: 40000 })
                                .contains('Tickets')

                        }

                    })


            })
        })

    })
})