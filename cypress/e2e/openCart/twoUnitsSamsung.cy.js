import { CartPage } from '../../support/pages/cartPage';
import { SearchPage } from '../../support/pages/searchPage';

describe('Update Quantity of Samsung Galaxy Tablet in Cart Tests', () => {
    Cypress.on('uncaught:exception', (err, runnable) => {
        // returning false here prevents Cypress from
        // failing the test
        return false
      })
      
    const cartPage = new CartPage();
    const searchPage = new SearchPage();

    it('should update the quantity of Samsung Galaxy Tablet in the cart', () => {
        searchPage.visit();
        searchPage.searchProduct('Samsung Galaxy Tab');
        searchPage.addToCart('Samsung Galaxy Tab');
        searchPage.verifyProductInCart('Samsung Galaxy Tab');
        cartPage.visit();
        cartPage.updateQuantity('Samsung Galaxy Tab', 2);
        cartPage.verifyCartTotal('$483.98');
    });
});
