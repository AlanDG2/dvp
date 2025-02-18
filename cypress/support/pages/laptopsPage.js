export class LaptopsPage {
    get = {
       
        laptopsHeader: () => cy.get('h2').contains('Laptops & Notebooks'),
        addToCartButton: (productName) => cy.contains(productName).parents('.product-thumb').find('.button-group button').contains('Add to Cart'),
        cartButton: () => cy.get('#cart-total'),
        cartTotal: () => cy.contains("span","Shopping Cart")
    };z

    visit() {
        cy.visit('https://opencart.abstracta.us/index.php?route=product/category&path=18');
    }


    verifyLaptopsPage() {
        cy.url().should('include', 'laptop-notebook');
        this.get.laptopsHeader().should('contain', 'Laptops & Notebooks');
    }

    addToCart(productName) {
        this.get.addToCartButton(productName).invoke("attr", "style", "display: block !important; visibility: visible !important; opacity: 1 !important; z-index: 9999 !important; position: relative !important;", { timeout: 1000 }).click();
    }

    verifyProductInCart(productName) {
        cy.wait(1000)
        this.get.cartButton().click({force:true, delay:500}).wait(500);
        cy.get('[class="dropdown-menu pull-right"]').contains(productName).should('be.visible');
    }

    verifyCartTotal(expectedTotal) {
        this.get.cartButton().should('contain', expectedTotal);
    }
}
