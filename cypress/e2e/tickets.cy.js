

describe('Tickets', () => {
    it('login to tickets', () => {

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
                    .contains('Tickets')
                    .parents('div')
                    .should('be.visible')
                    .first()
                    .click()

                cy.url().should('eq', Cypress.env('CRMUrl') + '/tickets?Skip=0&Take=5&IsDescending=true')

                cy.get('h1')
                    .contains('Tickets List')
                    .should('be.visible')

                //filter
                cy.get('#DetailedTypes_multi_select_filter')
                    .contains('All')
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
                })

                cy.get('button')
                    .should('be.visible')
                    .contains('Cancel')

                cy.get('button')
                    .should('be.visible')
                    .contains('Apply')
                    .click()

                // Status filter
                cy.get('#mui-component-select-Status')
                    .should('be.visible')
                    .contains('All')
                    .click()

                cy.get('ul[role="listbox"]').should('be.visible').within(() => {
                    cy.get('li').should('have.length', 4);

                    cy.get('li').eq(0).should('contain', 'All');
                    cy.get('li').eq(1).should('contain', 'New');
                    cy.get('li').eq(2).should('contain', 'Done');
                    cy.get('li').eq(3).should('contain', 'Reject/Cancel');

                    cy.get('li.Mui-selected').should('contain', 'All').click();
                })

                cy.get('ul[role="listbox"]').should('not.exist');

                //Date filter
                const now = new Date()
                const currentYear = now.getFullYear()
                const currentMonth = now.toLocaleString('default', { month: 'long' }) // خروجی مثل: "May"

                cy.get('#date_range_picker_filter')
                    .should('be.visible')
                    .click()

                cy.get('p')
                    .should('be.visible')
                    .contains('Date')

                cy.get('#mui-component-select-date_rangePicker_filter_year')
                    .click()

                cy.get('ul[role="listbox"]').within(() => {
                    cy.contains('li', currentYear.toString()).click()
                })


                cy.get('#mui-component-select-date_rangePicker_filter_month')
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

                                    cy.contains('th', 'Ticket Number')
                                    cy.contains('th', 'Subject')
                                    cy.contains('th', 'Type')
                                    cy.contains('th', 'Request Status')
                                    cy.contains('th', 'Status')
                                    cy.contains('th', 'Last Update')

                                })
                                
                            // بررسی اینکه "5 Per Page" فعال باشد
                            cy.get('div[role="combobox"]').should('contain', '5 Per Page')

                            // بررسی تعداد ردیف‌های جدول (نباید بیشتر از 5 باشد)
                            cy.get('tbody.MuiTableBody-root > tr', { timeout: 10000 }).then(rows => {
                                const rowCount = rows.length
                                expect(rowCount).to.be.lte(5) // باید کمتر مساوی ۵ باشد
                            })

                            cy.get('td button')
                                .first()
                                .click()

                            cy.get('h6')
                                .contains('Dashboard')
                                .should('be.visible')

                            cy.get('h6')
                                .contains('Tickets')
                                .should('be.visible')

                            cy.get('h6')
                                .contains('Ticket Detail')
                                .should('be.visible')

                            cy.get('button i.icon-DirectionLeft-sign')
                                .should('be.visible')
                                .click()

                        }
                    })
            })
        })
    })

    it('Create new tickets', () => {

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
                    .contains('Tickets')
                    .parents('div')
                    .should('be.visible')
                    .first()
                    .click()

                cy.get('a[href="/tickets/create"]')
                    .first()
                    .should('exist')
                    .and('be.visible')
                    .within(() => {
                        // بررسی وجود دکمه و متن درست
                        cy.get('button')
                            .should('contain.text', 'Create New Ticket')
                            .and('be.visible')

                        // بررسی وجود آیکون در داخل دکمه
                        cy.get('i.icon-Add').should('exist')
                    })

                // کلیک روی لینک
                cy.get('button').contains('Create New Ticket').click()

                cy.url().should('eq', Cypress.env('CRMUrl') + '/tickets/create')

                cy.get('button i')
                    .should('be.visible')

                cy.get('h1')
                    .contains('Create New Ticket')
                    .should('be.visible')

                cy.get('input[name="subject"]')
                    .should('be.visible')

                cy.get('#mui-component-select-conversationCategoryId')
                    .click()

                cy.get('ul[role="listbox"]').should('be.visible').within(() => {
                    cy.get('li').should('have.length', 5);

                    cy.get('li').eq(0).should('contain', 'Technical & Platform Issues');
                    cy.get('li').eq(1).should('contain', 'Financial Operations');
                    cy.get('li').eq(2).should('contain', 'Account Issues');
                    cy.get('li').eq(3).should('contain', 'Complaints & Feedback');
                    cy.get('li').eq(4).should('contain', 'General Issues');

                    cy.get('li').eq(0).should('contain', 'Technical & Platform Issues').click();

                })

                cy.get('ul[role="listbox"]').should('not.exist');

                cy.get('#mui-component-select-conversationPriority')
                    .click()

                cy.get('ul[role="listbox"]').should('be.visible').within(() => {
                    cy.get('li').should('have.length', 3);

                    cy.get('li').eq(0).should('contain', 'Low');
                    cy.get('li').eq(1).should('contain', 'Medium');
                    cy.get('li').eq(2).should('contain', 'High');

                    cy.get('li').eq(0).should('contain', 'Low').click();

                })

                cy.get('ul[role="listbox"]').should('not.exist');

                cy.get('textarea[name="message"]')
                    .should('be.visible')

                cy.get('input[name="crop_documentId_image"]')

                cy.get('p')
                    .contains('Create Ticket')
                    .should('be.visible')
                    .parents('button[type="submit"]')

                cy.get('p')
                    .contains('Cancel')
                    .should('be.visible')
                    .first()
                    .click()

            })
        })
    })
})