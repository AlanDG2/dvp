import { LoginPage } from "../../support/pages/loginPage";
const loginPage = new LoginPage();

export class CheckoutPage {
    get = {
        checkoutButton: () => cy.get('a').contains('Checkout'),
        continueButton: () => cy.get('input[value="Continue"]'),
        firstNameInput: () => cy.get('input[name="firstname"]'),
        lastNameInput: () => cy.get('input[name="lastname"]'),
        addressInput: () => cy.get('input[name="address_1"]'),
        cityInput: () => cy.get('input[name="city"]'),
        postalCodeInput: () => cy.get('input[name="postcode"]'),
        countryDropdown: () => cy.get('select[name="country_id"]'),
        regionDropdown: () => cy.get('select[name="zone_id"]'),
        agreeTermsCheckbox: () => cy.get('input[name="agree"]'),
        confirmOrderButton: () => cy.get('input[value="Confirm Order"]'),
        orderSuccessMessage: () => cy.get('#content h1').contains('Your order has been placed!'),
        paymentMethodButton: () => cy.get('#button-payment-method'),
        shippingMethodButton: () => cy.get('#button-shipping-method'),
        shippingAddressButton: () => cy.get('#button-shipping-address'),
        paymentAddressButton: () => cy.get('#button-payment-address'),
        confirmButton: () => cy.get('#button-confirm'),
        cartButton: () => cy.get('#cart > button'),
        removeCartItemButton: () => cy.get('.btn-danger'),
        continueShoppingButton: () => cy.get('.btn-primary')
    };

    visit() {
        cy.visit('https://opencart.abstracta.us/index.php?route=checkout/checkout');
    }

    proceedToCheckout() {
        this.get.checkoutButton().click();
    }

    userCredentials(email, password) {
        loginPage.get.emailInput().type(email);
        loginPage.get.passwordInput().type(password);
        cy.get("#button-login").click();
    }

    fillBillingDetails(firstName, lastName, address, city, postalCode, country, region) {
        this.get.firstNameInput().type(firstName);
        this.get.lastNameInput().type(lastName);
        this.get.addressInput().type(address);
        this.get.cityInput().type(city);
        this.get.postalCodeInput().type(postalCode);
        this.get.countryDropdown().select(country);
        this.get.regionDropdown().select(region);
        this.get.continueButton().click();
    }

    agreeToTermsAndProceed() {
        this.get.continueButton().scrollIntoView().click({ force: true }).wait(500);
        this.get.paymentAddressButton().scrollIntoView().click({ force: true }).wait(500);
        this.get.shippingAddressButton().scrollIntoView().click({ force: true }).wait(500);
        this.get.shippingMethodButton().scrollIntoView().click({ force: true }).wait(500);
        this.get.agreeTermsCheckbox().check({ force: true });
        this.get.paymentMethodButton().scrollIntoView().click({ force: true }).wait(500);
        this.get.confirmButton().scrollIntoView().should("be.visible");
    }

    confirmOrder() {
        this.get.confirmOrderButton().click();
    }

    verifyOrderSuccess() {
        this.get.orderSuccessMessage().should('be.visible');
    }

    emptyCart() {
        this.get.cartButton().click();
        cy.wait(500);
        this.get.removeCartItemButton().each(($btn) => {
            cy.wrap($btn).click();
            cy.wait(500);
        });
        this.get.continueShoppingButton().click();
    }
}
