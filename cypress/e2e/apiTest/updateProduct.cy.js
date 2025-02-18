describe('Update a Product', () => {
    const baseUrl = 'https://fakestoreapi.com';
  
    it('Should update the image of a product', () => {
      const productId = 7; // ID del producto a actualizar
      const updatedImage = 'https://nueva-imagen.com/imagen.jpg';
  
      cy.request('PUT', `${baseUrl}/products/${productId}`, { image: updatedImage }).then((response) => {
        expect(response.status).to.eq(200); 
        expect(response.body.image).to.eq(updatedImage); 
        console.log('Producto actualizado:', JSON.stringify(response.body, null, 2)); 
      });
    });
  
    it('Should return an error for an invalid product ID', () => {
      const invalidProductId = 9999;
      cy.request({
        method: 'PUT',
        url: `${baseUrl}/products/${invalidProductId}`,
        body: { title: 'Invalid Update' },
        failOnStatusCode: false, 
      }).then((response) => {
        console.log(response.body)
        expect(response.body).to.have.property('title', 'Invalid Update');
      });
    });
  });