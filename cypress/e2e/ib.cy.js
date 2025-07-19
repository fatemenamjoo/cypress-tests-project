

describe('IB', () => {
    it('login to ib', () => {

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
                    .contains('IB')
                    .parents('div')
                    .should('be.visible')
                    .first()
                    .click()

                const menuItems = [
                    { label: 'Dashboard', href: '/ib/dashboard' },
                    { label: 'Trades', href: '/ib/trades' },
                    { label: 'Clients', href: '/ib/clients' },
                    { label: 'Transfer', href: '/ib/transfer' },
                    { label: 'Income', href: '/ib/income' }
                ]

                cy.get('#sidebar_submenu li').should('have.length', 6) // چون یک <li> اضافی به عنوان ساب‌هد وجود دارد

                menuItems.forEach((item, index) => {
                    // چون index=0 ساب‌هد است، آیتم‌ها از index=1 شروع می‌شن
                    cy.get(`#sidebar_submenu li`).eq(index + 1).within(() => {
                        cy.get('a').should('have.attr', 'href', item.href)
                        cy.contains(item.label).should('exist')
                    })
                })

                cy.get('a[href="/ib/dashboard"]').click({ multiple: true })

                cy.url().should('eq', Cypress.env('CRMUrl') + '/ib/dashboard')

                cy.get('h6')
                    .contains('Dashboard')
                    .should('be.visible')

                cy.get('h6')
                    .contains('IB')
                    .should('be.visible')

                cy.get('h6')
                    .contains('Dashboard')
                    .should('be.visible')

                cy.get('span')
                    .contains('Total Clients')
                    .should('be.visible')

                cy.get('span')
                    .contains('Rebate')
                    .should('be.visible')

                cy.get('span')
                    .contains('Sum Deposit')
                    .should('be.visible')

                cy.get('span')
                    .contains('Net Deposit')
                    .should('be.visible')

                cy.get('span')
                    .contains('Sum Withdraw')
                    .should('be.visible')

                cy.get('span')
                    .contains('Sum Volume')
                    .should('be.visible')

                cy.get('h6')
                    .contains('Volume Clients Deals')
                    .should('be.visible')

                cy.get('p')
                    .contains('Last 30 Days')
                    .should('be.visible')

                cy.get('h6')
                    .contains('New Clients Chart')
                    .should('be.visible')

                cy.get('p')
                    .contains('Last 30 Days')
                    .should('be.visible')

                cy.get('h6')
                    .contains('Finance Chart')
                    .should('be.visible')

                cy.get('h6')
                    .contains('Sum Deposit')
                    .should('be.visible')

                cy.get('h6')
                    .contains('Net Deposit')
                    .should('be.visible')

                cy.get('h6')
                    .contains('Sum Withdraw')
                    .should('be.visible')

                cy.get('span')
                    .contains('In this chart, you can see the total amount of deposits and withdrawals and their difference for the last calculation period, and also the charts are based on the ratio of the last period to the previous four periods, if any. For more information, go to the transfer section.')
                    .should('be.visible')

                cy.get('p')
                    .contains('Your Plan')
                    .should('be.visible')

                cy.get('p')
                    .contains('Do you want to invite another to be your IB Member?')
                    .should('be.visible')

                cy.get('span')
                    .contains('Copy Link')
                    .should('be.visible')
                    .click()

                cy.get('i.icon-Share')
                    .parents('button')
                    .should('be.visible')
                    .first()
                    .click()

                cy.get('[data-testid="FacebookIcon"]').should('be.visible')
                cy.get('[data-testid="XIcon"]').should('be.visible')
                cy.get('[data-testid="LinkedInIcon"]').should('be.visible')
                cy.get('[data-testid="WhatsAppIcon"]').should('be.visible')
                cy.get('[data-testid="TelegramIcon"]').should('be.visible')


                cy.get('p').then(($p) => {
                    const text = $p.text()

                    if (text.includes('Your current IB code is')) {
                        cy.contains('button', 'Change IB').click({ force: true })
                        cy.contains('h2', 'Change IB Code').should('be.visible')
                    } else if (text.includes('Do you want to be member of an IB')) {
                        cy.contains('button', 'Enter IB Code').click({ force: true })
                        cy.contains('h2', 'Have Ib code').should('be.visible')
                    } else {
                        throw new Error('Neither IB state detected')
                    }

                    // بعد از باز شدن دیالوگ:
                    cy.get('input[name="walletNumber"]').should('be.visible')

                    // دکمه Save Changes باید غیرفعال باشه
                    cy.get('button:disabled').contains('Save Changes').should('be.visible')

                    // دکمه Cancel فعال باشه و روش کلیک کنیم
                    cy.contains('button', 'Cancel').should('be.visible').click()

                    // مطمئن بشیم مودال بسته شده (مثلاً input دیگه وجود نداشته باشه)
                    cy.get('input[name="walletNumber"]').should('not.exist')
                })

                //Trades

                cy.get('a[href="/ib/trades"]').click({ force: true })

                cy.url().should('eq', Cypress.env('CRMUrl') + '/ib/trades')

                cy.get('h6')
                    .contains('Dashboard')
                    .should('be.visible')

                cy.get('h6')
                    .contains('IB')
                    .should('be.visible')

                cy.get('h6')
                    .contains('Trades')
                    .should('be.visible')

                cy.get('span')
                    .contains('Lot')
                    .should('be.visible')

                cy.get('span')
                    .contains('Scalp Rate')
                    .should('be.visible')

                cy.get('h6')
                    .contains('Trades List')
                    .should('be.visible')

                //Clients
                cy.get('a[href="/ib/clients"]').click({ multiple: true })

                cy.url().should('eq', Cypress.env('CRMUrl') + '/ib/clients?Skip=0&Take=5&IsDescending=false')

                cy.get('h6')
                    .contains('Dashboard')
                    .should('be.visible')

                cy.get('h6')
                    .contains('IB')
                    .should('be.visible')

                cy.get('h6')
                    .contains('Clients')
                    .should('be.visible')

                cy.get('h1')
                    .contains('Clients List')
                    .should('be.visible')

                //Searche Type
                cy.get('#mui-component-select-optionalSearch')
                    .should('be.visible')
                    .click()


                cy.get('ul[role="listbox"]', { timeout: 5000 }).should('be.visible').within(() => {

                    cy.get('li').should('have.length.at.least', 2)

                    cy.get('li').eq(0).should('contain.text', 'Client')
                    cy.get('li').eq(1).should('contain.text', 'Wallet Number')
                })


                cy.get('li[role="option"][aria-selected="true"]')
                    .should('contain.text', 'Client')
                    .click()

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

                                    cy.contains('th', 'Full Name')
                                    cy.contains('th', 'Email')
                                    cy.contains('th', 'Wallet Number')
                                    cy.contains('th', 'Balance')
                                    cy.contains('th', 'Equity')
                                    cy.contains('th', 'Net deposit')
                                    cy.contains('th', 'Total Account Balance')
                                    cy.contains('th', 'Commission')
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

                            //Detail Clients
                            cy.get('h6')
                                .contains('Client Details')
                                .should('be.visible')
                                .click()

                            cy.get('button i.icon-Close')
                                .first()
                                .parent('button')

                            //Information
                            cy.get('p')
                                .contains('Information')
                                .should('be.visible')

                            cy.get('p')
                                .contains('Full Name')
                                .should('be.visible')

                            cy.get('p')
                                .contains('Email')
                                .should('be.visible')

                            cy.get('p')
                                .contains('Wallet Number')
                                .should('be.visible')

                            cy.get('p')
                                .contains('Balance')
                                .should('be.visible')

                            cy.get('p')
                                .contains('Commission')
                                .should('be.visible')

                            cy.get('p')
                                .contains('Equity')
                                .should('be.visible')

                            cy.get('p')
                                .contains('Net deposit')
                                .should('be.visible')

                            cy.get('p')
                                .contains('Total Account Balance')
                                .should('be.visible')

                            cy.get('p')
                                .contains('Register Time')
                                .should('be.visible')


                            cy.get('p')
                                .contains('More Action')
                                .should('be.visible')

                            //Wallet To Wallet Transfer
                            cy.get('p')
                                .contains('Wallet To Wallet Transfer')
                                .should('be.visible')
                                .click()

                            cy.get('button i.icon-DirectionLeft-sign')
                                .should('be.visible')

                            cy.get('h6')
                                .contains('Wallet To Wallet Transfer')
                                .should('be.visible')

                            cy.contains('p.MuiTypography-body2', 'Your Wallet')
                                .should('exist')

                            cy.contains('p.MuiTypography-body2', 'Wallet')
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
                                .contains('Transfer')

                            cy.get('p')
                                .contains('Cancel')
                                .parent('button')
                                .click()

                            //Finance Detail Info
                            cy.get('p')
                                .contains('Finance Detail Info')
                                .should('be.visible')
                                .click()

                            // cy.url().should(Cypress.env('CRMUrl') + '/ib/clients/detail')

                            cy.get('h6')
                                .contains('Dashboard')

                            cy.get('h6')
                                .contains('IB')

                            cy.get('h6')
                                .contains('Clients')

                            cy.get('h6')
                                .contains('Detail')

                            cy.get('h1')
                                .contains('Client finance info ')
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
                                        cy.contains('th', 'Login').should('exist');
                                        cy.contains('th', 'Full Name').should('exist');
                                        cy.contains('th', 'Balance').should('exist');
                                        cy.contains('th', 'Credit').should('exist');
                                        cy.contains('th', 'Sum Add Fund').should('exist');
                                        cy.contains('th', 'Sum Remove Fund').should('exist');
                                        cy.contains('th', 'Net').should('exist');
                                        cy.contains('th', 'Volume').should('exist');
                                    });

                                    // چک کردن اولین ردیف دیتا (اختیاری)
                                    cy.get('table tbody tr').first().within(() => {
                                        cy.get('td').first().should('not.be.empty');
                                    });

                                    cy.log('✅ دیتا وجود دارد – جدول چک شد.');
                                }

                                // حالت 3: نه جدول هست نه پیام!
                                else {
                                    // اینجا ممکنه جدول هنوز لود نشده باشه، می‌تونی به‌جای throw یک log بزنی یا صبر کنی
                                    cy.log('❌ نه جدول بود نه پیام – شاید باگ یا مشکل لودینگ وجود دارد.');
                                }
                            });

                            cy.get('button i.icon-DirectionLeft-sign')
                                .first()
                                .parent('button')
                                .click()

                            //Client
                            cy.get('button i.icon-DirectionRight')
                                .first()
                                .parent('button')
                                .click()

                            //Detail Client for check transaction history
                            cy.get('p')
                                .contains('Transaction History')
                                .should('be.visible')
                                .click()

                            cy.get('h6')
                                .contains('Dashboard')
                                .should('be.visible')


                            cy.get('h6')
                                .contains('IB')
                                .should('be.visible')

                            cy.get('h6')
                                .contains('Clients')
                                .should('be.visible')

                            cy.get('h6')
                                .contains('Dashboard')
                                .should('be.visible')

                            cy.get('h6')
                                .contains('Transaction History')
                                .should('be.visible')

                                //Method type
                            cy.get('#MethodTypes_multi_select_filter')
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

                            //Payment status
                            cy.get('#mui-component-select-PaymentType')
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

                            //status
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
                            //Registertime
                            cy.get('#RegisterTime_range_picker_filter')
                                .should('be.visible')
                                .click()

                            cy.get('p')
                                .should('be.visible')
                                .contains('Register Time')

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

                            //Finalize time
                            cy.get('#FinalizeTime_range_picker_filter')
                                .should('be.visible')
                                .click()

                            cy.get('p')
                                .should('be.visible')
                                .contains('Finalize Time')

                            cy.get('#mui-component-select-FinalizeTime_rangePicker_filter_year')
                                .click()

                            cy.get('ul[role="listbox"]').within(() => {
                                cy.contains('li', currentYear.toString()).click()
                            })


                            cy.get('#mui-component-select-FinalizeTime_rangePicker_filter_month')
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
                            //Search login
                            cy.get('i.icon-Search')
                                .parent('button')
                                .should('be.visible')

                            //Tabel
                            cy.get('body').then(($body) => {
                                if ($body.find('p:contains("No data to display")').length > 0) {
                                    cy.log('✅ No data to display – تست پاس شد.');
                                }
                                else if ($body.find('table tbody tr').length > 0) {
                                    cy.get('table tbody tr').first().within(() => {


                                    });
                                }

                                else {
                                    throw new Error('"No data to display"');
                                }
                            });



                        }
                    });

                /*
        _______________________
        |    Transfer          |
        |______________________|

        */
                cy.get('a[href="/ib/transfer"]').click({ multiple: true })

                cy.url().should('eq', Cypress.env('CRMUrl') + '/ib/transfer')

                cy.get('h6')
                    .contains('Dashboard')
                    .should('be.visible')

                cy.get('h6')
                    .contains('IB')
                    .should('be.visible')

                cy.get('h6')
                    .contains('Transfer')
                    .should('be.visible')


                /*
       _______________________
       |   Calculated Transfer|
       |______________________|

       */
                cy.get('button')
                    .contains('Calculated Transfer')
                    .should('be.visible')

                cy.get('span')
                    .contains('Withdraw')
                    .should('be.visible')

                cy.get('span')
                    .contains('Deposit')
                    .should('be.visible')

                cy.get('span')
                    .contains('Net Deposit')
                    .should('be.visible')

                cy.get('h6')
                    .contains('Transfer chart')
                    .should('be.visible')

                cy.get('h6')
                    .contains('Transfer List')
                    .should('be.visible')

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

                cy.get('#mui-component-select-optionalSearch')
                    .click()

                cy.get('ul[role="listbox"]', { timeout: 5000 }).should('be.visible').within(() => {
                    // بررسی وجود گزینه‌ها
                    cy.get('li').should('have.length.at.least', 3)

                    cy.get('li').eq(0).should('contain.text', 'First Name')
                    cy.get('li').eq(1).should('contain.text', 'Last Name')
                    cy.get('li').eq(2).should('contain.text', 'Wallet Number')

                    cy.get('li').eq(0).should('contain.text', 'First Name').click()
                })

                cy.get('button i.icon-Search')
                    .first()
                    .parent('button')

                //Tabel

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

                                    // cy.contains('th', 'Full Name')
                                    // cy.contains('th', 'Email')
                                    // cy.contains('th', 'Wallet Number')
                                    // cy.contains('th', 'Balance')
                                    // cy.contains('th', 'Equity')
                                    // cy.contains('th', 'Net deposit')
                                    // cy.contains('th', 'Total Account Balance')
                                    // cy.contains('th', 'Commission')
                                    // cy.contains('th', 'Register Time')

                                })

                            // بررسی اینکه "5 Per Page" فعال باشد
                            cy.get('div[role="combobox"]').should('contain', '5 Per Page')

                            // بررسی تعداد ردیف‌های جدول (نباید بیشتر از 5 باشد)
                            cy.get('tbody.MuiTableBody-root > tr', { timeout: 10000 }).then(rows => {
                                const rowCount = rows.length
                                expect(rowCount).to.be.lte(5) // باید کمتر مساوی ۵ باشد

                                // if (rowCount === 0) {
                                //     cy.log('📭 No client data in the table. Test passed.');
                                //     // در صورت نیاز می‌تونی اینجا مثلاً یه متن خاصی رو چک کنی:
                                //     // cy.contains('No data').should('be.visible');
                                // } 

                            })

                            cy.get('button i.icon-DirectionRight')
                                .first()
                                .parent('button')
                                .click()
                            /////////////////////////////////////////////////////// ادامشو بنویس
                        }
                    });

                /*
                _______________________
                |    Raw Transfer      |
                |______________________|

                */
                cy.get('button')
                    .contains('Raw Transfer')
                    .should('be.visible')
                    .first()
                    .click()

                cy.get('button')
                    .contains('Calculated Transfer')
                    .should('be.visible')

                cy.get('span')
                    .contains('Withdraw')
                    .should('be.visible')

                cy.get('span')
                    .contains('Deposit')
                    .should('be.visible')

                cy.get('span')
                    .contains('Net Deposit')
                    .should('be.visible')

                cy.get('h6')
                    .contains('Transfer chart')
                    .should('be.visible')

                cy.get('h6')
                    .contains('Transfer List')
                    .should('be.visible')

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

                cy.get('#mui-component-select-optionalSearch')
                    .click()

                cy.get('ul[role="listbox"]', { timeout: 5000 }).should('be.visible').within(() => {
                    // بررسی وجود گزینه‌ها
                    cy.get('li').should('have.length.at.least', 3)

                    cy.get('li').eq(0).should('contain.text', 'First Name')
                    cy.get('li').eq(1).should('contain.text', 'Last Name')
                    cy.get('li').eq(2).should('contain.text', 'Wallet Number')
                })

                // انتخاب گزینه "Client" که از قبل انتخاب شده و کلیک برای بستن لیست
                cy.get('li[role="option"][aria-selected="true"]')
                    .should('contain.text', 'First Name')
                    .click()

                cy.get('button i.icon-Search')
                    .first()
                    .parent('button')

                //Tabel

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
                                    //دیتای جدول رو بنویس
                                    // cy.contains('th', 'Full Name')
                                    // cy.contains('th', 'Email')
                                    // cy.contains('th', 'Wallet Number')
                                    // cy.contains('th', 'Balance')
                                    // cy.contains('th', 'Equity')
                                    // cy.contains('th', 'Net deposit')
                                    // cy.contains('th', 'Total Account Balance')
                                    // cy.contains('th', 'Commission')
                                    // cy.contains('th', 'Register Time')

                                })

                            // بررسی اینکه "5 Per Page" فعال باشد
                            cy.get('div[role="combobox"]').should('contain', '5 Per Page')

                            // بررسی تعداد ردیف‌های جدول (نباید بیشتر از 5 باشد)
                            cy.get('tbody.MuiTableBody-root > tr', { timeout: 10000 }).then(rows => {
                                const rowCount = rows.length
                                expect(rowCount).to.be.lte(5) // باید کمتر مساوی ۵ باشد

                                // if (rowCount === 0) {
                                //     cy.log('📭 No client data in the table. Test passed.');
                                //     // در صورت نیاز می‌تونی اینجا مثلاً یه متن خاصی رو چک کنی:
                                //     // cy.contains('No data').should('be.visible');
                                // } 

                            })

                            cy.get('button i.icon-DirectionRight')
                                .first()
                                .parent('button')
                                .click()
                            /////////////////////////////////////////////////////// ادامشو بنویس
                        }
                    });

                /*
                ______________________
                |    Income           |
                |______________________|

                */
                cy.get('a[href="/ib/income"]').click({ multiple: true })

                cy.url().should('eq', Cypress.env('CRMUrl') + '/ib/income')

                cy.get('h6')
                    .contains('Dashboard')
                    .should('be.visible')

                cy.get('h6')
                    .contains('IB')
                    .should('be.visible')

                cy.get('h6')
                    .contains('Income')
                    .should('be.visible')

                cy.get('h6')
                    .contains('Income')
                    .should('be.visible')

                cy.get('#mui-component-select-Status')
                    .click()

                cy.get('ul[role="listbox"]').should('be.visible').within(() => {
                    cy.get('li').should('have.length', 5);

                    cy.get('li').eq(0).should('contain', 'All');
                    cy.get('li').eq(1).should('contain', 'Pending');
                    cy.get('li').eq(2).should('contain', 'Reject');
                    cy.get('li').eq(3).should('contain', 'Approved');
                    cy.get('li').eq(4).should('contain', 'Zero Rebate');

                    cy.get('li.Mui-selected').should('contain', 'All').click();
                })

                cy.get('ul[role="listbox"]').should('not.exist');

                cy.get('#mui-component-select-CommissionMethodType')
                    .click()

                cy.get('ul[role="listbox"]').should('be.visible').within(() => {
                    cy.get('li').should('have.length', 4);

                    cy.get('li').eq(0).should('contain', 'All');
                    cy.get('li').eq(1).should('contain', 'Trade Size');
                    cy.get('li').eq(2).should('contain', 'Profit');
                    cy.get('li').eq(3).should('contain', 'Net Deposit');

                    cy.get('li.Mui-selected').should('contain', 'All').click();
                })

                cy.get('ul[role="listbox"]').should('not.exist');

                //Date filter
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

                cy.get('#mui-component-select-optionalSearch')
                    .click()

                cy.get('ul[role="listbox"]').should('be.visible').within(() => {
                    cy.get('li').should('have.length', 3);

                    cy.get('li').eq(0).should('contain', 'Plan Name');
                    cy.get('li').eq(1).should('contain', 'Wallet Number');
                    cy.get('li').eq(2).should('contain', 'Request Number');

                    cy.get('li.Mui-selected').should('contain', 'Plan Name').click();
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

                                    cy.contains('th', 'Wallet Number')
                                    cy.contains('th', 'Request Number')
                                    cy.contains('th', 'Type')
                                    cy.contains('th', 'Plan')
                                    cy.contains('th', 'Amount')
                                    cy.contains('th', 'Status')
                                    cy.contains('th', 'Period start')
                                    cy.contains('th', 'Period end')
                                    cy.contains('th', 'Calculation Date (UTC)')

                                })

                            cy.get('div[role="combobox"]')
                                .should('contain', '5 Per Page')

                            cy.get('tbody.MuiTableBody-root > tr', { timeout: 10000 }).then(rows => {
                                const rowCount = rows.length
                                expect(rowCount).to.be.lte(5)
                            })

                        }
                    });


            })
        })
    })
})