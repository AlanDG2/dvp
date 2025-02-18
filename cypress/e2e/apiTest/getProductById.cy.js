describe('Get Product by ID', () => {
    const baseUrl = 'https://fakestoreapi.com';

    it('Should fetch a specific product', () => {
        const productId = 1; 
        cy.request(`${baseUrl}/products/${productId}`).then((response) => {
            expect(response.status).to.eq(200); 
            expect(response.body.id).to.eq(productId); 
            console.log('specific product:', JSON.stringify(response.body, null, 2)); 
        });
    });

    it('nothing should be returned', () => {
        const invalidProductId = 9999; 
        cy.request({
            url: `${baseUrl}/products/${invalidProductId}`,
            failOnStatusCode: false, 
        })
        .then((response) => {
             expect(response.body).to.be.empty;
            console.log('', JSON.stringify(response.body, null, 2)); 
        });
    });
});