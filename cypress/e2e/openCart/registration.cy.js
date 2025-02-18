import { RegisterPage } from "../../support/pages/RegisterPage";
import { faker } from '@faker-js/faker';

// Declarar variables fuera de los tests para reutilizar los datos
const firstName = faker.person.firstName();
const lastName = faker.person.lastName();
const email = faker.internet.email();
const telephone = faker.phone.number();
const password = faker.internet.password();

describe('Sign up', () => {
    const registerPage = new RegisterPage();
    Cypress.on('uncaught:exception', (err, runnable) => {
        // returning false here prevents Cypress from
        // failing the test
        return false
      })
      

    it('Complete the registration form', () => {
        registerPage.visit();
        registerPage.verifyTitle(); 

        registerPage.fillFirstName(firstName);
        registerPage.fillLastName(lastName);
        registerPage.fillEmail(email);
        registerPage.fillTelephone(telephone);
        registerPage.fillPassword(password);
        registerPage.fillConfirmPassword(password);

        registerPage.acceptTerms();
        registerPage.submitForm();
    });

    it('Try to send the empty form', () => {
        registerPage.visit();
        registerPage.submitForm();
        registerPage.verifyEmptyFormErrors();
    });

    it('try to register a new user', () => {
        registerPage.visit();

        registerPage.fillFirstName(firstName);
        registerPage.fillLastName(lastName);
        registerPage.fillEmail(email);
        registerPage.fillTelephone(telephone);
        registerPage.fillPassword(password);
        registerPage.fillConfirmPassword(password);

        registerPage.acceptTerms();
        registerPage.submitForm();
        registerPage.verifyExistingUserError();
    });
});