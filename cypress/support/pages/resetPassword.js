

export class PasswordResetPage {
    get = {
        emailInput: () => cy.get('#input-email'),
        submitButton: () => cy.get('input[type="submit"]'),
        successAlert: () => cy.get('.alert-success'),
        errorAlert: () => cy.get('.alert-danger')
    };

    visit() {
        cy.visit('https://opencart.abstracta.us/index.php?route=account/forgotten');
    }

    requestPasswordReset(email) {
        this.get.emailInput().type(email);
        this.get.submitButton().click();
    }

    verifySuccessMessage() {
        this.get.successAlert().should('contain', 'An email with a confirmation link has been sent your email address.');
    }

    verifyErrorMessage() {
        this.get.errorAlert().should('contain', ' Warning: The E-Mail Address was not found in our records, please try again!');
    }
}


