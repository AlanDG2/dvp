import { LaptopsPage } from '../../support/pages/laptopsPage';

describe('Laptops & Notebooks Tests', () => {
    Cypress.on('uncaught:exception', (err, runnable) => {
        // returning false here prevents Cypress from
        // failing the test
        return false
      })
      
    Cypress.on("uncaught:exception", (err, runnable) => {
        // returning false here prevents Cypress from
        // failing the test
        return false;
    });
    const laptopsPage = new LaptopsPage();


  

    it('should add a MacBook Pro to the cart and verify it is in the cart', () => {
        laptopsPage.visit();
        laptopsPage.addToCart('MacBook Pro');
        laptopsPage.verifyProductInCart('MacBook Pro');
    });

    it('should verify the total amount in the cart after adding MacBook Pro', () => {
        laptopsPage.visit();
        laptopsPage.addToCart('MacBook Pro');
        laptopsPage.verifyCartTotal('$2,000.00');  
    });
});
