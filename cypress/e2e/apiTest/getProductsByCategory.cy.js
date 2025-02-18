describe('Get Products by Category', () => {
    const baseUrl = 'https://fakestoreapi.com';

    it('Should fetch all electronics products', () => {
        cy.request(`${baseUrl}/products/category/electronics`).then((response) => {
            expect(response.status).to.eq(200);
            expect(response.body).to.be.an('array');
            response.body.forEach((product) => {
                expect(product.category).to.eq('electronics');
            });
            console.log('Electronic Products', JSON.stringify(response.body, null, 2));
        });
    });

    it('Should return an empty array for an invalid category', () => {
        cy.request(`${baseUrl}/products/category/invalid-category`).then((response) => {
            expect(response.status).to.eq(200);
            expect(response.body).to.be.an('array').that.is.empty;
            console.log('Empty response ', JSON.stringify(response.body, null, 2));
        });
    });
});