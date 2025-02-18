import { SearchPage } from '../../support/pages/searchPage';

describe('Search and Add Samsung Galaxy Tablet to Cart Tests', () => {
    Cypress.on('uncaught:exception', (err, runnable) => {
        // returning false here prevents Cypress from
        // failing the test
        return false
      })
      
    const searchPage = new SearchPage();



    it('should search for Samsung Galaxy Tablet and add it to the cart', () => {
        searchPage.visit();
        searchPage.searchProduct('Samsung Galaxy Tab 10.1');
        searchPage.addToCart('Samsung Galaxy Tab 10.1');
        searchPage.verifyProductInCart('Samsung Galaxy Tab 10.1');
    });

    it('should verify the total amount in the cart after adding Samsung Galaxy Tablet', () => {
        searchPage.visit();
        searchPage.searchProduct('Samsung Galaxy Tab');
        searchPage.addToCart('Samsung Galaxy Tab');
        searchPage.verifyCartTotal('$241.99');  
    });
});
