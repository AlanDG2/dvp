
import { faker } from '@faker-js/faker';
import { LoginPage } from "../../support/pages/loginPage";

const email = faker.internet.email();
const password = faker.internet.password();


describe('Login test in OpenCart', () => {
    Cypress.on('uncaught:exception', (err, runnable) => {
        // returning false here prevents Cypress from
        // failing the test
        return false
      })
      
    const loginPage = new LoginPage();

    it('Successful login with valid credentials', () => {
        loginPage.visit();
        cy.fixture('registerData').then((data) => {
            loginPage.login(data.email, data.password);
        });
        loginPage.verifySuccessfulLogin();
    });

    it('Login failed with invalid credentials', () => {
        loginPage.visit();
        loginPage.login(email, password);
        loginPage.verifyInvalidCredentialsError();

    });
});

