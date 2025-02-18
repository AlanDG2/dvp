export class RegisterPage {
    // Localizadores
    get = {
        url: () => cy.url(),
        title: () => cy.title(),
        firstNameInput: () => cy.get("#input-firstname"),
        lastNameInput: () => cy.get("#input-lastname"),
        emailInput: () => cy.get("#input-email"),
        telephoneInput: () => cy.get("#input-telephone"),
        passwordInput: () => cy.get("#input-password"),
        confirmPasswordInput: () => cy.get("#input-confirm"),
        termsCheckbox: () => cy.get('input[type="checkbox"]'),
        continueButton: () => cy.get('input[value="Continue"]'),
        successMessage: () => cy.get('h1'),
        errorMessages: () => cy.get('[class="text-danger"]'),
        existingUserError: () => cy.get('.alert.alert-danger.alert-dismissible'),
    };

    // Acciones
    visit() {
        cy.visit("https://opencart.abstracta.us/index.php?route=account/register");
        this.verifyURL(); 
    }

    verifyURL() {
        this.get.url().should('include', 'route=account/register');
    }

    verifyTitle() {
        this.get.title().should('include', 'Register Account');
    }

    fillFirstName(firstName) {
        this.get.firstNameInput().type(firstName).should('have.value', firstName);
    }

    fillLastName(lastName) {
        this.get.lastNameInput().type(lastName).should('have.value', lastName);
    }

    fillEmail(email) {
        this.get.emailInput().type(email).should('have.value', email);
    }

    fillTelephone(telephone) {
        this.get.telephoneInput().type(telephone).should('have.value', telephone);
    }

    fillPassword(password) {
        this.get.passwordInput().type(password).should('have.value', password);
    }

    fillConfirmPassword(password) {
        this.get.confirmPasswordInput().type(password).should('have.value', password);
    }

    acceptTerms() {
        this.get.termsCheckbox().click().should('be.checked');
    }

    submitForm() {
        cy.wait(1000)
        
        this.get.continueButton().scrollIntoView().then(($button) => {
            $button[0].click(); // Simula un clic físico
        });

    }

   

    verifyEmptyFormErrors() {
        // Verificar que se muestren los 5 mensajes de error
        this.get.errorMessages().should('have.length', 5);

        // Verificar el texto de cada mensaje de error
        const expectedErrors = [
            'First Name must be between 1 and 32 characters!',
            'Last Name must be between 1 and 32 characters!',
            'E-Mail Address does not appear to be valid!',
            'Telephone must be between 3 and 32 characters!',
            'Password must be between 4 and 20 characters!',
        ];

        this.get.errorMessages().each(($el, index) => {
            cy.wrap($el).should('contain', expectedErrors[index]);
        });
    }

    verifyExistingUserError() {
        // Verificar que se muestre el mensaje de error
        this.get.existingUserError().should('be.visible');
        this.get.existingUserError().should(
            'contain',
            'Warning: E-Mail Address is already registered!'
        );
    }
}