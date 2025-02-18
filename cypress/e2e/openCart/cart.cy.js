import { CartPage } from '../../support/pages/cartPage';
import { LaptopsPage } from '../../support/pages/laptopsPage';

describe('Remove MacBook Pro from Cart Tests', () => {
    Cypress.on('uncaught:exception', (err, runnable) => {
        // returning false here prevents Cypress from
        // failing the test
        return false
      })
    const cartPage = new CartPage();
    const productPage = new LaptopsPage();

    it('should verify the cart is empty after removing MacBook Pro', () => {
        productPage.visit();
        productPage.addToCart('MacBook Pro');
        productPage.verifyProductInCart('MacBook Pro');
        cartPage.visit();
        cartPage.removeProduct('MacBook Pro');
        cartPage.verifyEmptyCart();
    });
});
