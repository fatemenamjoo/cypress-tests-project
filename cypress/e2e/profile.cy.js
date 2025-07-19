
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