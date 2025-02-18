describe('Create a New Product', () => {
    const baseUrl = 'https://fakestoreapi.com';
  
    it('Should create a new product with all required fields', () => {
      const newProduct = {
        title: 'Nuevo producto',
        price: 99.99,
        description: 'Este es un producto de prueba',
        image: 'https://i.pravatar.cc',
        category: 'electronics',
      };
  
      cy.request('POST', `${baseUrl}/products`, newProduct).then((response) => {
        expect(response.status).to.eq(200); 
        expect(response.body.id).to.be.a('number'); 
        expect(response.body.title).to.eq(newProduct.title); 
        expect(response.body.price).to.eq(newProduct.price); 
        console.log('Producto creado:', JSON.stringify(response.body, null, 2)); 
      });
    });
  
    it('Should create a product with minimal required fields', () => {
      const minimalProduct = {
        title: 'Producto mínimo',
        price: 50.00,
      };
  
      cy.request('POST', `${baseUrl}/products`, minimalProduct).then((response) => {
        expect(response.status).to.eq(200); 
        expect(response.body.id).to.be.a('number');
        expect(response.body.title).to.eq(minimalProduct.title); 
        expect(response.body.price).to.eq(minimalProduct.price); 
        console.log('Producto mínimo creado:', JSON.stringify(response.body, null, 2)); 
      });
    });
  
    it('Should create a product with additional fields', () => {
      const productWithExtraFields = {
        title: 'Producto con campos adicionales',
        price: 75.00,
        description: 'Este es un producto con campos adicionales',
        image: 'https://i.pravatar.cc',
        category: 'electronics',
        extraField: 'Este campo no está definido en la API',
      };
  
      cy.request('POST', `${baseUrl}/products`, productWithExtraFields).then((response) => {
        expect(response.status).to.eq(200); 
        expect(response.body.id).to.be.a('number'); 
        expect(response.body.title).to.eq(productWithExtraFields.title); 
        expect(response.body.price).to.eq(productWithExtraFields.price); 
        console.log('Producto con campos adicionales creado:', JSON.stringify(response.body, null, 2)); 
      });
    });
  
    it('Should handle invalid product data (negative price)', () => {
      const invalidProduct = {
        title: 'Producto con precio inválido',
        price: -10.00, 
        description: 'Este es un producto con precio inválido',
        image: 'https://i.pravatar.cc',
        category: 'electronics',
      };
  
      cy.request({
        method: 'POST',
        url: `${baseUrl}/products`,
        body: invalidProduct,
        failOnStatusCode: false, 
      }).then((response) => {
       
        if (response.status === 200) {
          console.log('La API aceptó un precio negativo:', JSON.stringify(response.body, null, 2));
        } else {
          expect(response.status).to.be.oneOf([400, 422]); 
          console.log( JSON.stringify(response.body, null, 2)); 
        }
      });
    });
  
    it('Should handle missing required fields', () => {
      const invalidProduct = {
        title: 'Producto sin precio',
        description: 'Este es un producto sin precio',
        image: 'https://i.pravatar.cc',
        category: 'electronics',
      };
  
      cy.request({
        method: 'POST',
        url: `${baseUrl}/products`,
        body: invalidProduct,
        failOnStatusCode: false, 
      }).then((response) => {

        if (response.status === 200) {
          console.log('La API aceptó un producto sin precio:', JSON.stringify(response.body, null, 2));
        } else {
          expect(response.status).to.be.oneOf([400, 422]); 
        }
      });
    });
  });