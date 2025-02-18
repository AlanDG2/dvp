export class CartPage {
    get = {
        cartButton: () => cy.get('#cart'),
        viewCartButton: () => cy.get('a').contains('View Cart'),
        productRow: (productName) => cy.contains('td', productName).parents('tr'),
        removeButton: () => cy.get('button[data-original-title="Remove"]'),
        emptyCartMessage: () => cy.get('#content p').contains('Your shopping cart is empty!'),
        quantityInput: () => cy.get('table input[class="form-control"]'),
        updateButton: () => cy.get('button[data-original-title="Update"]'),
        cartTotal: () => cy.get('#cart-total')
    };

    visit() {
        cy.visit('https://opencart.abstracta.us/index.php?route=checkout/cart');
    }


    removeProduct() {
            this.get.removeButton().click();

    }


    verifyEmptyCart() {
        this.get.emptyCartMessage().should('be.visible');
    }
    openCart() {
        this.get.cartButton().click();
        this.get.viewCartButton().click();
    }

    updateQuantity(productName, quantity) {
      
            this.get.quantityInput().clear().type(quantity).type("{enter}",{force:true});
            // this.get.updateButton(productName).click();
    
    }

    verifyCartTotal(expectedTotal) {
        this.get.cartTotal().should('contain', expectedTotal);
    }
}

