
describe('crm', () => {
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
    describe('Dashboard', () => {
        it.only('Login to dashboard', () => {
            cy.visit(Cypress.env('baseUrl') + '/Account/Login')
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
                cy.wait(6                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                         000)
                cy.url().should('eq', Cypress.env('CRMUrl') + '/');
                cy.contains('h6', 'Dashboard')
                cy.contains('h6', 'Tickets')
                cy.contains('h6', 'Your Accounts')
                cy.contains('h6', 'Download Trading Platforms')
                cy.contains('p', 'Your Wallet')
                cy.contains('button', 'Withdraw / Deposit')
            });

        })
        it('pin account in dashboard', () => {
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

                cy.get('button[value="Login"]', {timeout: 5000}) // timeout رو بیشتر بزار
                    .should('contain.text', 'Back to CRM')
                    .click()

                cy.origin(Cypress.env('CRMUrl'), () => {
cy.wait(4000)
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
            })
        })
        it('Withdraw / Deposit dashboard', () => {
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

                cy.get('button[value="Login"]', {timeout: 5000})
                    .should('contain.text', 'Back to CRM')
                    .click()

                cy.origin(Cypress.env('CRMUrl'), () => {
cy.wait(6000)
                    cy.url().should('eq', Cypress.env('CRMUrl') + '/');
                    cy.contains('button', 'Withdraw / Deposit').should('be.visible').click()
                    cy.url().should('eq', Cypress.env('CRMUrl') + '/wallet')
                })
            })
        })
    })
    describe('profile', () => {
        it('Manage your profile', () => {

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

                    cy.get('img[src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABgAAAAYCAYAAADgdz34AAAACXBIWXMAAAsTAAALEwEAmpwYAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAALZSURBVHgB5VRPSBRRGP/mz+5s6667axpoGKadaiEJCYpAokN4CbxIt/JqZQjVKSLokEKnQE/VIahLQQRB3QpDgwg09VCQsrvY7KpsO7vz582beTOv9zYTsT8z5dFvDjNv5v2+3/d73+8bgB0Vc5RmPlAa/xeMGGbTDHWPz1J3gYD7zQdkvqO1z5Pm2pEwWCFowxQt7ZEhOSuD3MrXhF3IQWAYpuY37dt7RhCsv+HlIAKMxR5Pwq2e5IHv++ASFyzDBL1aTUexfZptebYtAscm3URwQZIk8DwPXJcRmCYghMCnfioIH0KB5QJlzRLFHwo4AUuOHQeUqBIEDyawkb1ECKkT8Ia57Jkr4ESSLKvbJrAMawrZrI+CABIj4WR6rQaxWAwwFT4F4QNtOpg9Wiqvrb1RC8tQVFVYUYtQKVeAeP6jc13ZQhA+UAEP0zYGkW7P2LadFpiSpuaWnBSB62GwoQZttH8wt/9AlybLMiiKAsnGRH7kWF8uDDZw0B6WSg2o+GVIUaJjVa0qYGxDLB7XRAlGL/acGvtvgnsLC01KBA9TAS4zw6cJmwEHY6CU1h3F775HCuCLd17nVyeeDAx4oQkezL9vF2WYxDbu4In4sfDjEdZngTCL2ozM1PX6OqbEPsqpthMXsllja67fNtklzi2Jih1apQLIQqAwS3ICURTqlROXgMMGzbKsul1FSTrsa8vXGPRGoILbb190JpX4Iv+yopaAsgr5DPDg1W4OvuZfMs27QfCpIQukfeRkv7Z5zy8uKn9d7dVrev2Hxv83rDrg1uSVb4DWh46rYtat96am64kaJr1b80lbX0w/fT5LMmm1Ui53OdhpSSQaYCM1J+FqOOG6AlVVUX5xaT63mLt5f+jKYwg6os3Rff5sRyqTuppKNvZGopFDvGKe3OeOcsmcUdNeIVuamB4fz/8pR+Ac/Iy+u5cUs4DaRCLTXZ0Hiy+HhzHsiPgOGdd0TYzyTV4AAAAASUVORK5CYII="]')
                        .first()
                        .click()

                    cy.get('h6')
                        .contains('Hi')

                    cy.get('span')
                        .contains('Last entry:')

                    cy.get('button')
                        .contains('Manage your profile')
                        .should('be.visible')
                        .click()

                    cy.get('p')
                        .contains('Account Type')
                        .should('be.visible')

                    cy.get('p')
                        .contains('IB')
                        .should('be.visible')

                    //Appearance
                    cy.get('h6')
                        .contains('Appearance')
                        .should('be.visible')

                    cy.url().should('eq', Cypress.env('CRMUrl') + '/profile/appearance')

                    cy.get('h6')
                        .contains('Dashboard')
                        .should('be.visible')

                    cy.get('h6')
                        .contains('Profile')
                        .should('be.visible')

                    cy.get('h6')
                        .contains('Appearance')
                        .should('be.visible')

                    cy.get('h2')
                        .contains('Language')
                        .should('be.visible')

                    cy.get('h6')
                        .contains('Choose your default language. It won’t be changed till you change it.')
                        .should('be.visible')

                    cy.get('#mui-component-select-languageSelect')
                        .click()

                    cy.get('ul[role="listbox"]').should('be.visible').within(() => {
                        cy.get('li').should('have.length', 2);

                        cy.get('li').eq(0).should('contain', 'English');
                        cy.get('li').eq(1).should('contain', 'Persian');

                        cy.get('li.Mui-selected').should('contain', 'English').click();
                    })

                    //Theme
                    cy.get('h2')
                        .contains('Theme')
                        .should('be.visible')

                    cy.get('h6')
                        .contains('Choose how DeltaFx looks to you. Select a single theme, or sync with your system and automatically switch between day and night themes.')
                        .should('be.visible')


                    cy.get('#mui-component-select-themeSelect')
                        .click()

                    cy.get('ul[role="listbox"]').should('be.visible').within(() => {
                        cy.get('li').should('have.length', 2);

                        cy.get('li').eq(0).should('contain', 'Light');
                        cy.get('li').eq(1).should('contain', 'Dark');

                        cy.get('li').eq(1).should('contain', 'Dark').click();
                    })

                    cy.get('h2')
                        .contains('Font size')
                        .should('be.visible')

                    cy.get('h6')
                        .contains('Choose your Root Font Size.')
                        .should('be.visible')

                    cy.get('#mui-component-select-fontSelect')
                        .click()

                    cy.get('ul[role="listbox"]').should('be.visible').within(() => {
                        cy.get('li').should('have.length', 3);

                        cy.get('li').eq(0).should('contain', '14px');
                        cy.get('li').eq(1).should('contain', '15px');
                        cy.get('li').eq(2).should('contain', '16px');

                        cy.get('li').eq(0).should('contain', '14px').click();
                    })

                    cy.get('h6')
                        .contains('General information')
                        .should('be.visible')
                        .first()
                        .click()

                    cy.get('h2')
                        .should('be.visible')
                        .contains('Personal')

                    cy.get('input[name="fullName"]')
                        .should('be.visible')

                    cy.get('input[name="email"]')
                        .should('be.visible')

                    cy.get('#mui-component-select-gender')
                        .should('be.visible')

                    cy.get('#birthDate_datepicker')
                        .should('be.visible')

                    cy.get('input[name="phoneNumber"]')
                        .should('be.visible')

                    cy.get('button:has(.inherit_color)', { timeout: 40000 })
                        .first()
                        .click();

                    cy.get('h6')
                        .contains('Verify your phone number')
                        .should('be.visible')

                    cy.get('#code_autocomplete_valid_users')
                        .should('be.visible')

                    cy.get('input[name="phoneNumber"]')
                        .should('be.visible')

                    cy.get('p')
                        .contains('Choose your verification method')
                        .should('be.visible')

                    cy.get('p')
                        .contains('Flash call (recommended)')
                        .should('be.visible')
                    cy.get('p')
                        .contains('We call to your phone number, The call that is made cannot be answered, Missed only as a call, last four number of the phone call is confirmation code')
                        .should('be.visible')

                    cy.get('p')
                        .contains('SMS')
                        .should('be.visible')
                    cy.get('p')
                        .contains('We send a code to your phone number, the code sent to your phone number is confirmation code')
                        .should('be.visible')

                    cy.get('p')
                        .contains('Voice call')
                        .should('be.visible')
                    cy.get('p')
                        .contains('We call to your phone number, You must answer the phone call, The operator will read a code for you, The code read by the operator is the confirmation code')
                        .should('be.visible')

                    cy.get('p')
                        .contains('Next')
                        .should('be.visible')

                    cy.get('i.icon-Close')
                        .parent('button')
                        .first()
                        .should('be.visible')
                        .click()

                    cy.get('input[name="country"]')
                        .should('be.visible')

                    cy.get('input[name="walletNumber"]')
                        .should('be.visible')

                    cy.get('#mui-component-select-emailLanguage')
                        .click()

                    cy.get('ul[role="listbox"]').should('be.visible').within(() => {
                        cy.get('li').should('have.length', 2);

                        cy.get('li').eq(0).should('contain', 'English');
                        cy.get('li').eq(1).should('contain', 'Persian');

                        cy.get('li').eq(0).should('contain', 'English').click();
                    })

                    //Invite Client
                    cy.get('h6')
                        .contains('Invite Client')
                        .should('be.visible')
                        .first()
                        .click()

                    cy.get('h6')
                        .contains('Dashboard')
                        .should('be.visible')

                    cy.get('h6')
                        .contains('Profile')
                        .should('be.visible')

                    cy.get('h6')
                        .contains('Invite Your Client')
                        .should('be.visible')

                    cy.get('p')
                        .contains('Your Invitation Code')
                        .should('be.visible')

                    cy.get('p')
                        .contains('Do You(IB) want to invite other people as your IB Client?')

                    cy.get('p')
                        .contains('Invite Code')

                    cy.get('span.MuiTypography-noWrap')
                        .should('be.visible')
                        .invoke('text')
                        .then((text) => {
                            const baseUrl = text.split('?')[0];
                            expect(baseUrl).to.eq(Cypress.env('baseUrl') + '/Account/Register');
                        });


                    cy.get('span')
                        .contains('Copy Link')
                        .should('be.visible')

                    //Security
                    cy.get('h6')
                        .contains('Security')
                        .should('be.visible')
                        .first()
                        .click()

                    cy.get('h6')
                        .contains('Dashboard')
                        .should('be.visible')

                    cy.get('h6')
                        .contains('Profile')
                        .should('be.visible')

                    cy.get('h6')
                        .contains('Security')
                        .should('be.visible')


                    cy.get('h6')
                        .contains('Two Factor Authentication')
                        .should('be.visible')

                    // سوییچ را پیدا کن و وضعیت اولیه را چک کن (تیک نخورده باشد)
                    cy.get('input[name="toggle2FA"]').should('exist').and('not.be.checked');

                    // روی سوییچ کلیک کن
                    cy.get('input[name="toggle2FA"]').click({ force: true });

                    // بعد از کلیک، انتظار داشته باش که تیک خورده شده باشه
                    cy.get('input[name="toggle2FA"]').should('be.checked');

                    cy.get('p')
                        .contains('To use an authenticator app go through the following steps:')
                        .should('be.visible')

                    cy.get('p')
                        .contains('1. Download a two-factor authenticator app like Microsoft Authenticator for Windows Phone, Android, iOS. Google Authenticator for Android, iOS.')
                        .should('be.visible')

                    cy.contains('p', /2\. Scan the QR Code or enter below key into your two factor authenticator\s+app\. Spaces and casing do not matter\./)

                    cy.get('img.fullWidth')
                        .should('be.visible')
                        .and('have.attr', 'src')
                        .and((src) => {
                            expect(src).to.match(/^data:image\/png;base64,|^\/broker\/.*\.png$/);
                        });

                    cy.get('p')
                        .contains('Key')

                    cy.get('span')
                        .contains('HEYWIZJSG44TCLJQGM2GILJXGBQWCLJYMQZTELJTMEYTQMTGHFTDAZBUHA')

                    cy.get('i.icon-Copy')
                        .parent('button')
                        .should('be.visible')

                    cy.get('p')
                        .contains('3. Once you have scanned the QR code or input the key above, your two factor authentication app will provide you with a unique code. Enter the code in the confirmation box below.')
                        .should('be.visible')

                    cy.get('input[name="code"]')
                        .should('be.visible')

                    cy.get('p')
                        .contains('Verify and Active')
                        .parent('button')
                        .should('be.visible')

                    cy.get('h2')
                        .contains('Change Password')
                        .should('be.visible')

                    cy.get('input[name="currentPassword"]')
                        .should('be.visible')

                    cy.get('input[name="newPassword"]')
                        .should('be.visible')

                    cy.get('input[name="currentPassword"]')
                        .should('be.visible')

                    cy.contains('p', 'At Least 8 Characters')
                    cy.contains('p', 'At Least One Small Characters')
                    cy.contains('p', 'At Least One Capital Characters')
                    cy.contains('p', 'At Least One Numeric Characters')
                    cy.contains('p', 'At Least One Special Character (!@#$%^&*+=_-)')

                    cy.get('input[name="newPasswordConfirm"]')
                        .should('be.visible')

                    cy.get('h6')
                        .contains('Update Password')
                        .should('be.visible')

                    //Notifications
                    cy.get('h6')
                        .contains('Notifications')
                        .should('be.visible')
                        .first()
                        .click()

                    cy.get('h6')
                        .contains('Dashboard')
                        .should('be.visible')

                    cy.get('h6')
                        .contains('Profile')
                        .should('be.visible')

                    cy.get('h6')
                        .contains('Notifications')
                        .should('be.visible')

                    //Use Whatsapp Notifications
                    cy.get('h6')
                        .contains('Use Whatsapp Notifications')
                        .should('be.visible')

                    //Use Telegram Bot Notifications
                    cy.get('h6')
                        .contains('Use Telegram Bot Notifications')
                        .should('be.visible')

                    cy.get('input[name="status"]').should('be.checked');

                    cy.get('p')
                        .contains('Your current telegram ID is')

                    cy.get('p')
                        .contains('Change Telegram ID')
                        .parent('button')


                    //Log out
                    cy.get('h6')
                        .contains('Log out')
                        .first()
                        .should('be.visible')
                        .click()

                    cy.get('i.icon-Close')
                        .parent('button')
                        .should('be.visible')


                    cy.get('h2')
                        .contains('Log Out Account')
                        .should('be.visible')

                    cy.get('p')
                        .contains('Are you sure you want to log out of your account?')
                        .should('be.visible')

                    cy.get('button')
                        .contains('Cancel')
                        .first()

                    cy.get('p')
                        .contains('Yes,Log Out')
                        .parent('button')
                        .first()
                        .should('be.visible')
                        .click()

                })
            })

        })
    })
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
                            .contains('Do you wish to permanently archive the')
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
                    })
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

                    cy.wait(10000)
                    cy.get('a[href="/accounts/create"]')
                        .first()
                        .should('exist')
                        .and('be.visible')
                        .within(() => {
                            cy.get('button')
                                .should('contain.text', 'Create New Account')
                                .and('be.visible')
                            // بررسی وجود آیکون در داخل دکمه
                            cy.get('i.icon-Add').should('exist')
                        })

                    cy.get('button').contains('Create New Account').click()
                    cy.wait(2000)
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
                })
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
            })
        })
    })
    describe('withdraw Payment', () => {
        it('Local Exchange withdraw', () => {
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

                    cy.wait(4000)
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
                        cy.get('li').should('have.length', 4);

                        cy.get('li').eq(0).should('contain', 'Local exchange');
                        cy.get('li').eq(1).should('contain', 'TopChange');
                        cy.get('li').eq(2).should('contain', 'CryptoExchange');
                        cy.get('li').eq(3).should('contain', 'Wallet To Wallet Transfer');

                        cy.get('li').eq(0).should('contain', 'Local exchange').click();
                    })

                    cy.get('#number_input_format_amount')
                        .click()

                    cy.get('#number_input_format_amount')
                        .type(Cypress.env('amountlocalexchangewithdraw'))

                    cy.wait(2000)
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
        it('Top change withdraw', () => {
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
cy.wait(4000)
                    cy.get('span', { timeout: 10000 })
                        .contains('Wallet')
                        .should('be.visible')
                        .click();

                    cy.url().should('eq', Cypress.env('CRMUrl') + '/wallet')

                    cy.get('button[type="button"]')
                        .should('have.class', 'mui-g2g0ky')

                    cy.get('p')
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

                        cy.get('li').eq(1).should('contain', 'TopChange').click();
                    })

                    cy.wait(5000)
                    cy.get('#number_input_format_amountInDollar', )
                        .click({force: true})

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
                    })
                })
            })
        })
    })
    describe('Deposit Payment', () => {
        it('Trc20(Tether) Deposit', () => {
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
        it('Local exchange Deposit', () => {
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
                cy.wait(4000)
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
        it('Top change Deposit', () => {
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
                    cy.wait(5000)
                    cy.get('span', { timeout: 50000 })
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
                    cy.wait(4000)
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

                                cy.get('div[role="combobox"]').should('contain', '5 Per Page')

                                cy.get('tbody.MuiTableBody-root > tr', { timeout: 10000 }).then(rows => {
                                    const rowCount = rows.length
                                    expect(rowCount).to.be.lte(5)
                                })
                                cy.get('button i.icon-DirectionRight')
                                    .first()
                                    .parent('button')
                                    .click()
                                cy.contains('h6', 'Ticket Detail')
                                    .should('be.visible')
                                cy.wait(4000)
                                cy.contains('span', 'Subject:')
                                cy.contains('span', 'Deposit')
                                cy.contains('span', 'Type')//type:
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
            cy.url().then((currentUrl) => {
                if (currentUrl.includes('httpStatusCode=400')) {
                    cy.visit(Cypress.env('baseUrl'))
                }
                cy.get('button[value="Login"]', { timeout: 5000 }) // timeout رو بیشتر بزار
                    .should('contain.text', 'Back to CRM')
                    .click()
                cy.origin(Cypress.env('CRMUrl'), () => {
                    cy.wait(4000)
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
        })
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
                    const currentMonth = now.toLocaleString('default', { month: 'long' })
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

                                cy.get('div[role="combobox"]').should('contain', '5 Per Page')

                                cy.get('tbody.MuiTableBody-root > tr', { timeout: 10000 }).then(rows => {
                                    const rowCount = rows.length
                                    expect(rowCount).to.be.lte(5)
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
                cy.get('button[value="Login"]', { timeout: 5000 })
                    .should('contain.text', 'Back to CRM')
                    .click()
                cy.origin(Cypress.env('CRMUrl'), () => {
                    cy.wait(1000)
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
                            cy.get('button')
                                .should('contain.text', 'Create New Ticket')
                                .and('be.visible')

                            cy.get('i.icon-Add').should('exist')
                        })

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
    describe('IB', () => {
        it('show detail IB', () => {

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
                cy.get('button[value="Login"]', { timeout: 5000 })
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
                        cy.get(`#sidebar_submenu li`).eq(index + 1).within(() => {
                            cy.get('a').should('have.attr', 'href', item.href)
                            cy.contains(item.label).should('exist')
                        })
                    })
                    cy.wait(3000)
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

                        cy.get('input[name="walletNumber"]').should('be.visible')

                        cy.get('button:disabled').contains('Save Changes').should('be.visible')

                        cy.contains('button', 'Cancel').should('be.visible').click()

                        cy.get('input[name="walletNumber"]').should('not.exist')
                    })
                    //Trades
                    cy.wait(3000)
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
                    cy.wait(6000)
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
cy.wait(2000)
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
cy.wait(2000)
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
                                    if ($body.find('p:contains("No data to display")').length > 0) {
                                        cy.contains('No data to display').should('be.visible');
                                        cy.log('✅ No data – تست پاس شد.');
                                    }

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

                                        cy.get('table tbody tr').first().within(() => {
                                            cy.get('td').first().should('not.be.empty');
                                        });

                                        cy.log('no date');
                                    }
                                    else {
                                        cy.log('Error \ loading ');
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
cy.wait(4000)
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
cy.wait(4000)
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

                                cy.get('div[role="combobox"]').should('contain', '5 Per Page')

                                cy.get('tbody.MuiTableBody-root > tr', { timeout: 10000 }).then(rows => {
                                    const rowCount = rows.length
                                    expect(rowCount).to.be.lte(5)

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
cy.wait(4000)
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

                        cy.get('li').should('have.length.at.least', 3)

                        cy.get('li').eq(0).should('contain.text', 'First Name')
                        cy.get('li').eq(1).should('contain.text', 'Last Name')
                        cy.get('li').eq(2).should('contain.text', 'Wallet Number')
                    })

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

                                cy.get('div[role="combobox"]').should('contain', '5 Per Page')

                                cy.get('tbody.MuiTableBody-root > tr', { timeout: 10000 }).then(rows => {
                                    const rowCount = rows.length
                                    expect(rowCount).to.be.lte(5)

                                    // if (rowCount === 0) {
                                    //     cy.log('📭 No client data in the table. Test passed.');
                                    //     // cy.contains('No data').should('be.visible');
                                    // }
                                })
                                cy.get('button i.icon-DirectionRight')
                                    .first()
                                    .parent('button')
                                    .click()
                            }
                        });
                    /*
                    ______________________
                    |    Income           |
                    |______________________|
    
                    */
                    cy.get('a[href="/ib/income"]').click({ multiple: true })
cy.wait(4000)
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
cy.wait(7000)
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

                    cy.get('#sidebar_submenu li').should('have.length', 4)

                    menuItems.forEach((item, index) => {
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
                                            cy.log('❗ The button is disabled, the click failed.');

                                        } else {
                                            cy.wrap($btn).click();
                                            cy.log('✅ The button was active, the click was made.');
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
                                cy.get('button', { timeout: 10000 })
                                    .contains('Profit Loss')
                                    .first()
                                    .should('be.visible')
                                    .click()

                                cy.get('span')
                                    .contains('Total Profit:')
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
cy.wait(4000)
                                cy.get('body').then(($body) => {

                                    if ($body.find('p:contains("No data to display")').length > 0) {
                                        cy.contains('No data to display').should('be.visible');
                                        cy.log('✅ No data');
                                    }
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
                                        cy.log('✅data');
                                    }
                                });
                                //Total Gain
                                cy.get('button')
                                    .contains('Total Gain')
                                    .first()
                                    .should('be.visible')
                                    .click()

                                cy.get('body').then(($body) => {
                                    if ($body.find('p:contains("No data to display")').length > 0) {
                                        cy.contains('No data to display').should('be.visible');
                                        cy.log('✅ No data.');
                                    }
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
                                                    cy.contains('th', 'Total Profit')
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
                                                    cy.contains('th', 'Total Profit')
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

                    cy.get('#sidebar_submenu li').should('have.length', 4)

                    menuItems.forEach((item, index) => {
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

                    cy.get('p', { timeout: 10000 })
                        .parent('button')
                        .contains('Cancel')
                        .click()

                })
            })
        })
        it('show Following', () => {
            cy.visit( Cypress.env('baseUrl') + '/Account/Login')

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
cy.wait(6000)
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
                                cy.get('span', { timeout: 10000 })
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
                                    .contains('Total Profit:')
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
                                    if ($body.find('p:contains("No data to display")').length > 0) {
                                        cy.contains('No data to display');
                                        cy.log('✅ No data – تست پاس شد.');
                                    }

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

                cy.get('button[value="Login"]', { timeout: 5000 })
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

                    cy.get('#sidebar_submenu li').should('have.length', 4)

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
                                        cy.contains('th', 'Total Profit')
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
                                cy.get('p', { timeout: 10000 })
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
                                    .contains('Total Profit:')
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
                                    .contains('Total Profit:')
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
                                    .contains('Total Profit')
                                    .first()
                                    .should('be.visible')
                                    .click()

                                cy.get('body').then(($body) => {
                                    if ($body.find('p:contains("No data to display")').length > 0) {
                                        cy.contains('No data to display').should('be.visible');
                                        cy.log('✅ No data – تست پاس شد.');
                                    }

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
                                    if ($body.find('p:contains("No data to display")').length > 0) {
                                        cy.contains('No data to display').should('be.visible');
                                        cy.log('✅ No data – تست پاس شد.');
                                    }

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
                                    .contains('Risk Limitation')
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
    describe('logout', () => {
        it('log out', () => {
            
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
cy.wait(4000)
                    cy.get('img[src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABgAAAAYCAYAAADgdz34AAAACXBIWXMAAAsTAAALEwEAmpwYAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAALZSURBVHgB5VRPSBRRGP/mz+5s6667axpoGKadaiEJCYpAokN4CbxIt/JqZQjVKSLokEKnQE/VIahLQQRB3QpDgwg09VCQsrvY7KpsO7vz582beTOv9zYTsT8z5dFvDjNv5v2+3/d73+8bgB0Vc5RmPlAa/xeMGGbTDHWPz1J3gYD7zQdkvqO1z5Pm2pEwWCFowxQt7ZEhOSuD3MrXhF3IQWAYpuY37dt7RhCsv+HlIAKMxR5Pwq2e5IHv++ASFyzDBL1aTUexfZptebYtAscm3URwQZIk8DwPXJcRmCYghMCnfioIH0KB5QJlzRLFHwo4AUuOHQeUqBIEDyawkb1ECKkT8Ia57Jkr4ESSLKvbJrAMawrZrI+CABIj4WR6rQaxWAwwFT4F4QNtOpg9Wiqvrb1RC8tQVFVYUYtQKVeAeP6jc13ZQhA+UAEP0zYGkW7P2LadFpiSpuaWnBSB62GwoQZttH8wt/9AlybLMiiKAsnGRH7kWF8uDDZw0B6WSg2o+GVIUaJjVa0qYGxDLB7XRAlGL/acGvtvgnsLC01KBA9TAS4zw6cJmwEHY6CU1h3F775HCuCLd17nVyeeDAx4oQkezL9vF2WYxDbu4In4sfDjEdZngTCL2ozM1PX6OqbEPsqpthMXsllja67fNtklzi2Jih1apQLIQqAwS3ICURTqlROXgMMGzbKsul1FSTrsa8vXGPRGoILbb190JpX4Iv+yopaAsgr5DPDg1W4OvuZfMs27QfCpIQukfeRkv7Z5zy8uKn9d7dVrev2Hxv83rDrg1uSVb4DWh46rYtat96am64kaJr1b80lbX0w/fT5LMmm1Ui53OdhpSSQaYCM1J+FqOOG6AlVVUX5xaT63mLt5f+jKYwg6os3Rff5sRyqTuppKNvZGopFDvGKe3OeOcsmcUdNeIVuamB4fz/8pR+Ac/Iy+u5cUs4DaRCLTXZ0Hiy+HhzHsiPgOGdd0TYzyTV4AAAAASUVORK5CYII="]')
                        .first()
                        .click()

                    cy.get('h6')
                        .contains('Hi')

                    cy.get('span')
                        .contains('Last entry:')

                    cy.get('button')
                        .contains('Manage your profile')
                        .should('be.visible')
                        .click()

                        cy.get('h6')
                        .contains('Log out')
                        .first()
                        .should('be.visible')
                        .click()

                    cy.get('i.icon-Close')
                        .parent('button')
                        .should('be.visible')


                    cy.get('h2')
                        .contains('Log Out Account')
                        .should('be.visible')

                    cy.get('p')
                        .contains('Are you sure you want to log out of your account?')
                        .should('be.visible')

                    cy.get('button')
                        .contains('Cancel')
                        .first()

                    cy.get('p')
                        .contains('Yes,Log Out')
                        .parent('button')
                        .first()
                        .should('be.visible')
                        .click()
                })
            })
        })
    })
})