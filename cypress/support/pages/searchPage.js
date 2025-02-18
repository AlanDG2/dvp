export class SearchPage {
    get = {
        searchBar: () => cy.get('input[name="search"]'),
        searchButton: () => cy.get('span[class="input-group-btn"] button'),
        productContainer: (productName) => cy.contains(productName).parents('.product-thumb'),
        addToCartButton: (productName) => cy.contains('a',productName).parents('.product-thumb').find('.button-group button').contains('Add to Cart'),
        cartButton: () => cy.get('#cart-total'),
        cartTotal: () => cy.contains("span","Shopping Cart")
    };

    visit() {
        cy.visit('https://opencart.abstracta.us');
    }

    searchProduct(productName) {
        this.get.searchBar().type(productName);
        this.get.searchButton().click();
    }

    addToCart(productName) {
        this.get.addToCartButton(productName).invoke("attr", "style", "display: block !important; visibility: visible !important; opacity: 1 !important; z-index: 9999 !important; position: relative !important;", { timeout: 1000 }).click();
    }

    verifyProductInCart(productName) {
        this.get.cartButton().click();
        cy.get('.dropdown-menu').contains(productName).should('be.visible');
    }

    verifyCartTotal(expectedTotal) {
        this.get.cartButton().should('contain', expectedTotal);
    }
}
