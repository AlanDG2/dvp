class HomePage {
    get = {
        url: () => cy.url(),
        title: () => cy.title(),
        body: () => cy.get('body'),
        sections: () => cy.get('section.elementor-section'),
        socialIcons: () => cy.get('.elementor-social-icon')
    };

    visit() {
        cy.visit('https://www.choucairtesting.com/');
    }

    verifyURL() {
        this.get.url().should('include', 'choucairtesting.com');
    }

    verifyTitle() {
        this.get.title().should('include', "Choucair Testing");
    }

    verifyBodyIsVisible() {
        this.get.body().should('be.visible');
    }

    scrollThroughSections() {
        this.get.sections().each(($el) => {
            cy.wrap($el).scrollIntoView();
            cy.wait(500); 
        });
    }

 
    verifySocialLinks() {
        const expectedLinks = [
            "https://www.linkedin.com/company/choucairtesting/",
            "https://www.facebook.com/ChoucairTesting/",
            "https://www.instagram.com/choucairtesting/",
            "https://twitter.com/TestingChoucair",
            "https://www.youtube.com/channel/UCvGPFCv6kjXIOhjOdDPgV1Q"
        ];

        this.get.socialIcons().each(($el, index) => {
            cy.wrap($el).scrollIntoView().invoke("attr", "href").should("include", expectedLinks[index]).wait(200); 
        });
    }
}


export const homePage = new HomePage