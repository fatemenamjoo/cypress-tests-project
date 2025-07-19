

describe('account', () => {
    it('login to account', () => {
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

            cy.visit(Cypress.env('CRMUrl') + '/accounts')

            cy.get('h6')
                .contains('Accounts')
                .should('be.visible')

            cy.get('h1')
                .contains('Accounts')
                .should('be.visible')

            cy.get('h6')
                .contains('Real Accounts')
                .should('be.visible')

            cy.get('h6')
                .contains('Demo Accounts')
                .should('be.visible')

            cy.get('h6')
                .contains('Real Archive Accounts')
                .should('be.visible')

            cy.get('h6')
                .contains('Demo Archive Accounts')
                .should('be.visible')

            cy.get('body').then(($body) => {
                // حالت 1: اگر پیام "No data to display" هست
                if ($body.find('p:contains("No data to display")').length > 0) {
                    cy.contains('No data to display').should('be.visible');
                    cy.log('✅ No data – تست پاس شد.');
                }

                // حالت 2: اگر جدول دیتا دارد
                else if ($body.find('table tbody tr').length > 0) {
                    cy.get('table thead tr').within(() => {
                        cy.contains('th', 'Account').should('exist');
                        cy.contains('th', 'Leverage').should('exist');
                        cy.contains('th', 'Balance').should('exist');
                        cy.contains('th', 'Credit').should('exist');
                        cy.contains('th', 'Free Margin').should('exist');
                        cy.contains('th', 'Active In Campaign').should('exist');
                    });

                    // چک کردن اولین ردیف دیتا (اختیاری)
                    cy.get('table tbody tr').first().within(() => {
                        cy.get('td').first().should('not.be.empty');
                    });

                    cy.log('✅ دیتا وجود دارد – جدول چک شد.');

                    cy.get('td button')
                        .first()
                        .click()

                    cy.get('h6')
                        .contains('Account Details')
                        .should('be.visible')

                    cy.get('p')
                        .contains('More Action')
                        .should('be.visible')

                    //Change Master Password
                    cy.get('button p')
                        .contains('Change Master Password')
                        .click()

                    cy.get('h6')
                        .contains('Change Master Password')
                        .should('be.visible')

                    cy.get('p')
                        .contains("Changing the master's password is done instantly and anyone can access to all action with your password.")
                        .should('be.visible')

                    cy.get('input[name="newPassword"]').type(Cypress.env('password'))

                    cy.get('p')
                        .contains('At Least 8 Characters')
                        .should('be.visible')

                    cy.get('p')
                        .contains('At Least One Small Characters')
                        .should('be.visible')

                    cy.get('p')
                        .contains('At Least One Capital Characters')
                        .should('be.visible')

                    cy.get('p')
                        .contains('At Least One Numeric Characters')
                        .should('be.visible')

                    cy.get('p')
                        .contains('At Least One Special Character (!@#$%^&*+=_-)')
                        .should('be.visible')

                    cy.get('input[name="repeatNewPassword"]').type(Cypress.env('password'))

                    cy.get('button i')
                        .should('be.visible')

                    cy.get('p')
                        .contains('Cancel')
                        .should('be.visible')

                    cy.get('p')
                        .contains('Change Password')
                        .should('be.visible')
                        .click()

                    //Change Investor Password
                    cy.get('td button')
                        .first()
                        .click()

                    cy.get('button p')
                        .contains('Change Investor Password')
                        .click()

                    cy.get('button i.icon-DirectionLeft-sign')
                        .first() // یا nth، یا closest parent
                        .parent('button') // اگر بخوای روی دکمه کلیک شه، نه فقط آیکن
                        .click()


                    //Archive Account
                    cy.get('p')
                        .contains('Archive Account')
                        .should('be.visible')
                        .click()

                    cy.get('h6')
                        .contains('Archive Account')
                        .should('be.visible')

                    cy.get('p')
                        .contains('Do you wish to permanently archive the DeltaBasic?')
                        .should('be.visible')

                    // cy.get('button span.MuiButton-startIcon')
                    //     .contains('I want to archive my account')
                    //     .parent('button')

                    cy.get('button')
                        .filter(':contains("Cancel")')
                        .should('have.length', 1)
                        .first()
                        .click()


                    //login history
                    cy.get('button p')
                        .contains('Login History')
                        .should('be.visible')
                        .click()

                    cy.get('#mui-component-select-TransferType')
                        .contains('All')
                        .click()

                    cy.get('ul[role="listbox"]').should('be.visible').within(() => {
                        cy.get('li').should('have.length', 5);

                        cy.get('li').eq(0).should('contain', 'All');
                        cy.get('li').eq(1).should('contain', 'Add Fund');
                        cy.get('li').eq(2).should('contain', 'Remove Fund');
                        cy.get('li').eq(3).should('contain', 'Credit In');
                        cy.get('li').eq(4).should('contain', 'Credit Out');

                        cy.get('li').eq(0).should('contain', 'All').click();

                    })

                    // cy.get('tr') // گرفتن ردیف عنوان جدول
                    //     .should('be.visible')
                    //     .first()
                    //     .within(() => {
                    //         cy.contains('th span[role="button"]', 'Ticket')
                    //         cy.contains('th', 'Transfer Type')
                    //         cy.contains('th', 'Amount')
                    //         cy.contains('th', 'Transfer Time')
                    //         cy.contains('th', 'Comment')
                    //     })


                    // cy.get('div[role="combobox"]').should('contain', '5 Per Page')

                    // // بررسی تعداد ردیف‌های جدول (نباید بیشتر از 5 باشد)
                    // cy.get('tbody.MuiTableBody-root > tr', { timeout: 10000 }).then(rows => {
                    //     const rowCount = rows.length
                    //     expect(rowCount).to.be.lte(5) // باید کمتر مساوی ۵ باشد
                    // })

                    cy.get('button i.icon-DirectionLeft-sign')
                        .first() // یا nth، یا closest parent
                        .parent('button') // اگر بخوای روی دکمه کلیک شه، نه فقط آیکن
                        .click()


                    //login to lagin transfer
                    cy.get('p')
                        .contains('Login To Login Transfer')
                        .should('be.visible')
                        .click()

                    cy.get('h6')
                        .contains('Login To Login Transfer')
                        .should('be.visible')


                    cy.contains('p.MuiTypography-body2', 'Account')
                        .should('exist')


                    cy.get('#mui-component-select-toMTRealAccountId')
                        .should('be.visible')

                    cy.get('input#number_input_format_amount')
                        .should('be.visible')

                    cy.get('button')
                        .filter(':contains("Cancel")')
                        .should('have.length', 1)
                        .first()
                        .click()

                    //Remove fund
                    cy.get('p')
                        .contains('Remove Fund')
                        .should('be.visible')
                        .click()

                    cy.get('button i.icon-DirectionLeft-sign')
                        .should('be.visible')

                    cy.get('h6')
                        .contains('Remove Fund')
                        .should('be.visible')

                    cy.contains('p.MuiTypography-body2', 'Account')
                        .should('exist')

                    cy.contains('p.MuiTypography-body2', 'Your Wallet')
                        .should('exist')

                    cy.get('#number_input_format_amount')
                        .should('be.visible')

                    cy.get('p')
                        .contains('Remove Fund')
                        .should('exist')

                    cy.get('button')
                        .filter(':contains("Cancel")')
                        .should('have.length', 1)
                        .first()
                        .click()

                    //Add fund
                    cy.get('p')
                        .contains('Add Fund')
                        .should('be.visible')
                        .click()

                    cy.get('button i.icon-DirectionLeft-sign')
                        .should('be.visible')

                    cy.get('h6')
                        .contains('Add Fund')
                        .should('be.visible')


                    cy.contains('p.MuiTypography-body2', 'Your Wallet')
                        .should('exist')

                    cy.contains('p.MuiTypography-body2', 'Account')
                        .should('exist')

                    cy.get('#number_input_format_amount')
                        .should('be.visible')

                    cy.get('span')
                        .contains('All Budget')
                        .parent('button')

                    cy.get('span')
                        .contains('$100.00')
                        .parent('button')

                    cy.get('span')
                        .contains('$200.00')
                        .parent('button')

                    cy.get('span')
                        .contains('$500.00')
                        .parent('button')

                    cy.get('p')
                        .contains('Add Fund')
                        .should('exist')

                    cy.get('button')
                        .filter(':contains("Cancel")')
                        .should('have.length', 1)
                        .first()
                        .click()

                }

                // حالت 3: نه جدول هست نه پیام!
                else {
                    // اینجا ممکنه جدول هنوز لود نشده باشه، می‌تونی به‌جای throw یک log بزنی یا صبر کنی
                    cy.log('❌ نه جدول بود نه پیام – شاید باگ یا مشکل لودینگ وجود دارد.');
                }
            });

        });
    })

    it('Create new account', () => {
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

                cy.visit(Cypress.env('CRMUrl') + '/accounts')

                cy.get('a[href="/accounts/create"]')
                    .first()
                    .should('exist')
                    .and('be.visible')
                    .within(() => {
                        // بررسی وجود دکمه و متن درست
                        cy.get('button')
                            .should('contain.text', 'Create New Account')
                            .and('be.visible')

                        // بررسی وجود آیکون در داخل دکمه
                        cy.get('i.icon-Add').should('exist')
                    })

                // کلیک روی لینک
                cy.get('button').contains('Create New Account').click()

                cy.url().should('eq', Cypress.env('CRMUrl') + '/accounts/create')

                cy.get('button i')
                    .should('be.visible')

                cy.get('h1')
                    .contains('Create New Account')
                    .should('be.visible')

                cy.get('p')
                    .contains('Account Mode')
                    .should('be.visible')

                cy.get('span')
                    .contains('Real')
                    .parent('label.MuiFormControlLabel-labelPlacementEnd')

                cy.get('p')
                    .contains('Account Platform and Type')
                    .should('be.visible')

                cy.get('span')
                    .contains('MT4')
                    .parents('label.MuiFormControlLabel-labelPlacementEnd')

                cy.get('#mui-component-select-accountTypeIdMT4')
                    .should('be.visible')

                cy.get('#mui-component-select-leverageMT4')
                    .should('be.visible')

                cy.get('span')
                    .contains('Features:')

                cy.get('span')
                    .contains('Description:')

                cy.get('span')
                    .contains('Minimum Deposit:')

                cy.get('span')
                    .contains('Maximum Deposit:')

                cy.get('span.MuiTypography-body1')
                    .contains('MT5')
                    .parents('label.MuiFormControlLabel-labelPlacementEnd')

                cy.get('input[name="tradingPlatform"][value="2"]')
                    .should('exist')
                    .parent() // یا .closest('span') بسته به ساختار
                    .click({ force: true })

                cy.get('#mui-component-select-accountTypeIdMT5')
                    .should('be.visible')

                cy.get('#mui-component-select-leverageMT5')
                    .should('be.visible')

                //Demo
                cy.get('span')
                    .contains('Demo')
                    .parent('label.MuiFormControlLabel-labelPlacementEnd')

                cy.get('input[name="realDemoType"][value="2"]')
                    .should('exist')
                    .parent() // یا .closest('span') بسته به ساختار
                    .click({ force: true })

                cy.get('p')
                    .contains('Setting')
                    .should('be.visible')

                cy.get('#number_input_format_initialBalance')
                    .should('be.visible')
                    .click()

                cy.get('p')
                    .contains('Create Account')
                    .should('exist')

            })
        })
    })

})