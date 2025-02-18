import { faker } from '@faker-js/faker';
import { PasswordResetPage } from "../../support/pages/resetPassword";

const email = faker.internet.email();

describe('Test de Restablecimiento de Contraseña en OpenCart', () => {
    Cypress.on('uncaught:exception', (err, runnable) => {
        // returning false here prevents Cypress from
        // failing the test
        return false
      })
    

    const passwordResetPage = new PasswordResetPage();

    it('Solicitar restablecimiento de contraseña con correo válido', () => {
        passwordResetPage.visit();
       
        cy.fixture('registerData').then((data) => {
            passwordResetPage.requestPasswordReset(data.email);
        })
        passwordResetPage.verifySuccessMessage();
 
    });

    it('Solicitar restablecimiento de contraseña con correo inválido', () => {
        passwordResetPage.visit();
        passwordResetPage.requestPasswordReset(email);
        passwordResetPage.verifyErrorMessage();
    });
});




