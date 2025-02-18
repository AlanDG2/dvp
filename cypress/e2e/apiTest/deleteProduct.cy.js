describe('Delete a Product', () => {
    const baseUrl = 'https://fakestoreapi.com';
  
    it('Should delete a product', () => {
      const productId = 6; 
      cy.request('DELETE', `${baseUrl}/products/${productId}`).then((response) => {
        expect(response.status).to.eq(200); 
        expect(response.body.id).to.eq(productId); 
        console.log('Producto eliminado:', JSON.stringify(response.body, null, 2)); 
      });
    });
  
    it('Should return an error for an invalid product ID', () => {
      const invalidProductId = 9999; 
      cy.request({
        method: 'DELETE',
        url: `${baseUrl}/products/${invalidProductId}`,
        failOnStatusCode: false, 
      }).then((response) => {
        expect(response.body).is.null
      });
    });
  });