
describe('Socialtrading', () => {
    it('show Dashboard protrader and detail ', () => {
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
                    .contains('Social trading')
                    .parents('div')
                    .should('be.visible')
                    .first()
                    .click()

                const menuItems = [
                    { label: 'Dashboard', href: '/social-trading/dashboard' },
                    { label: 'Following', href: '/social-trading/following' },
                    { label: 'Explore', href: '/social-trading/explore' }
                ]

                cy.get('#sidebar_submenu li').should('have.length', 4) // چون یک <li> اضافی به عنوان ساب‌هد وجود دارد

                menuItems.forEach((item, index) => {
                    // چون index=0 ساب‌هد است، آیتم‌ها از index=1 شروع می‌شن
                    cy.get(`#sidebar_submenu li`).eq(index + 1).within(() => {
                        cy.get('a').should('have.attr', 'href', item.href)
                        cy.contains(item.label).should('exist')
                    })
                })

                cy.get('a[href="/social-trading/dashboard"]').click({ multiple: true })

                cy.url().should('eq', Cypress.env('CRMUrl') + '/social-trading/dashboard')

                cy.get('h6')
                    .contains('Dashboard')
                    .should('be.visible')

                cy.get('h6')
                    .contains('Social trading')
                    .should('be.visible')

                cy.get('h6')
                    .contains('Dashboard')
                    .should('be.visible')

                cy.get('h1')
                    .contains('Dashboard')
                    .should('be.visible')

                //Type
                cy.get('#mui-component-select-AccountType', { timeout: 40000 }).should('be.visible')
                    .click()

                cy.get('ul[role="listbox"]').should('be.visible').within(() => {
                    cy.get('li').should('have.length', 5);

                    cy.get('li').eq(0).should('contain', 'All');
                    cy.get('li').eq(1).should('contain', 'Profit fee');
                    cy.get('li').eq(2).should('contain', 'Lot fee');
                    cy.get('li').eq(3).should('contain', 'Subscribe fee');
                    cy.get('li').eq(4).should('contain', 'PAMM');

                    cy.get('li').eq(0).should('contain', 'All').click()
                })

                //Checkout Period
                cy.get('#mui-component-select-CheckoutPeriodType')
                    .click()

                cy.get('ul[role="listbox"]').should('be.visible').within(() => {
                    cy.get('li').should('have.length', 3);

                    cy.get('li').eq(0).should('contain', 'All');
                    cy.get('li').eq(1).should('contain', 'Weekly');
                    cy.get('li').eq(2).should('contain', 'Monthly');

                    cy.get('li').eq(0).should('contain', 'All').click();
                })

                //Privacy
                cy.get('#mui-component-select-AccountPrivacy')
                    .click()

                cy.get('ul[role="listbox"]').should('be.visible').within(() => {
                    cy.get('li').should('have.length', 3);

                    cy.get('li').eq(0).should('contain', 'All');
                    cy.get('li').eq(1).should('contain', 'Public');
                    cy.get('li').eq(2).should('contain', 'Private');

                    cy.get('li').eq(0).should('contain', 'All').click()
                })

                //Trading Style
                cy.get('#mui-component-select-TradingStyle')
                    .click()


                cy.get('ul[role="listbox"]').should('be.visible').within(() => {
                    cy.get('li').should('have.length', 4);

                    cy.get('li').eq(0).should('contain', 'All');
                    cy.get('li').eq(1).should('contain', 'Short Term');
                    cy.get('li').eq(2).should('contain', 'Medium Term');
                    cy.get('li').eq(3).should('contain', 'Long Term');

                    cy.get('li').eq(0).should('contain', 'All').click()
                })

                //Searche Type
                cy.get('#mui-component-select-optionalSearch')
                    .should('be.visible')
                    .click()


                cy.get('ul[role="listbox"]', { timeout: 5000 }).should('be.visible').within(() => {

                    cy.get('li').should('have.length.at.least', 2)

                    cy.get('li').eq(0).should('contain.text', 'Account name')
                    cy.get('li').eq(1).should('contain.text', 'Login')

                    cy.get('li').eq(0).should('contain.text', 'Account name').click()
                })

                cy.get('button i.icon-Search')
                    .first()
                    .parent('button')

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

                                    cy.contains('th', 'Name')
                                    cy.contains('th', 'Login')
                                    cy.contains('th', 'Type')
                                    cy.contains('th', 'Privacy')
                                    cy.contains('th', 'Checkout')
                                    cy.contains('th', 'Min Balance')
                                    cy.contains('th', 'Investors')
                                    cy.contains('th', 'Trading Style')
                                    cy.contains('th', 'Request Status')
                                    cy.contains('th', 'Status')
                                    cy.contains('th', 'Gain')

                                })

                            cy.get('div[role="combobox"]').should('contain', '5 Per Page')

                            cy.get('tbody.MuiTableBody-root > tr', { timeout: 10000 }).then(rows => {
                                const rowCount = rows.length
                                expect(rowCount).to.be.lte(5)
                            })

                            cy.get('button i.icon-DirectionRight')
                                .first()
                                .parent('button')
                                .click()

                            cy.get('h6')
                                .contains('Dashboard')
                                .should('be.visible')

                            cy.get('h6')
                                .contains('Social trading')
                                .should('be.visible')

                            cy.get('h6')
                                .contains('Dashboard')
                                .should('be.visible')

                            cy.get('h6')
                                .contains('Detail')
                                .should('be.visible')

                            cy.get('i.icon-DirectionLeft-sign')
                                .should('be.visible')

                            cy.get('p')
                                .contains('Back')
                                .should('be.visible')

                            cy.get('button:contains("Disable Account")', { timeout: 4000 })
                                .then(($btn) => {
                                    const isDisabled = $btn.prop('disabled');

                                    if (isDisabled) {

                                        cy.log('❗ دکمه غیرفعال است، کلیک انجام نشد.');

                                    } else {
                                        cy.wrap($btn).click();
                                        cy.log('✅ دکمه فعال بود، کلیک انجام شد.');
                                        cy.get('h6')
                                            .contains('Disable Account')
                                            .should('be.visible')

                                        cy.get('p')
                                            .contains('Are you sure you want to disable this account?')
                                            .should('be.visible')

                                        cy.get('p')
                                            .contains('Disable')
                                            .should('be.visible')

                                        cy.get('i.icon-Close')
                                            .parents('button')
                                            .click()
                                    }
                                });

                            //Account Information
                            cy.get('button')
                                .contains('Account Information')
                                .should('be.visible')

                            cy.get('span')
                                .contains('Login:')
                                .should('be.visible')
                            cy.get('span')
                                .contains('Investors:')
                                .should('be.visible')
                            cy.get('span')
                                .contains('Draw down:')
                                .should('be.visible')
                            cy.get('span')
                                .contains('Minimum balance:')
                                .should('be.visible')
                            cy.get('span')
                                .contains('Account type:')
                                .should('be.visible')
                            cy.get('span')
                                .contains('Commission:')
                                .should('be.visible')
                            cy.get('span')
                                .contains('Checkout period:')
                                .should('be.visible')
                            cy.get('span')
                                .contains('Privacy:')
                                .should('be.visible')
                            cy.get('span')
                                .contains('Trading platform:')
                                .should('be.visible')
                            cy.get('span')
                                .contains('Protrader request status:')
                                .should('be.visible')

                            //    cy.contains('span', 'Account status:', { timeout: 5000 }).should('be.visible');


                            cy.get('span')
                                .contains('Trading style:')
                                .should('be.visible')
                            cy.get('span')
                                .contains('Description:')
                                .should('be.visible')

                            //General
                            cy.get('button')
                                .contains('General')
                                .first()
                                .click()

                            cy.get('span', { timeout: 40000 })
                                .contains('Total Gain:')
                                .should('be.visible')

                            cy.get('span')
                                .contains('Floating P/L:')
                                .should('be.visible')

                            cy.get('span')
                                .contains('Close trade P/L:')
                                .should('be.visible')

                            cy.get('span')
                                .contains('Margin:')
                                .should('be.visible')

                            cy.get('span')
                                .contains('Balance:')
                                .should('be.visible')

                            cy.get('span')
                                .contains('Free margin:')
                                .should('be.visible')

                            cy.get('span')
                                .contains('Credit:')
                                .should('be.visible')

                            cy.get('span')
                                .contains('Equity:')
                                .should('be.visible')

                            cy.get('span')
                                .contains('Account open date:')
                                .should('be.visible')

                            //Profit Loss
                            cy.get('button')
                                .contains('Profit Loss')
                                .first()
                                .should('be.visible')
                                .click()

                            cy.get('span')
                                .contains('Total net profit:')
                                .should('be.visible')

                            cy.get('span')
                                .contains('Gross profit:')
                                .should('be.visible')

                            cy.get('span')
                                .contains('Gross loss:')
                                .should('be.visible')

                            cy.get('span')
                                .contains('Open trades:')
                                .should('be.visible')

                            cy.get('span')
                                .contains('Close trades:')
                                .should('be.visible')

                            cy.get('span')
                                .contains('Total trades:')
                                .should('be.visible')

                            //Statistics
                            cy.get('button')
                                .contains('Statistics')
                                .first()
                                .should('be.visible')
                                .click()

                            cy.get('span')
                                .contains('Largest profit trade:')
                                .should('be.visible')

                            cy.get('span')
                                .contains('Largest loss trade:')
                                .should('be.visible')

                            cy.get('span')
                                .contains('Largest volume:')
                                .should('be.visible')

                            cy.get('span')
                                .contains('Profit factor:')
                                .should('be.visible')

                            cy.get('span')
                                .contains('Average profit trade:')
                                .should('be.visible')

                            cy.get('span')
                                .contains('Average loss trade:')
                                .should('be.visible')

                            cy.get('span')
                                .contains('Average volume:')
                                .should('be.visible')

                            //Campaign Information
                            cy.get('button')
                                .contains('Campaign Information')
                                .first()
                                .should('be.visible')
                                .click()

                            cy.get('body').then(($body) => {
                                // حالت 1: اگر پیام "No data to display" هست
                                if ($body.find('p:contains("No data to display")').length > 0) {
                                    cy.contains('No data to display').should('be.visible');
                                    cy.log('✅ No data – تست پاس شد.');
                                }

                                // حالت 2: اگر جدول دیتا دارد
                                else {

                                    cy.get('span')
                                        .contains('Name:')
                                        .should('be.visible')

                                    cy.get('span')
                                        .contains('Period (days):')
                                        .should('be.visible')

                                    cy.get('span')
                                        .contains('Bonus amount:')
                                        .should('be.visible')

                                    cy.get('span')
                                        .contains('Minimum add fund')
                                        .should('be.visible')

                                    cy.get('span')
                                        .contains('Total maximum bonus:')
                                        .should('be.visible')

                                    cy.get('span')
                                        .contains('Start date (UTC):')
                                        .should('be.visible')

                                    cy.get('span')
                                        .contains('End date (UTC):')
                                        .should('be.visible')

                                    cy.log('✅ دیتا وجود دارد – جدول چک شد.');
                                }

                            });

                            //Total Gain
                            cy.get('button')
                                .contains('Total Gain')
                                .first()
                                .should('be.visible')
                                .click()

                            cy.get('body').then(($body) => {
                                // حالت 1: اگر پیام "No data to display" هست
                                if ($body.find('p:contains("No data to display")').length > 0) {
                                    cy.contains('No data to display').should('be.visible');
                                    cy.log('✅ No data – تست پاس شد.');
                                }

                                // حالت 2: اگر جدول دیتا دارد
                                else {
                                    cy.get('span')
                                        .contains('Year:')
                                        .should('be.visible')

                                    cy.get('span')
                                        .contains('Jan')
                                        .should('be.visible')

                                    cy.get('span')
                                        .contains('Feb')
                                        .should('be.visible')

                                    cy.get('span')
                                        .contains('Mar')
                                        .should('be.visible')

                                    cy.get('span')
                                        .contains('Apr')
                                        .should('be.visible')

                                    cy.get('span')
                                        .contains('May')
                                        .should('be.visible')

                                    cy.get('span')
                                        .contains('June')
                                        .should('be.visible')

                                    cy.get('span')
                                        .contains('July')
                                        .should('be.visible')

                                    cy.get('span')
                                        .contains('Aug')
                                        .should('be.visible')

                                    cy.get('span')
                                        .contains('Sept')
                                        .should('be.visible')

                                    cy.get('span')
                                        .contains('Oct')
                                        .should('be.visible')

                                    cy.get('span')
                                        .contains('Dec')
                                        .should('be.visible')

                                    cy.get('p')
                                        .contains('Total:')
                                        .should('be.visible')
                                }
                            })

                            //Balance
                            cy.get('button')
                                .contains('Balance')
                                .first()
                                .should('be.visible')
                                .click()

                            //Followers
                            cy.get('button', { timeout: 550000 })
                                .contains('Followers')
                                .first()
                                .should('be.visible')
                                .click()

                            cy.get('nav h6')
                                .invoke('text')
                                .then((text) => text.includes('from 0'))
                                .then((isEmpty) => {

                                    if (isEmpty) {

                                        cy.contains('p', 'No data to display').should('be.visible');

                                    } else {

                                        cy.get('tr')
                                            .should('be.visible')
                                            .first()
                                            .within(() => {

                                                cy.contains('th', 'Login')
                                                cy.contains('th', 'Risk Percent')
                                                cy.contains('th', 'Balance')
                                                cy.contains('th', 'Net Deposit')
                                                cy.contains('th', 'Net Profit')
                                                cy.contains('th', 'Force Exit')
                                                cy.contains('th', 'Activity')

                                            })

                                        cy.get('i.icon-DirectionRight')
                                            .parent('button')
                                            .first()
                                            .click()

                                        cy.get('h6')
                                            .contains('Information')
                                            .should('be.visible')

                                        cy.get('p')
                                            .contains('Information')
                                            .should('be.visible')

                                        cy.get('p')
                                            .contains('Login')
                                            .should('be.visible')

                                        cy.get('p')
                                            .contains('Balance')
                                            .should('be.visible')

                                        cy.get('p')
                                            .contains('Net Deposit')
                                            .should('be.visible')

                                        cy.get('p')
                                            .contains('Net Profit')
                                            .should('be.visible')

                                        cy.get('p')
                                            .contains('Force Exit')
                                            .should('be.visible')

                                        cy.get('p')
                                            .contains('Activity')
                                            .should('be.visible')

                                        cy.get('i.icon-Close')
                                            .parent('button')
                                            .click()


                                    }
                                })

                            //Symbol
                            cy.get('button')
                                .contains('Symbol')
                                .first()
                                .should('be.visible')
                                .click()

                            //Commission Report
                            cy.get('button')
                                .contains('Commission Report')
                                .first()
                                .should('be.visible')
                                .click()

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

                            //Searche Type
                            cy.get('#mui-component-select-optionalSearch')
                                .should('be.visible')
                                .click()


                            cy.get('ul[role="listbox"]', { timeout: 5000 }).should('be.visible').within(() => {

                                cy.get('li').should('have.length.at.least', 1)

                                cy.get('li').eq(0).should('contain.text', 'Investor Login')

                                cy.get('li').eq(0).should('contain.text', 'Investor Login').click()
                            })

                            cy.get('i.icon-Search')
                                .parent('button')


                            cy.get('nav h6')
                                .invoke('text')
                                .then((text) => text.includes('from 0'))
                                .then((isEmpty) => {

                                    if (isEmpty) {

                                        cy.get('p').contains('No data to display').should('be.visible');

                                    } else {


                                        cy.get('div[role="combobox"]').should('contain', '5 Per Page')


                                        cy.get('tbody.MuiTableBody-root > tr', { timeout: 10000 }).then(rows => {
                                            const rowCount = rows.length
                                            expect(rowCount).to.be.lte(5)
                                        })

                                        cy.get('tr')
                                            .should('be.visible')
                                            .first()
                                            .within(() => {

                                                cy.contains('th', 'Login')
                                                cy.contains('th', 'Total Net Profit')
                                                cy.contains('th', 'Commission')
                                                cy.contains('th', 'Amount')
                                                cy.contains('th', 'Status')
                                                cy.contains('th', 'Cancel Reason')
                                                cy.contains('th', 'Cancel Date')
                                                cy.contains('th', 'Start Date')
                                                cy.contains('th', 'End Date')
                                                cy.contains('th', 'Payment Date')
                                                cy.contains('th', 'Calculation Date')
                                            })
                                    }
                                })

                            //Back to Dashboard
                            cy.get('i.icon-DirectionLeft-sign')
                                .should('be.visible')
                                .parent('button')
                                .click()
                        }
                    })
            })
        })
    })

    it('create protrader account', () => {
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
                    .contains('Social trading')
                    .parents('div')
                    .should('be.visible')
                    .first()
                    .click()

                const menuItems = [
                    { label: 'Dashboard', href: '/social-trading/dashboard' },
                    { label: 'Following', href: '/social-trading/following' },
                    { label: 'Explore', href: '/social-trading/explore' }
                ]

                cy.get('#sidebar_submenu li').should('have.length', 4) // چون یک <li> اضافی به عنوان ساب‌هد وجود دارد

                menuItems.forEach((item, index) => {
                    // چون index=0 ساب‌هد است، آیتم‌ها از index=1 شروع می‌شن
                    cy.get(`#sidebar_submenu li`).eq(index + 1).within(() => {
                        cy.get('a').should('have.attr', 'href', item.href)
                        cy.contains(item.label).should('exist')
                    })
                })

                cy.get('a[href="/social-trading/dashboard"]').click({ multiple: true })

                cy.url().should('eq', Cypress.env('CRMUrl') + '/social-trading/dashboard')

                cy.get('h6')
                    .contains('Dashboard')
                    .should('be.visible')

                cy.get('h6')
                    .contains('Social trading')
                    .should('be.visible')

                cy.get('h6')
                    .contains('Dashboard')
                    .should('be.visible')

                cy.get('h1')
                    .contains('Dashboard')
                    .should('be.visible')

                cy.get('h6')
                    .contains('Create new')
                    .should('be.visible')
                    .click()

                //Choose Type
                cy.get('p')
                    .contains('Choose Type')
                    .should('be.visible')

                cy.get('h6')
                    .contains('Profit fee')
                    .should('be.visible')

                cy.get('p')
                    .should('be.visible')

                cy.get('h6')
                    .contains('Choose')
                    .should('be.visible')
                    .click()

                cy.get('h6')
                    .contains('Dashboard')
                    .should('be.visible')

                cy.get('h6')
                    .contains('Social trading')
                    .should('be.visible')

                cy.get('h6')
                    .contains('Dashboard')
                    .should('be.visible')

                cy.get('h6')
                    .contains('Create new panel')
                    .should('be.visible')

                cy.get('i.icon-DirectionLeft-sign')
                    .parent('button')

                cy.get('h1')
                    .contains('Create new panel')
                    .should('be.visible')

                //Trading platform
                cy.get('#mui-component-select-tradingPlatform')
                    .click()

                cy.get('ul[role="listbox"]').should('be.visible').within(() => {
                    cy.get('li').should('have.length', 2);

                    cy.get('li').eq(0).should('contain', 'MT4');
                    cy.get('li').eq(1).should('contain', 'MT5');

                    cy.get('li.Mui-selected').should('contain', 'MT5').click();
                })

                //Choose your account
                cy.get('#mui-component-select-metaTraderLogin')
                    .should('be.visible')

                cy.get('input[name="name"]')
                    .should('be.visible')

                cy.get('input[name="commission"]')
                    .should('be.visible')

                cy.get('#number_input_format_investorMinimumBalance')
                    .should('be.visible')

                cy.get('#mui-component-select-tradingStyle')
                    .click()

                cy.get('ul[role="listbox"]').should('be.visible').within(() => {
                    cy.get('li').should('have.length', 3);

                    cy.get('li').eq(0).should('contain', 'Short Term');
                    cy.get('li').eq(1).should('contain', 'Medium Term');
                    cy.get('li').eq(2).should('contain', 'Long Term');

                    cy.get('li.Mui-selected').should('contain', 'Medium Term').click();
                })

                cy.get('textarea[name="description"]')
                    .should('be.visible')

                cy.get('p')
                    .contains('200 Characters remain')
                    .should('be.visible')

                cy.contains('Privacy')
                    .should('be.visible')

                cy.get('input[name="isPublic"]')

                cy.get('span')
                    .contains('Public')
                    .should('be.visible')

                cy.get('input[name="isPublic"]')

                cy.get('span')
                    .contains('Private')
                    .should('be.visible')


                cy.contains('Checkout period')
                    .should('be.visible')

                cy.get('input[name="checkoutPeriod"]')

                cy.get('span')
                    .contains('Weekly')
                    .should('be.visible')

                cy.get('input[name="checkoutPeriod"]')

                cy.get('span')
                    .contains('Monthly')
                    .should('be.visible')

                cy.get('label')
                    .contains('Copy Trade Type')
                    .should('be.visible')

                cy.get('input[name="copyTradeType"]')

                cy.get('span')
                    .contains('Free Margin')
                    .should('be.visible')

                cy.get('input[name="canChangeRiskScale"]')

                cy.get('span')
                    .contains('Can Change Risk Scale?')
                    .should('be.visible')

                cy.get('input[name="crop_documentId_image"]')

                cy.get('p')
                    .parent('button')
                    .contains('Create')

                cy.get('p')
                    .parent('button')
                    .contains('Cancel')
                    .click()

            })
        })
    })

    it('show Following', () => {
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
                    .contains('Social trading')
                    .parents('div')
                    .should('be.visible')
                    .first()
                    .click()

                const menuItems = [
                    { label: 'Dashboard', href: '/social-trading/dashboard' },
                    { label: 'Following', href: '/social-trading/following' },
                    { label: 'Explore', href: '/social-trading/explore' }
                ]

                cy.get('#sidebar_submenu li').should('have.length', 4) // چون یک <li> اضافی به عنوان ساب‌هد وجود دارد

                menuItems.forEach((item, index) => {
                    // چون index=0 ساب‌هد است، آیتم‌ها از index=1 شروع می‌شن
                    cy.get(`#sidebar_submenu li`).eq(index + 1).within(() => {
                        cy.get('a').should('have.attr', 'href', item.href)
                        cy.contains(item.label).should('exist')
                    })
                })

                cy.get('a[href="/social-trading/following"]').click({ multiple: true })

                cy.url().should('eq', Cypress.env('CRMUrl') + '/social-trading/following')

                cy.get('h6')
                    .contains('Dashboard')
                    .should('be.visible')

                cy.get('h6')
                    .contains('Social trading')
                    .should('be.visible')

                cy.get('h6')
                    .contains('Following')
                    .should('be.visible')

                cy.get('h1')
                    .contains('Following')
                    .should('be.visible')

                cy.get('#mui-component-select-AccountType')
                    .click()

                cy.get('ul[role="listbox"]').should('be.visible').within(() => {
                    cy.get('li').should('have.length', 5);

                    cy.get('li').eq(0).should('contain', 'All');
                    cy.get('li').eq(1).should('contain', 'Profit fee');
                    cy.get('li').eq(2).should('contain', 'Lot fee');
                    cy.get('li').eq(3).should('contain', 'Subscribe fee');
                    cy.get('li').eq(4).should('contain', 'PAMM');

                    cy.get('li').eq(0).should('contain', 'All').click()
                })

                cy.get('#mui-component-select-optionalSearch')
                    .click()

                cy.get('ul[role="listbox"]').should('be.visible').within(() => {
                    cy.get('li').should('have.length', 2);

                    cy.get('li').eq(0).should('contain', 'Account name');
                    cy.get('li').eq(1).should('contain', 'Login');

                    cy.get('li').eq(0).should('contain', 'Account name').click()
                })

                cy.get('i.icon-Search')
                    .parent('button')

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

                                    cy.contains('th', 'Name')
                                    cy.contains('th', 'Login')
                                    cy.contains('th', 'Type')
                                    cy.contains('th', 'Is Active')
                                    cy.contains('th', 'Draw Down')
                                    cy.contains('th', 'Min Balance')
                                    cy.contains('th', 'Active In Campaign')
                                    cy.contains('th', 'Gain')

                                })


                            cy.get('div[role="combobox"]').should('contain', '5 Per Page')


                            cy.get('tbody.MuiTableBody-root > tr', { timeout: 10000 }).then(rows => {
                                const rowCount = rows.length
                                expect(rowCount).to.be.lte(5)
                            })

                            cy.get('i.icon-DirectionRight')
                                .parent('button')
                                .first()
                                .click()

                            cy.contains('h6', 'Dashboard')
                                .should('be.visible')

                            cy.contains('h6', 'Social trading')
                                .should('be.visible')

                            cy.contains('h6', 'Following')
                                .should('be.visible')

                            cy.contains('h6', 'Detail')
                                .should('be.visible')

                            //Account Information
                            cy.get('button')
                                .contains('Account Information')
                                .should('be.visible')

                            cy.get('span')
                                .contains('Protrader account name:')
                                .should('be.visible')

                            cy.get('span')
                                .contains('Protrader login:')
                                .should('be.visible')

                            cy.get('span')
                                .contains('Investor login:')
                                .should('be.visible')

                            cy.get('span')
                                .contains('Is active:')
                                .should('be.visible')

                            cy.get('span')
                                .contains('Risk scale:')
                                .should('be.visible')

                            cy.get('span')
                                .contains('Force exit:')
                                .should('be.visible')

                            //Remove fund
                            cy.get('span')
                                .contains('Remove Fund')
                                .parent('button')
                                .first()
                                .click()

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
                            cy.get('button:contains("Add Fund")', { timeout: 4000 })
                                .then(($btn) => {
                                    const isDisabled = $btn.prop('disabled');

                                    if (isDisabled) {

                                        cy.log('❗ دکمه غیرفعال است، کلیک انجام نشد.');

                                    } else {
                                        cy.wrap($btn).click();
                                        cy.log('✅ دکمه فعال بود، کلیک انجام شد.');
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


                                });

                            //General
                            cy.get('button')
                                .contains('General')
                                .first()
                                .click()

                            cy.get('span', { timeout: 40000 })
                                .contains('Total Gain:')
                                .should('be.visible')

                            cy.get('span')
                                .contains('Floating P/L:')
                                .should('be.visible')

                            cy.get('span')
                                .contains('Close trade P/L:')
                                .should('be.visible')

                            cy.get('span')
                                .contains('Margin:')
                                .should('be.visible')

                            cy.get('span')
                                .contains('Balance:')
                                .should('be.visible')

                            cy.get('span')
                                .contains('Free margin:')
                                .should('be.visible')

                            cy.get('span')
                                .contains('Credit:')
                                .should('be.visible')

                            cy.get('span')
                                .contains('Equity:')
                                .should('be.visible')

                            cy.get('span')
                                .contains('Account open date:')
                                .should('be.visible')

                            //Profit Loss
                            cy.get('button')
                                .contains('Profit Loss')
                                .first()
                                .should('be.visible')
                                .click()

                            cy.get('span')
                                .contains('Total net profit:')
                                .should('be.visible')

                            cy.get('span')
                                .contains('Gross profit:')
                                .should('be.visible')

                            cy.get('span')
                                .contains('Gross loss:')
                                .should('be.visible')

                            cy.get('span')
                                .contains('Open trades:')
                                .should('be.visible')

                            cy.get('span')
                                .contains('Close trades:')
                                .should('be.visible')

                            cy.get('span')
                                .contains('Total trades:')
                                .should('be.visible')

                            //Statistics
                            cy.get('button')
                                .contains('Statistics')
                                .first()
                                .should('be.visible')
                                .click()

                            cy.get('span')
                                .contains('Largest profit trade:')
                                .should('be.visible')

                            cy.get('span')
                                .contains('Largest loss trade:')
                                .should('be.visible')

                            cy.get('span')
                                .contains('Largest volume:')
                                .should('be.visible')

                            cy.get('span')
                                .contains('Profit factor:')
                                .should('be.visible')

                            cy.get('span')
                                .contains('Average profit trade:')
                                .should('be.visible')

                            cy.get('span')
                                .contains('Average loss trade:')
                                .should('be.visible')

                            cy.get('span')
                                .contains('Average volume:')
                                .should('be.visible')


                            //Total Gain
                            cy.get('button')
                                .contains('Total Gain')
                                .first()
                                .should('be.visible')
                                .click()

                            cy.get('body').then(($body) => {
                                // حالت 1: اگر پیام "No data to display" هست
                                if ($body.find('p:contains("No data to display")').length > 0) {
                                    cy.contains('No data to display');
                                    cy.log('✅ No data – تست پاس شد.');
                                }

                                // حالت 2: اگر جدول دیتا دارد
                                else {
                                    cy.get('span')
                                        .contains('Year:')
                                        .should('be.visible')

                                    cy.get('span')
                                        .contains('Jan')
                                        .should('be.visible')

                                    cy.get('span')
                                        .contains('Feb')
                                        .should('be.visible')

                                    cy.get('span')
                                        .contains('Mar')
                                        .should('be.visible')

                                    cy.get('span')
                                        .contains('Apr')
                                        .should('be.visible')

                                    cy.get('span')
                                        .contains('May')
                                        .should('be.visible')

                                    cy.get('span')
                                        .contains('June')
                                        .should('be.visible')

                                    cy.get('span')
                                        .contains('July')
                                        .should('be.visible')

                                    cy.get('span')
                                        .contains('Aug')
                                        .should('be.visible')

                                    cy.get('span')
                                        .contains('Sept')
                                        .should('be.visible')

                                    cy.get('span')
                                        .contains('Oct')
                                        .should('be.visible')

                                    cy.get('span')
                                        .contains('Dec')
                                        .should('be.visible')

                                    cy.get('p')
                                        .contains('Total:')
                                        .should('be.visible')
                                }
                            })

                            //Open trades
                            cy.contains('button', 'Open Trades')
                                .should('be.visible')
                                .first()
                                .click()

                            cy.get('body').then($body => {
                                if ($body.find('table thead tr').length > 0) {

                                    cy.get('tr')
                                        .should('be.visible')
                                        .first()
                                        .within(() => {

                                            cy.contains('th', 'Name')
                                            cy.contains('th', 'Login')
                                            cy.contains('th', 'Type')
                                            cy.contains('th', 'Privacy')
                                            cy.contains('th', 'Checkout')
                                            cy.contains('th', 'Min Balance')
                                            cy.contains('th', 'Investors')
                                            cy.contains('th', 'Trading Style')
                                            cy.contains('th', 'Request Status')
                                            cy.contains('th', 'Status')
                                            cy.contains('th', 'Gain')

                                        })

                                    cy.get('div[role="combobox"]').should('contain', '5 Per Page')

                                    cy.get('tbody.MuiTableBody-root > tr', { timeout: 10000 }).then(rows => {
                                        const rowCount = rows.length
                                        expect(rowCount).to.be.lte(5)
                                    })


                                } else {
                                    // ❌ دیتا ندارد → بررسی پیام نداشتن دیتا
                                    cy.contains('0 - 0 from 0').should('be.visible');
                                    cy.contains('No data to display').should('be.visible');
                                }
                            });



                            // cy.get('nav h6')
                            //     .invoke('text')
                            //     .then((text) => text.includes('from 0'))
                            //     .then((isEmpty) => {

                            //         if (isEmpty) {
                            //             console.log('==================================>', isEmpty)
                            //             cy.get('p').contains('No data to display').should('be.visible');

                            //         } else {

                            //             // cy.get('tr')
                            //             //     .should('be.visible')
                            //             //     .first()
                            //             //     .within(() => {

                            //             //         cy.contains('th', 'Name')
                            //             //         cy.contains('th', 'Login')
                            //             //         cy.contains('th', 'Type')
                            //             //         cy.contains('th', 'Privacy')
                            //             //         cy.contains('th', 'Checkout')
                            //             //         cy.contains('th', 'Min Balance')
                            //             //         cy.contains('th', 'Investors')
                            //             //         cy.contains('th', 'Trading Style')
                            //             //         cy.contains('th', 'Request Status')
                            //             //         cy.contains('th', 'Status')
                            //             //         cy.contains('th', 'Gain')

                            //             //     })

                            //             // cy.get('div[role="combobox"]').should('contain', '5 Per Page')

                            //             // cy.get('tbody.MuiTableBody-root > tr', { timeout: 10000 }).then(rows => {
                            //             //     const rowCount = rows.length
                            //             //     expect(rowCount).to.be.lte(5)
                            //             // })


                            //         }
                            //     })


                            //Close trade
                            cy.contains('button', 'Close Trades')
                                .should('be.visible')
                                .first()
                                .click()

                            cy.get('body').then($body => {
                                if ($body.find('tr').length > 0) {
                                    cy.get('table thead tr')
                                        .should('be.visible')
                                        .first()
                                        .within(() => {

                                            cy.contains('th', 'Order')
                                            cy.contains('th', 'Symbol')
                                            cy.contains('th', 'Type')
                                            cy.contains('th', 'Volume')
                                            cy.contains('th', 'Commission')
                                            cy.contains('th', 'Profit')
                                            cy.contains('th', 'Open Price')
                                            cy.contains('th', 'Close Price')
                                            cy.contains('th', 'Open Time (UTC)')
                                            cy.contains('th', 'Close Time (UTC)')
                                            cy.contains('th', 'Comment')

                                        })

                                    cy.get('div[role="combobox"]').should('contain', '5 Per Page')

                                    cy.get('tbody.MuiTableBody-root > tr', { timeout: 10000 }).then(rows => {
                                        const rowCount = rows.length
                                        expect(rowCount).to.be.lte(5)
                                    })

                                    //datail
                                    cy.get('i.icon-DirectionRight')
                                        .parent('button')
                                        .first()
                                        .click()

                                    cy.contains('h6', 'Details')
                                        .should('be.visible')

                                    cy.contains('p', 'Information')
                                        .should('be.visible')

                                    cy.contains('p', 'Order')
                                        .should('be.visible')

                                    cy.contains('p', 'Symbol')
                                        .should('be.visible')

                                    cy.contains('p', 'Type')
                                        .should('be.visible')

                                    cy.contains('p', 'Stop Loss (SL)')
                                        .should('be.visible')

                                    cy.contains('p', 'Take Profit (TP)')
                                        .should('be.visible')

                                    cy.contains('p', 'Commission')
                                        .should('be.visible')

                                    cy.contains('p', 'Profit')
                                        .should('be.visible')

                                    cy.contains('p', 'Profit percent')
                                        .should('be.visible')

                                    cy.contains('p', 'Volume')
                                        .should('be.visible')

                                    cy.contains('p', 'Open time (UTC)')
                                        .should('be.visible')

                                    cy.contains('p', 'Open price')
                                        .should('be.visible')

                                    cy.contains('p', 'Close time (UTC)')
                                        .should('be.visible')

                                    cy.contains('p', 'Close price')
                                        .should('be.visible')

                                    cy.contains('p', 'Swap')
                                        .should('be.visible')

                                    cy.contains('p', 'Comment')
                                        .should('be.visible')

                                    cy.get('i.icon-Close')
                                        .parent('button')
                                        .first()
                                        .click()

                                } else {
                                    // ❌ دیتا ندارد → بررسی پیام نداشتن دیتا
                                    cy.contains('0 - 0 from 0').should('be.visible');
                                    cy.contains('No data to display').should('be.visible');
                                }
                            });



                            // cy.get('nav h6')
                            //     .invoke('text')
                            //     .then((text) => text.includes('from 0'))
                            //     .then((isEmpty) => {

                            //         if (isEmpty) {

                            //             cy.get('p').contains('No data to display').should('be.visible');

                            //         } else {

                            //         cy.get('tr')
                            //             .should('be.visible')
                            //             .first()
                            //             .within(() => {

                            //                 cy.contains('th', 'Order')
                            //                 cy.contains('th', 'Symbol')
                            //                 cy.contains('th', 'Type')
                            //                 cy.contains('th', 'Volume')
                            //                 cy.contains('th', 'Commission')
                            //                 cy.contains('th', 'Profit')
                            //                 cy.contains('th', 'Open Price')
                            //                 cy.contains('th', 'Close Price')
                            //                 cy.contains('th', 'Open Time (UTC)')
                            //                 cy.contains('th', 'Close Time (UTC)')
                            //                 cy.contains('th', 'Comment')

                            //             })

                            //         cy.get('div[role="combobox"]').should('contain', '5 Per Page')

                            //         cy.get('tbody.MuiTableBody-root > tr', { timeout: 10000 }).then(rows => {
                            //             const rowCount = rows.length
                            //             expect(rowCount).to.be.lte(5)
                            //         })

                            //         //datail
                            //         cy.get('i.icon-DirectionRight')
                            //             .parent('button')
                            //             .first()
                            //             .click()

                            //         cy.contains('h6', 'Details')
                            //             .should('be.visible')

                            //         cy.contains('p', 'Information')
                            //             .should('be.visible')

                            //         cy.contains('p', 'Order')
                            //             .should('be.visible')

                            //         cy.contains('p', 'Symbol')
                            //             .should('be.visible')

                            //         cy.contains('p', 'Type')
                            //             .should('be.visible')

                            //         cy.contains('p', 'Stop Loss (SL)')
                            //             .should('be.visible')

                            //         cy.contains('p', 'Take Profit (TP)')
                            //             .should('be.visible')

                            //         cy.contains('p', 'Commission')
                            //             .should('be.visible')

                            //         cy.contains('p', 'Profit')
                            //             .should('be.visible')

                            //         cy.contains('p', 'Profit percent')
                            //             .should('be.visible')

                            //         cy.contains('p', 'Volume')
                            //             .should('be.visible')

                            //         cy.contains('p', 'Open time (UTC)')
                            //             .should('be.visible')

                            //         cy.contains('p', 'Open price')
                            //             .should('be.visible')

                            //         cy.contains('p', 'Close time (UTC)')
                            //             .should('be.visible')

                            //         cy.contains('p', 'Close price')
                            //             .should('be.visible')

                            //         cy.contains('p', 'Swap')
                            //             .should('be.visible')

                            //         cy.contains('p', 'Comment')
                            //             .should('be.visible')

                            //         cy.get('i.icon-Close')
                            //             .parent('button')
                            //             .first()
                            //             .click()



                            //     }
                            // })

                            //Profit Report
                            cy.contains('button', 'Profit Report')
                                .should('be.visible')
                                .first()
                                .click()

                            //Date
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

                                                cy.contains('th', 'Investor Profit')
                                                cy.contains('th', 'Protrader Commission')
                                                cy.contains('th', 'Payment Date')

                                            })

                                        cy.get('div[role="combobox"]').should('contain', '5 Per Page')

                                        cy.get('tbody.MuiTableBody-root > tr', { timeout: 10000 }).then(rows => {
                                            const rowCount = rows.length
                                            expect(rowCount).to.be.lte(5)
                                        })

                                        cy.get('i.icon-DirectionRight')
                                            .parent('button')
                                            .first()
                                            .click()

                                        cy.contains('h6', 'Details')
                                            .should('be.visible')

                                        cy.get('p')
                                            .contains('Information')
                                            .should('be.visible')

                                        cy.get('p')
                                            .contains('Investor Profit')
                                            .should('be.visible')

                                        cy.get('p')
                                            .contains('Protrader Commission')
                                            .should('be.visible')

                                        cy.get('p')
                                            .contains('Payment Date')
                                            .should('be.visible')

                                        cy.get('i.icon-Close')
                                            .parent('button')
                                            .click()

                                    }
                                })

                            cy.get('button')
                                .contains('Transaction History')
                                .first()
                                .click()

                            cy.get('#mui-component-select-SocialTradingPaymentsType')
                                .should('be.visible')
                                .contains('All')
                                .click()

                            cy.get('ul[role="listbox"]').should('be.visible').within(() => {
                                cy.get('li').should('have.length', 4);

                                cy.get('li').eq(0).should('contain', 'All');
                                cy.get('li').eq(1).should('contain', 'Add Fund');
                                cy.get('li').eq(2).should('contain', 'Remove Fund');
                                cy.get('li').eq(3).should('contain', 'Commission');

                                cy.get('li.Mui-selected').should('contain', 'All').click();
                            })

                            //Date
                            const now = new Date()
                            const currentYear = now.getFullYear()
                            const currentMonth = now.toLocaleString('default', { month: 'long' }) // خروجی مثل: "May"

                            cy.get('#registerTime_range_picker_filter')
                                .click()

                            cy.get('p')
                                .should('be.visible')
                                .contains('Register Time')

                            cy.get('#mui-component-select-registerTime_rangePicker_filter_year')
                                .click()

                            cy.get('ul[role="listbox"]').within(() => {
                                cy.contains('li', currentYear.toString()).click()
                            })


                            cy.get('#mui-component-select-registerTime_rangePicker_filter_month')
                                .click()

                            cy.get('ul[role="listbox"]').within(() => {
                                cy.contains('li', currentMonth).click()
                            })

                            cy.get('span.sd').contains(/^5$/).parent('div').click();


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

                                                cy.contains('th', 'Login')
                                                cy.contains('th', 'Amount')
                                                cy.contains('th', ' Transfer Type')
                                                cy.contains('th', 'Register Time')

                                            })

                                        cy.get('div[role="combobox"]').should('contain', '5 Per Page')

                                        cy.get('tbody.MuiTableBody-root > tr', { timeout: 10000 }).then(rows => {
                                            const rowCount = rows.length
                                            expect(rowCount).to.be.lte(5)
                                        })

                                        cy.get('button i.icon-DirectionRight')
                                            .first()
                                            .parent('button')
                                            .click()

                                        cy.contains('h6', 'Information')
                                            .should('be.visible')

                                        cy.contains('p', 'Information')
                                            .should('be.visible')

                                        cy.contains('p', 'Login')
                                            .should('be.visible')

                                        cy.get('span')
                                            .contains('Amount')
                                            .should('be.visible')

                                        cy.contains('p', ' Transfer Type')
                                            .should('be.visible')

                                        cy.contains('p', 'Register Time')
                                            .should('be.visible')

                                        cy.get('i.icon-Close')
                                            .parent('button')
                                            .should('be.visible')
                                            .first()
                                            .click()
                                    }
                                })

                            cy.get('i.icon-DirectionLeft-sign')
                                .parent('button')
                                .should('be.visible')
                                .click()
                        }
                    })
            })
        })
    })

    it('show Explore and follow', () => {
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
                    .contains('Social trading')
                    .parents('div')
                    .should('be.visible')
                    .first()
                    .click()

                const menuItems = [
                    { label: 'Dashboard', href: '/social-trading/dashboard' },
                    { label: 'Following', href: '/social-trading/following' },
                    { label: 'Explore', href: '/social-trading/explore' }
                ]

                cy.get('#sidebar_submenu li').should('have.length', 4) // چون یک <li> اضافی به عنوان ساب‌هد وجود دارد

                menuItems.forEach((item, index) => {
                    // چون index=0 ساب‌هد است، آیتم‌ها از index=1 شروع می‌شن
                    cy.get(`#sidebar_submenu li`).eq(index + 1).within(() => {
                        cy.get('a').should('have.attr', 'href', item.href)
                        cy.contains(item.label).should('exist')
                    })
                })

                cy.get('a[href="/social-trading/explore"]').click({ multiple: true })

                cy.url().should('eq', Cypress.env('CRMUrl') + '/social-trading/explore')

                cy.get('h6')
                    .contains('Dashboard')
                    .should('be.visible')

                cy.get('h6')
                    .contains('Social trading')
                    .should('be.visible')

                cy.get('h6')
                    .contains('Explore')
                    .should('be.visible')

                //Checkout Period filter
                cy.get('#mui-component-select-CheckoutPeriodType')
                    .should('be.visible')
                    .contains('All')
                    .click()

                cy.get('ul[role="listbox"]').should('be.visible').within(() => {
                    cy.get('li').should('have.length', 3);

                    cy.get('li').eq(0).should('contain', 'All');
                    cy.get('li').eq(1).should('contain', 'Weekly');
                    cy.get('li').eq(2).should('contain', 'Monthly');

                    cy.get('li.Mui-selected').should('contain', 'All').click();
                })

                //Privacy filter
                cy.get('#mui-component-select-AccountPrivacy')
                    .contains('All')
                    .click()

                cy.get('ul[role="listbox"]').should('be.visible').within(() => {
                    cy.get('li').should('have.length', 3);

                    cy.get('li').eq(0).should('contain', 'All');
                    cy.get('li').eq(1).should('contain', 'Public');
                    cy.get('li').eq(2).should('contain', 'Private');

                    cy.get('li.Mui-selected').should('contain', 'All').click();
                })

                //Trading Style filter
                cy.get('#mui-component-select-TradingStyle')
                    .contains('All')
                    .click()

                cy.get('ul[role="listbox"]').should('be.visible').within(() => {
                    cy.get('li').should('have.length', 4);

                    cy.get('li').eq(0).should('contain', 'All');
                    cy.get('li').eq(1).should('contain', 'Short Term');
                    cy.get('li').eq(2).should('contain', 'Medium Term');
                    cy.get('li').eq(3).should('contain', 'Long Term');

                    cy.get('li.Mui-selected').should('contain', 'All').click();
                })

                //Searche Type
                // // فقط در بخش Explore کلیک کن، نه جای دیگه
                // cy.contains('Explore').parentsUntil('main').first().within(() => {
                //     cy.get('#mui-component-select-optionalSearch')
                //         .click({ force: true });

                //     cy.get('ul[role="listbox"]', { timeout: 10000 }).should('be.visible').within(() => {
                //         cy.get('li').should('have.length.at.least', 2);
                //         cy.get('li').eq(0).should('contain.text', 'Account name').click();
                //     });
                // });


                // cy.get('input[name="Name"]')
                //     .should('be.visible')

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

                                    cy.contains('th', 'Name')
                                    cy.contains('th', 'Login')
                                    cy.contains('th', 'Privacy')
                                    cy.contains('th', 'Checkout')
                                    cy.contains('th', 'Draw Down')
                                    cy.contains('th', 'Min Balance')
                                    cy.contains('th', 'Total Net Profit')
                                    cy.contains('th', 'Investors')
                                    cy.contains('th', 'Trading Style')
                                    cy.contains('th', 'Active In Campaign')
                                    cy.contains('th', 'Gain')

                                })

                            cy.get('div[role="combobox"]').should('contain', '5 Per Page')

                            cy.get('tbody.MuiTableBody-root > tr', { timeout: 10000 }).then(rows => {
                                const rowCount = rows.length
                                expect(rowCount).to.be.lte(5)
                            })

                            cy.get('i.icon-DirectionRight')
                                .parent('button')
                                .first()
                                .click()

                            cy.get('h6')
                                .contains('More Detail')

                            cy.get('p')
                                .contains('Account Information')
                                .should('be.visible')

                            cy.get('p')
                                .contains('Name')
                                .should('be.visible')

                            cy.get('p')
                                .contains('Login')
                                .should('be.visible')

                            cy.get('p')
                                .contains('Account type')
                                .should('be.visible')

                            cy.get('p')
                                .contains('Trading platform')
                                .should('be.visible')

                            cy.get('p')
                                .contains('Privacy')
                                .should('be.visible')

                            cy.get('p')
                                .contains('Checkout period')
                                .should('be.visible')

                            cy.get('p')
                                .contains('Total Gain')
                                .should('be.visible')

                            cy.get('p')
                                .contains('Draw down')
                                .should('be.visible')

                            cy.get('p')
                                .contains('Min balance')
                                .should('be.visible')

                            cy.get('p')
                                .contains('Commission')
                                .should('be.visible')

                            cy.get('p')
                                .contains('Investors')
                                .should('be.visible')

                            cy.get('p')
                                .contains('Trading style')
                                .should('be.visible')

                            cy.get('p')
                                .contains('Active in campaign')
                                .should('be.visible')

                            cy.get('p')
                                .contains('Created at')
                                .should('be.visible')

                            cy.get('p')
                                .contains('More Actions')
                                .should('be.visible')

                            //More Detail
                            cy.get('p')
                                .contains('More Detail')
                                .parent('button')
                                .first()
                                .click()

                            cy.get('h6')
                                .contains('Dashboard')
                                .should('be.visible')

                            cy.get('h6')
                                .contains('Social trading')
                                .should('be.visible')

                            cy.get('h6')
                                .contains('Explore')
                                .should('be.visible')

                            cy.get('h6')
                                .contains('Detail')
                                .should('be.visible')

                            cy.get('i.icon-DirectionLeft-sign')
                                .should('be.visible')

                            cy.get('p')
                                .contains('Back')
                                .should('be.visible')


                            //Account Information
                            cy.get('button')
                                .contains('Account Information')
                                .should('be.visible')

                            cy.get('span')
                                .contains('Account name:')
                                .should('be.visible')
                            cy.get('span')
                                .contains('Investors:')
                                .should('be.visible')
                            cy.get('span')
                                .contains('Minimum balance:')
                                .should('be.visible')
                            cy.get('span')
                                .contains('Account type:')
                                .should('be.visible')
                            cy.get('span')
                                .contains('Commission:')
                                .should('be.visible')
                            cy.get('span')
                                .contains('Checkout period:')
                                .should('be.visible')
                            cy.get('span')
                                .contains('Privacy:')
                                .should('be.visible')
                            cy.get('span')
                                .contains('Total net profit:')
                                .should('be.visible')
                            cy.get('span')
                                .contains('Trading platform:')
                                .should('be.visible')
                            cy.get('span')
                                .contains('Trading style:')
                                .should('be.visible')
                            cy.get('span')
                                .contains('Positions holding time:')
                                .should('be.visible')
                            cy.get('span')
                                .contains('Description:')
                                .should('be.visible')

                            //    cy.contains('span', 'Account status:', { timeout: 5000 }).should('be.visible');

                            //General
                            cy.get('button')
                                .contains('General')
                                .first()
                                .click()

                            cy.get('span', { timeout: 40000 })
                                .contains('Total Gain:')
                                .should('be.visible')

                            cy.get('span')
                                .contains('Floating P/L:')
                                .should('be.visible')

                            cy.get('span')
                                .contains('Close trade P/L:')
                                .should('be.visible')

                            cy.get('span')
                                .contains('Margin:')
                                .should('be.visible')

                            cy.get('span')
                                .contains('Balance:')
                                .should('be.visible')

                            cy.get('span')
                                .contains('Free margin:')
                                .should('be.visible')

                            cy.get('span')
                                .contains('Equity:')
                                .should('be.visible')

                            cy.get('span')
                                .contains('Account open date:')
                                .should('be.visible')

                            //Profit Loss
                            cy.get('button')
                                .contains('Profit Loss')
                                .first()
                                .should('be.visible')
                                .click()

                            cy.get('span')
                                .contains('Total net profit:')
                                .should('be.visible')

                            cy.get('span')
                                .contains('Gross profit:')
                                .should('be.visible')

                            cy.get('span')
                                .contains('Gross loss:')
                                .should('be.visible')

                            cy.get('span')
                                .contains('Open trades:')
                                .should('be.visible')

                            cy.get('span')
                                .contains('Close trades:')
                                .should('be.visible')

                            cy.get('span')
                                .contains('Total trades:')
                                .should('be.visible')

                            //Statistics
                            cy.get('button')
                                .contains('Statistics')
                                .first()
                                .should('be.visible')
                                .click()

                            cy.get('span')
                                .contains('Largest profit trade:')
                                .should('be.visible')

                            cy.get('span')
                                .contains('Largest loss trade:')
                                .should('be.visible')

                            cy.get('span')
                                .contains('Largest volume:')
                                .should('be.visible')

                            cy.get('span')
                                .contains('Profit factor:')
                                .should('be.visible')

                            cy.get('span')
                                .contains('Average profit trade:')
                                .should('be.visible')

                            cy.get('span')
                                .contains('Average loss trade:')
                                .should('be.visible')

                            cy.get('span')
                                .contains('Average volume:')
                                .should('be.visible')

                            //Campaign Information
                            cy.get('button')
                                .contains('Campaign Information')
                                .first()
                                .should('be.visible')
                                .click()

                            cy.get('body').then(($body) => {
                                // حالت 1: اگر پیام "No data to display" هست
                                if ($body.find('p:contains("No data to display")').length > 0) {
                                    cy.contains('No data to display').should('be.visible');
                                    cy.log('✅ No data – تست پاس شد.');
                                }

                                // حالت 2: اگر جدول دیتا دارد
                                else {

                                    cy.get('span')
                                        .contains('Name:')
                                        .should('be.visible')

                                    cy.get('span')
                                        .contains('Period (days):')
                                        .should('be.visible')

                                    cy.get('span')
                                        .contains('Bonus amount:')
                                        .should('be.visible')

                                    cy.get('span')
                                        .contains('Minimum add fund')
                                        .should('be.visible')

                                    cy.get('span')
                                        .contains('Total maximum bonus:')
                                        .should('be.visible')

                                    cy.get('span')
                                        .contains('Start date (UTC):')
                                        .should('be.visible')

                                    cy.get('span')
                                        .contains('End date (UTC):')
                                        .should('be.visible')

                                    cy.log('✅ دیتا وجود دارد – جدول چک شد.');
                                }

                            });

                            //Total Net Profit
                            cy.get('button')
                                .contains('Total Net Profit')
                                .first()
                                .should('be.visible')
                                .click()

                            cy.get('body').then(($body) => {
                                // حالت 1: اگر پیام "No data to display" هست
                                if ($body.find('p:contains("No data to display")').length > 0) {
                                    cy.contains('No data to display').should('be.visible');
                                    cy.log('✅ No data – تست پاس شد.');
                                }

                                // حالت 2: اگر جدول دیتا دارد
                                else {
                                    cy.get('span')
                                        .contains('Year:')
                                        .should('be.visible')

                                    cy.get('span')
                                        .contains('Jan')
                                        .should('be.visible')

                                    cy.get('span')
                                        .contains('Feb')
                                        .should('be.visible')

                                    cy.get('span')
                                        .contains('Mar')
                                        .should('be.visible')

                                    cy.get('span')
                                        .contains('Apr')
                                        .should('be.visible')

                                    cy.get('span')
                                        .contains('May')
                                        .should('be.visible')

                                    cy.get('span')
                                        .contains('June')
                                        .should('be.visible')

                                    cy.get('span')
                                        .contains('July')
                                        .should('be.visible')

                                    cy.get('span')
                                        .contains('Aug')
                                        .should('be.visible')

                                    cy.get('span')
                                        .contains('Sept')
                                        .should('be.visible')

                                    cy.get('span')
                                        .contains('Oct')
                                        .should('be.visible')

                                    cy.get('span')
                                        .contains('Dec')
                                        .should('be.visible')

                                    cy.get('p')
                                        .contains('Total:')
                                        .should('be.visible')
                                }
                            })

                            //Total Gain
                            cy.get('button')
                                .contains('Total Gain')
                                .first()
                                .should('be.visible')
                                .click()

                            cy.get('body').then(($body) => {
                                // حالت 1: اگر پیام "No data to display" هست
                                if ($body.find('p:contains("No data to display")').length > 0) {
                                    cy.contains('No data to display').should('be.visible');
                                    cy.log('✅ No data – تست پاس شد.');
                                }

                                // حالت 2: اگر جدول دیتا دارد
                                else {
                                    cy.get('span')
                                        .contains('Year:')
                                        .should('be.visible')

                                    cy.get('span')
                                        .contains('Jan')
                                        .should('be.visible')

                                    cy.get('span')
                                        .contains('Feb')
                                        .should('be.visible')

                                    cy.get('span')
                                        .contains('Mar')
                                        .should('be.visible')

                                    cy.get('span')
                                        .contains('Apr')
                                        .should('be.visible')

                                    cy.get('span')
                                        .contains('May')
                                        .should('be.visible')

                                    cy.get('span')
                                        .contains('June')
                                        .should('be.visible')

                                    cy.get('span')
                                        .contains('July')
                                        .should('be.visible')

                                    cy.get('span')
                                        .contains('Aug')
                                        .should('be.visible')

                                    cy.get('span')
                                        .contains('Sept')
                                        .should('be.visible')

                                    cy.get('span')
                                        .contains('Oct')
                                        .should('be.visible')

                                    cy.get('span')
                                        .contains('Dec')
                                        .should('be.visible')

                                    cy.get('p')
                                        .contains('Total:')
                                        .should('be.visible')
                                }
                            })

                            //Balance
                            cy.get('button')
                                .contains('Balance')
                                .first()
                                .should('be.visible')
                                .click()

                            //Symbol
                            cy.get('button')
                                .contains('Symbol')
                                .first()
                                .should('be.visible')
                                .click()

                            //follow
                            cy.get('button')
                                .contains('Follow')
                                .should('be.visible')
                                .first()
                                .click()

                            cy.contains('h6', 'Dashboard')
                            cy.contains('h6', 'Social trading')
                            cy.contains('h6', 'Explore')
                            cy.contains('h6', 'Follow')

                            cy.get('h2')
                                .contains('Follow')

                            cy.get('h2')
                                .contains('Account Information')

                            cy.get('span')
                                .contains('Account name:')
                                .should('be.visible')

                            cy.get('span')
                                .contains('Investors:')
                                .should('be.visible')

                            cy.get('span')
                                .contains('Minimum balance:')
                                .should('be.visible')

                            cy.get('span')
                                .contains('Account type:')
                                .should('be.visible')

                            cy.get('span')
                                .contains('Commission:')
                                .should('be.visible')

                            cy.get('span')
                                .contains('Checkout period:')
                                .should('be.visible')

                            cy.get('span')
                                .contains('Privacy:')
                                .should('be.visible')

                            cy.get('span')
                                .contains('Trading platform:')
                                .should('be.visible')

                            cy.get('span')
                                .contains('Trading style:')
                                .should('be.visible')

                            cy.get('span')
                                .contains('Description:')
                                .should('be.visible')

                            cy.get('h2')
                                .contains('Scale')
                                .should('be.visible')

                            cy.get('span')
                                .contains('50%')

                            cy.get('span')
                                .contains('100% Normal')

                            cy.get('span')
                                .contains('150%')

                            cy.get('span')
                                .contains('200%')

                            cy.get('span')
                                .contains('250%')

                            cy.get('span')
                                .contains('300%')

                            cy.get('h2')
                                .contains('Force exit%')
                                .should('be.visible')

                            cy.get('input[name="equityStop"]')
                                .should('be.visible')

                            //Aggreements
                            cy.get('h2')
                                .contains('Agreements')
                                .scrollIntoView()
                                .should('be.visible')

                            const agreements = [
                                'Account opening agreement',
                                'Client agreement',
                                'Social Trade agreement',
                            ];

                            agreements.forEach((label) => {
                                cy.contains('label', label, { timeout: 10000 })
                                    .scrollIntoView()
                                    .should('exist')
                                    .and('be.visible')
                                    .within(() => {
                                        cy.get('input[type="checkbox"]').should('exist');
                                    });
                            });


                            cy.get('i.icon-DirectionLeft-sign')
                                .parent('button')
                                .first()
                                .should('be.visible')

                     

                            cy.get('p')
                                .parent('button')
                                .should('be.visible')
                                .first()
                                .contains('Cancel')
                                .click()










                        }
                    })



            })
        })
    })

})