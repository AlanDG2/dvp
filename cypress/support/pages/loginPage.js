
export class LoginPage {
    get = {
        emailInput: () => cy.get('#input-email'),
        passwordInput: () => cy.get('#input-password'),
        submitButton: () => cy.get('input[type="submit"]'),
        errorAlert: () => cy.get('.alert-danger'),
        accountHeader: () => cy.get('h2')
    };

    visit() {
        cy.visit('https://opencart.abstracta.us/index.php?route=account/login');
    }

    login(email, password) {
        this.get.emailInput().type(email);
        this.get.passwordInput().type(password);
        this.get.submitButton().click();
    }

    verifySuccessfulLogin() {
        cy.url().should('include', 'route=account/account');
        this.get.accountHeader().should('contain', 'My Account');
    }

    verifyInvalidCredentialsError() {
        this.get.errorAlert().should('contain', 'Warning: No match for E-Mail Address and/or Password.');
    }
}