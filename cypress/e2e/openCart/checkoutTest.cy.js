import { CheckoutPage } from '../../support/pages/checkoutPage';
import { SearchPage } from '../../support/pages/searchPage';
import { LoginPage } from "../../support/pages/loginPage";

describe('Complete Checkout Process Tests', () => {
    Cypress.on('uncaught:exception', (err, runnable) => {
        // returning false here prevents Cypress from
        // failing the test
        return false
      })

    const checkoutPage = new CheckoutPage();
    const searchPage = new SearchPage();
    const loginPage =  new LoginPage()


    it('should complete the checkout process and confirm the order', () => {
        searchPage.visit();
        searchPage.searchProduct('Samsung Galaxy Tab');
        searchPage.addToCart('Samsung Galaxy Tab');
        
        checkoutPage.visit()
        cy.fixture('registerData').then((data) => {
            checkoutPage.userCredentials(data.email, data.password)
        });
    
        checkoutPage.agreeToTermsAndProceed();
        checkoutPage.confirmOrder();
        checkoutPage.verifyOrderSuccess();
    });
});
