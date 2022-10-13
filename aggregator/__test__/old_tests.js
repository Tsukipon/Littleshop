/*
describe('PUT /userAddress', () => {
  it('modify address succeeds and responds with json', (done) => {
    request(app)
      .put('/userAddress')
      .set('Accept', 'application/json')
      .send({
        "address1": "President Obama",
        "newAddress1": "President Bush",
        "address2": "1600 Pennsylvania Avenue NW",
        "address3": null,
        "city": "Washington",
        "region": "DC",
        "country": "US",
        "postalCode": 20500
      })
      .set('Authorization', `Bearer ${buyerToken2}`)
      .expect(200)
      .expect('Content-Type', /json/)
      .then(response => {
        expect(response.body.response).toBeDefined();
        done();
      })
      .catch(err => done(err))
  });
  it('modify address fails because address does not exist', (done) => {
    request(app)
      .put('/userAddress')
      .set('Accept', 'application/json')
      .send({
        "address1": "President Alex",
        "address2": "1600 Pennsylvania Avenue NW",
        "address3": null,
        "city": "Washington",
        "region": "DC",
        "country": "US",
        "postalCode": 20700
      })
      .set('Authorization', `Bearer ${buyerToken2}`)
      .expect(404)
      .expect('Content-Type', /json/)
      .then(response => {
        expect(response.body.response).toEqual("Address not found");
        done();
      })
      .catch(err => done(err))
  });
  it('modify address fails because postal code is wrong', (done) => {
    request(app)
      .put('/userAddress')
      .set('Accept', 'application/json')
      .send({
        "address1": "President Obama",
        "newAddress1": "President Bush",
        "address2": "1600 Pennsylvania Avenue NW",
        "address3": null,
        "city": "Washington",
        "region": "DC",
        "country": "US",
        "postalCode": 10000000
      })
      .set('Authorization', `Bearer ${buyerToken2}`)
      .expect(400)
      .expect('Content-Type', /json/)
      .then(response => {
        expect(response.body.response).toEqual("Bad json format");
        done();
      })
      .catch(err => done(err))
  });
  it('modify address fails because of bad json format', (done) => {
    request(app)
      .put('/userAddress')
      .set('Accept', 'application/json')
      .send({
        "newAddress1": "President Obama",
        "address2": "1600 Pennsylvania Avenue NW",
        "address3": null,
        "city": "Washington",
        "region": "DC",
        "country": "US",
        "postalCode": 20500
      })
      .set('Authorization', `Bearer ${buyerToken2}`)
      .expect(400)
      .expect('Content-Type', /json/)
      .then(response => {
        expect(response.body.response).toEqual("Bad json format");
        done();
      })
      .catch(err => done(err))
  });
  it('modify address fails because of seller token', (done) => {
    request(app)
      .put('/userAddress')
      .set('Accept', 'application/json')
      .send({
        "address1": "President Bush",
        "newAddress1": "President Obama",
        "address2": "1600 Pennsylvania Avenue NW",
        "address3": null,
        "city": "Washington",
        "region": "DC",
        "country": "US",
        "postalCode": 20500
      })
      .set('Authorization', `Bearer ${sellerToken}`)
      .expect(401)
      .expect('Content-Type', /json/)
      .then(response => {
        expect(response.body.response).toEqual("Unauthorized");
        done();
      })
      .catch(err => done(err))
  });
  // it('modify address fails due to no token', (done) => {
  //   request(app)
  //     .put('/userAddress')
  //     .set('Accept', 'application/json')
  //     .send({
  //       "address1": "President Bush",
  //       "newAddress1": "President Obama",
  //       "address2": "1600 Pennsylvania Avenue NW",
  //       "address3": null,
  //       "city": "Washington",
  //       "region": "DC",
  //       "country": "US",
  //       "postalCode": 20500
  //     })
  //     .expect(401)
  //     .expect('Content-Type', /json/)
  //     .then(response => {
  //       expect(response.body.response).toEqual("Unauthorized");
  //       done();
  //     })
  //     .catch(err => done(err))
  // });
});
describe('DELETE /userAddress', () => {
  it('delete successfully address and responds with json', (done) => {
    request(app)
      .delete('/userAddress')
      .set('Accept', 'application/json')
      .send({
        "address1": "President Bush",
      })
      .set('Authorization', `Bearer ${buyerToken2}`)
      .expect(200)
      .expect('Content-Type', /json/)
      .then(response => {
        expect(response.body.response).toEqual("Address deleted");
        done();
      })
      .catch(err => done(err))
  });
  it('delete twice fails because address does not exist', (done) => {
    request(app)
      .delete('/userAddress')
      .set('Accept', 'application/json')
      .send({
        "address1": "President Bush",
      })
      .set('Authorization', `Bearer ${buyerToken2}`)
      .expect(404)
      .expect('Content-Type', /json/)
      .then(response => {
        expect(response.body.response).toEqual("Address not found");
        done();
      })
      .catch(err => done(err))
  });
  it('delete twice fails because of bad json format', (done) => {
    request(app)
      .delete('/userAddress')
      .set('Accept', 'application/json')
      .send({
        "address2": "President Bush",
      })
      .set('Authorization', `Bearer ${buyerToken2}`)
      .expect(400)
      .expect('Content-Type', /json/)
      .then(response => {
        expect(response.body.response).toEqual("Bad json format");
        done();
      })
      .catch(err => done(err))
  });
  it('delete twice fails because of seller token', (done) => {
    request(app)
      .delete('/userAddress')
      .set('Accept', 'application/json')
      .send({
        "address1": "President Bush",
      })
      .set('Authorization', `Bearer ${sellerToken}`)
      .expect(401)
      .expect('Content-Type', /json/)
      .then(response => {
        expect(response.body.response).toEqual("Unauthorized");
        done();
      })
      .catch(err => done(err))
  });
  // it('delete twice fails due to no token', (done) => {
  //   request(app)
  //     .delete('/userAddress')
  //     .set('Accept', 'application/json')
  //     .send({
  //       "address1": "President Bush",
  //     })
  //     .expect(401)
  //     .expect('Content-Type', /json/)
  //     .then(response => {
  //       expect(response.body.response).toEqual("Unauthorized");
  //       done();
  //     })
  //     .catch(err => done(err))
  // });
});


describe('POST /product', () => {
  it('correctly add product to the catalog responds with json', (done) => {
    request(app)
      .post('/product')
      .send({
        "name": productNames[0],
        "label": "testProduct",
        "condition": "new",
        "description": "nice product",
        "unitPrice": 10.99,
        "availableQuantity": availableQuantity
      })
      .set('Accept', 'application/json')
      .set('Authorization', `Bearer ${sellerToken}`)
      .expect(201)
      .expect('Content-Type', /json/)
      .then(response => {
        expect(response.body.response).toEqual("New product added");
        done();
      })
      .catch(err => done(err))
  });
  it('correctly add product to the catalog responds with json', (done) => {
    request(app)
      .post('/product')
      .send({
        "name": productNames[0],
        "label": "testProduct",
        "condition": "new",
        "description": "nice product",
        "unitPrice": 10.99,
        "availableQuantity": availableQuantity
      })
      .set('Accept', 'application/json')
      .set('Authorization', `Bearer ${sellerToken2}`)
      .expect(201)
      .expect('Content-Type', /json/)
      .then(response => {
        expect(response.body.response).toEqual("New product added");
        done();
      })
      .catch(err => done(err))
  });
  it('add product responds with failure when add twice the same product for the same user', (done) => {
    request(app)
      .post('/product')
      .send({
        "name": productNames[0],
        "label": "testProduct",
        "condition": "new",
        "description": "nice product",
        "unitPrice": 10.99,
        "availableQuantity": availableQuantity
      })
      .set('Accept', 'application/json')
      .set('Authorization', `Bearer ${sellerToken}`)
      .expect(409)
      .expect('Content-Type', /json/)
      .then(response => {
        expect(response.body.response).toEqual("Product already existant for current user");
        done();
      })
      .catch(err => done(err))
  });
  it('add product successfully add another product', (done) => {
    request(app)
      .post('/product')
      .send({
        "name": productNames[1],
        "label": "testProduct",
        "condition": "new",
        "description": "nice product",
        "unitPrice": 100.99,
        "availableQuantity": availableQuantity
      })
      .set('Accept', 'application/json')
      .set('Authorization', `Bearer ${sellerToken}`)
      .expect(201)
      .expect('Content-Type', /json/)
      .then(response => {
        expect(response.body.response).toEqual("New product added");
        done();
      })
      .catch(err => done(err))
  });
  it('add product response with failure when using a buyer token', (done) => {
    request(app)
      .post('/product')
      .send({
        "name": "product",
        "label": "testProduct",
        "condition": "new",
        "description": "nice product",
        "unitPrice": 100.99,
        "availableQuantity": availableQuantity
      })
      .set('Accept', 'application/json')
      .set('Authorization', `Bearer ${buyerToken}`)
      .expect(401)
      .expect('Content-Type', /json/)
      .then(response => {
        expect(response.body.response).toEqual("Unauthorized");
        done();
      })
      .catch(err => done(err))
  });
  it('add product response with failure lack json data', (done) => {
    request(app)
      .post('/product')
      .send({
        "name": "product",
        "label": "testProduct",
        "condition": "new",
        "description": "nice product",
        "unitPrice": 100.99,
      })
      .set('Accept', 'application/json')
      .set('Authorization', `Bearer ${sellerToken}`)
      .expect(400)
      .expect('Content-Type', /json/)
      .then(response => {
        expect(response.body.response).toEqual("Bad json format");
        done();
      })
      .catch(err => done(err))
  });
  it('add product response with failure wrong enum value', (done) => {
    request(app)
      .post('/product')
      .send({
        "name": "product",
        "label": "testProduct",
        "condition": "good",
        "description": "nice product",
        "unitPrice": 100.99,
        "availableQuantity": availableQuantity
      })
      .set('Accept', 'application/json')
      .set('Authorization', `Bearer ${sellerToken}`)
      .expect(400)
      .expect('Content-Type', /json/)
      .then(response => {
        expect(response.body.response).toEqual("Bad json format");
        done();
      })
      .catch(err => done(err))
  });
});

describe('PUT /product', () => {
  it('modify seller product succeeds and responds with json', (done) => {
    availableQuantity = availableQuantity + 100
    request(app)
      .put("/product")
      .set('Accept', 'application/json')
      .send({
        "name": productNames[0],
        "newName": newProductName,
        "label": "great label",
        "condition": "renovated",
        "description": "not so nice product",
        "unitPrice": 10000,
        "availableQuantity": availableQuantity,
        "onSale": true
      })
      .set('Authorization', `Bearer ${sellerToken}`)
      .expect(200)
      .expect('Content-Type', /json/)
      .then(response => {
        expect(response.body.response).toBeDefined();
        done();
      })
      .catch(err => done(err))
  });
  it('modify seller product succeeds and responds with json', (done) => {
    availableQuantity = availableQuantity + 100
    request(app)
      .put("/product")
      .set('Accept', 'application/json')
      .send({
        "name": productNames[1],
        "onSale": false
      })
      .set('Authorization', `Bearer ${sellerToken}`)
      .expect(200)
      .expect('Content-Type', /json/)
      .then(response => {
        expect(response.body.response).toBeDefined();
        done();
      })
      .catch(err => done(err))
  });

  it('modify seller product fails because quantity manually set to zero and manually set to onsale', (done) => {
    request(app)
      .put("/product")
      .set('Accept', 'application/json')
      .send({
        "name": newProductName,
        "label": "great label",
        "condition": "renovated",
        "description": "not so nice product",
        "unitPrice": 10000,
        "availableQuantity": 0,
        "onSale": true
      })
      .set('Authorization', `Bearer ${sellerToken}`)
      .expect(400)
      .expect('Content-Type', /json/)
      .then(response => {
        expect(response.body.response).toEqual("Bad json format");
        done();
      })
      .catch(err => done(err))
  });

  it('modify seller product fails because of buyer token', (done) => {
    availableQuantity = availableQuantity + 100
    request(app)
      .put("/product")
      .set('Accept', 'application/json')
      .send({
        "name": productNames[0],
        "newName": newProductName,
        "label": "great label",
        "condition": "renovated",
        "description": "not so nice product",
        "unitPrice": 10000,
        "availableQuantity": availableQuantity,
        "onSale": true
      })
      .set('Authorization', `Bearer ${buyerToken}`)
      .expect(401)
      .expect('Content-Type', /json/)
      .then(response => {
        expect(response.body.response).toEqual("Unauthorized");
        done();
      })
      .catch(err => done(err))
  });
  // it('modify seller product fails due to no token', (done) => {
  //   availableQuantity = availableQuantity + 100
  //   request(app)
  //     .put("/product")
  //     .set('Accept', 'application/json')
  //     .send({
  //       "name": productNames[0],
  //       "newName": newProductName,
  //       "label": "great label",
  //       "condition": "renovated",
  //       "description": "not so nice product",
  //       "unitPrice": 10000,
  //       "availableQuantity": availableQuantity,
  //       "onSale": true
  //     })
  //     .expect(401)
  //     .expect('Content-Type', /json/)
  //     .then(response => {
  //       expect(response.body.response).toEqual("Unauthorized");
  //       done();
  //     })
  //     .catch(err => done(err))
  // });
});


describe('GET /products', () => {
  it('get seller products responds with json', (done) => {
    request(app)
      .get('/products')
      .set('Accept', 'application/json')
      .set('Authorization', `Bearer ${sellerToken}`)
      .expect(200)
      .expect('Content-Type', /json/)
      .then(response => {
        expect(response.body.response).toBeDefined();
        done();
      })
      .catch(err => done(err))
  });

  it('buyer get products response with json', (done) => {
    request(app)
      .get('/products')
      .set('Accept', 'application/json')
      .query({
        "condition": "new",
        "lowerPrice": 0,
        "higherPrice": 200,
        "filter": "unitPrice",
        "sellerUsername": sellerName
      })
      .set('Authorization', `Bearer ${buyerToken}`)
      .expect(200)
      .expect('Content-Type', /json/)
      .then(response => {
        console.log(response.body.response)
        expect(response.body.response).toBeDefined();
        done();
      })
      .catch(err => done(err))
  });
});

describe('POST /cartProduct', () => {
  it('correctly add product to cart responds with json', (done) => {
    request(app)
      .post('/cartProduct')
      .send({
        "productName": newProductName,
        "quantity": 5,
        "sellerUsername": sellerName
      })
      .set('Accept', 'application/json')
      .set('Authorization', `Bearer ${buyerToken}`)
      .expect(201)
      .expect('Content-Type', /json/)
      .then(response => {
        expect(response.body.response).toEqual("Product added to cart");
        done();
      })
      .catch(err => done(err));
  });
  it('correctly add product to cart responds with json', (done) => {
    request(app)
      .post('/cartProduct')
      .send({
        "productName": productNames[0],
        "quantity": 1,
        "sellerUsername": sellerName2
      })
      .set('Accept', 'application/json')
      .set('Authorization', `Bearer ${buyerToken}`)
      .expect(201)
      .expect('Content-Type', /json/)
      .then(response => {
        expect(response.body.response).toEqual("Product added to cart");
        done();
      })
      .catch(err => done(err));
  });
  it('correctly add product to cart responds with json', (done) => {
    request(app)
      .post('/cartProduct')
      .send({
        "productName": newProductName,
        "quantity": 5,
        "sellerUsername": sellerName
      })
      .set('Accept', 'application/json')
      .set('Authorization', `Bearer ${buyerToken3}`)
      .expect(201)
      .expect('Content-Type', /json/)
      .then(response => {
        expect(response.body.response).toEqual("Product added to cart");
        done();
      })
      .catch(err => done(err));
  });

  it('fails to add a product to cart because it was removed from sale by seller', (done) => {
    request(app)
      .post('/cartProduct')
      .send({
        "productName": productNames[1],
        "quantity": 1,
        "sellerUsername": sellerName
      })
      .set('Accept', 'application/json')
      .set('Authorization', `Bearer ${buyerToken}`)
      .expect(404)
      .expect('Content-Type', /json/)
      .then(response => {
        expect(response.body.response).toEqual("Product not found or not in stock");
        done();
      })
      .catch(err => done(err));
  });

  it('fails to add product to cart due to bad json format', (done) => {
    request(app)
      .post('/cartProduct')
      .send({
        "productName": newProductName,
        "sellerUsername": sellerName
      })
      .set('Accept', 'application/json')
      .set('Authorization', `Bearer ${buyerToken}`)
      .expect(400)
      .expect('Content-Type', /json/)
      .then(response => {
        expect(response.body.response).toEqual("Bad json format");
        done();
      })
      .catch(err => done(err));
  });
  it('fails to add twice the same product to cart', (done) => {
    request(app)
      .post('/cartProduct')
      .send({
        "productName": newProductName,
        "quantity": 5,
        "sellerUsername": sellerName
      })
      .set('Accept', 'application/json')
      .set('Authorization', `Bearer ${buyerToken}`)
      .expect(409)
      .expect('Content-Type', /json/)
      .then(response => {
        expect(response.body.response).toEqual("Product already in cart");
        done();
      })
      .catch(err => done(err));
  });
  it('fails to add product to cart due to lack of stocks', (done) => {
    request(app)
      .post('/cartProduct')
      .send({
        "productName": productNames[1],
        "quantity": availableQuantity + 1,
        "sellerUsername": sellerName
      })
      .set('Accept', 'application/json')
      .set('Authorization', `Bearer ${buyerToken}`)
      .expect(404)
      .expect('Content-Type', /json/)
      .then(response => {
        expect(response.body.response).toEqual("Product not found or not in stock");
        done();
      })
      .catch(err => done(err));
  });
  it('fails to add product to cart due to seller token', (done) => {
    request(app)
      .post('/cartProduct')
      .send({
        "productName": productNames[1],
        "quantity": availableQuantity,
        "sellerUsername": sellerName
      })
      .set('Accept', 'application/json')
      .set('Authorization', `Bearer ${sellerToken}`)
      .expect(401)
      .expect('Content-Type', /json/)
      .then(response => {
        expect(response.body.response).toEqual("Unauthorized");
        done();
      })
      .catch(err => done(err));
  });

  // it('fails to add product to cart no token', (done) => {
  //   request(app)
  //     .post('/cartProduct')
  //     .send({
  //       "productName": productNames[1],
  //       "quantity": availableQuantity,
  //       "sellerUsername": sellerName
  //     })
  //     .set('Accept', 'application/json')
  //     .expect(401)
  //     .expect('Content-Type', /json/)
  //     .then(response => {
  //       expect(response.body.response).toEqual("Unauthorized");
  //       done();
  //     })
  //     .catch(err => done(err));
  // });
});

describe('GET /cartProduct', () => {
  it('get products from cart successfully responds with json', (done) => {
    request(app)
      .get("/cartProduct")
      .set('Accept', 'application/json')
      .set('Authorization', `Bearer ${buyerToken}`)
      .expect(200)
      .expect('Content-Type', /json/)
      .then(response => {
        expect(response.body.response).toBeDefined();
        done();
      })
      .catch(err => done(err));
  });
  it('get products from cart returns empty array due to no product in cart', (done) => {
    request(app)
      .get("/cartProduct")
      .set('Accept', 'application/json')
      .set('Authorization', `Bearer ${buyerToken2}`)
      .expect(200)
      .expect('Content-Type', /json/)
      .then(response => {
        expect(response.body.response).toEqual([]);
        done();
      })
      .catch(err => done(err));
  });
  // it('no token', (done) => {
  //   request(app)
  //     .get("/cartProduct")
  //     .set('Accept', 'application/json')
  //     .expect(200)
  //     .expect('Content-Type', /json/)
  //     .then(response => {
  //       expect(response.body.response).toBeDefined();
  //       done();
  //     })
  //     .catch(err => done(err));
  // });
  it('get products from cart fails with seller token', (done) => {
    request(app)
      .get("/cartProduct")
      .set('Accept', 'application/json')
      .set('Authorization', `Bearer ${sellerToken}`)
      .expect(401)
      .expect('Content-Type', /json/)
      .then(response => {
        expect(response.body.response).toEqual("Unauthorized");
        done();
      })
      .catch(err => done(err));
  });
});

describe('PUT /cartProduct', () => {
  it('modify a product quantity from cart successfuly done', (done) => {
    request(app)
      .put("/cartProduct")
      .send({
        "productName": newProductName,
        "quantity": 8,
        "sellerUsername": sellerName
      })
      .set('Accept', 'application/json')
      .set('Authorization', `Bearer ${buyerToken}`)
      .expect(200)
      .expect('Content-Type', /json/)
      .then(response => {
        expect(response.body.response).toBeDefined();
        expect(response.body.response.quantity = availableQuantity - 1)
        //var owner1 = response.body.response.ownerId;
        done();
      })
      .catch(err => done(err));
  });
  it('modify a product from cart fails due to bad json format', (done) => {
    request(app)
      .put("/cartProduct")
      .send({
        "productName": newProductName,
        "quantity": availableQuantity - 1,
      })
      .set('Accept', 'application/json')
      .set('Authorization', `Bearer ${buyerToken}`)
      .expect(400)
      .expect('Content-Type', /json/)
      .then(response => {
        expect(response.body.response).toEqual("Bad json format");
        expect(response.body.response.quantity = availableQuantity - 1)
        //var owner1 = response.body.response.ownerId;
        done();
      })
      .catch(err => done(err));
  });
  it('modify a product quantity from cart fails because exceed stocks', (done) => {
    request(app)
      .put("/cartProduct")
      .send({
        "productName": newProductName,
        "quantity": availableQuantity + 1,
        "sellerUsername": sellerName
      })
      .set('Accept', 'application/json')
      .set('Authorization', `Bearer ${buyerToken}`)
      .expect(404)
      .expect('Content-Type', /json/)
      .then(response => {
        expect(response.body.response).toEqual("Product not found or not in stock");
        //var owner1 = response.body.response.ownerId;
        done();
      })
      .catch(err => done(err));
  });

  it('modify a product seller in buyer cart fails because product not in cart', (done) => {
    request(app)
      .put("/cartProduct")
      .send({
        "productName": newProductName,
        "quantity": availableQuantity - 1,
        "sellerUsername": sellerName2
      })
      .set('Accept', 'application/json')
      .set('Authorization', `Bearer ${buyerToken}`)
      .expect(404)
      .expect('Content-Type', /json/)
      .then(response => {
        expect(response.body.response).toBeDefined();
        //var owner2 = response.body.response.ownerId;
        //if (owner1 == owner2) {
        //  throw new Error("SellerId has not been changed")
        //}
        done();
      })
      .catch(err => done(err));
  });
  it('modify a product quantity from cart fails because of seller token', (done) => {
    request(app)
      .put("/cartProduct")
      .send({
        "productName": newProductName,
        "quantity": availableQuantity - 1,
        "sellerUsername": sellerName
      })
      .set('Accept', 'application/json')
      .set('Authorization', `Bearer ${sellerToken}`)
      .expect(401)
      .expect('Content-Type', /json/)
      .then(response => {
        expect(response.body.response).toEqual("Unauthorized");
        done();
      })
      .catch(err => done(err));
  });

  // it('modify a product quantity from cart fails due to no token', (done) => {
  //   request(app)
  //     .put("/cartProduct")
  //     .send({
  //       "productName": productNames[0],
  //       "quantity": availableQuantity - 1,
  //       "sellerUsername": sellerName
  //     })
  //     .set('Accept', 'application/json')
  //     .expect(401)
  //     .expect('Content-Type', /json/)
  //     .then(response => {
  //       expect(response.body.response).toEqual("Unauthorized");
  //       expect(response.body.response.quantity = availableQuantity - 1)
  //       done();
  //     })
  //     .catch(err => done(err));
  // });
});
describe('DELETE /cartProduct', () => {
  it('successfully delete product from cart responds with json', (done) => {
    request(app)
      .delete("/cartProduct")
      .send({
        "productName": newProductName,
        "sellerUsername": sellerName
      })
      .set('Accept', 'application/json')
      .set('Authorization', `Bearer ${buyerToken}`)
      .expect(200)
      .expect('Content-Type', /json/)
      .then(response => {
        expect(response.body.response).toEqual("Product removed from cart");
        done();
      })
      .catch(err => done(err));
  });
  it('delete product from cart fails because of bad json format', (done) => {
    request(app)
      .delete("/cartProduct")
      .send({
        "sellerUsername": sellerName
      })
      .set('Accept', 'application/json')
      .set('Authorization', `Bearer ${buyerToken}`)
      .expect(400)
      .expect('Content-Type', /json/)
      .then(response => {
        expect(response.body.response).toEqual("Bad json format");
        done();
      })
      .catch(err => done(err));
  });
  it('delete product from cart fails because product is not in cart', (done) => {
    request(app)
      .delete("/cartProduct")
      .send({
        "productName": "randomProduct",
        "sellerUsername": sellerName
      })
      .set('Accept', 'application/json')
      .set('Authorization', `Bearer ${buyerToken}`)
      .expect(404)
      .expect('Content-Type', /json/)
      .then(response => {
        expect(response.body.response).toEqual("Product not found in current user cart");
        done();
      })
      .catch(err => done(err));
  });
  it('delete product from cart fails because of seller token', (done) => {
    request(app)
      .delete("/cartProduct")
      .send({
        "productName": "randomProduct",
        "sellerUsername": sellerName
      })
      .set('Accept', 'application/json')
      .set('Authorization', `Bearer ${sellerToken}`)
      .expect(401)
      .expect('Content-Type', /json/)
      .then(response => {
        expect(response.body.response).toEqual("Unauthorized");
        done();
      })
      .catch(err => done(err));
  });
  // it('delete product from cart fails due to no token', (done) => {
  //   request(app)
  //     .delete("/cartProduct")
  //     .send({
  //       "productName": "randomProduct",
  //       "sellerUsername": sellerName
  //     })
  //     .set('Accept', 'application/json')
  //     .expect(401)
  //     .expect('Content-Type', /json/)
  //     .then(response => {
  //       expect(response.body.response).toEqual("Unauthorized");
  //       done();
  //     })
  //     .catch(err => done(err));
  // });
});
describe('POST /orderProducts', () => {
  it('create order succeeds and responds with json', (done) => {
    request(app)
      .post("/orderProducts")
      .send({
        "address1": "President Obama"
      })
      .set('Accept', 'application/json')
      .set('Authorization', `Bearer ${buyerToken3}`)
      .expect(201)
      .expect('Content-Type', /json/)
      .then(response => {
        expect(response.body.response).toEqual("Order created");
        done();
      })
      .catch(err => done(err));
  });
  it('create order twice fails because user has no cart and responds with json', (done) => {
    request(app)
      .post("/orderProducts")
      .send({
        "address1": "President Obama"
      })
      .set('Accept', 'application/json')
      .set('Authorization', `Bearer ${buyerToken3}`)
      .expect(404)
      .expect('Content-Type', /json/)
      .then(response => {
        expect(response.body.response).toEqual("No product found in user cart");
        done();
      })
      .catch(err => done(err));
  });
  it('create order fails because user address is inexistant', (done) => {
    request(app)
      .post("/orderProducts")
      .send({
        "address1": "addressThatDoesntExist"
      })
      .set('Accept', 'application/json')
      .set('Authorization', `Bearer ${buyerToken3}`)
      .expect(404)
      .expect('Content-Type', /json/)
      .then(response => {
        expect(response.body.response).toEqual("Address not found");
        done();
      })
      .catch(err => done(err));
  });
  it('create order fails due to bad json format', (done) => {
    request(app)
      .post("/orderProducts")
      .send({
        "address": "President Obama"
      })
      .set('Accept', 'application/json')
      .set('Authorization', `Bearer ${buyerToken3}`)
      .expect(400)
      .expect('Content-Type', /json/)
      .then(response => {
        expect(response.body.response).toEqual("Bad json format");
        done();
      })
      .catch(err => done(err));
  });
  it('create order fails due to seller token', (done) => {
    request(app)
      .post("/orderProducts")
      .send({
        "address1": "President Obama"
      })
      .set('Accept', 'application/json')
      .set('Authorization', `Bearer ${sellerToken}`)
      .expect(401)
      .expect('Content-Type', /json/)
      .then(response => {
        expect(response.body.response).toEqual("Unauthorized");
        done();
      })
      .catch(err => done(err));
  });
  // it('create order fails due to no token', (done) => {
  //   request(app)
  //     .post("/orderProducts")
  //     .send({
  //       "address1": "President Obama"
  //     })
  //     .set('Accept', 'application/json')
  //     .expect(401)
  //     .expect('Content-Type', /json/)
  //     .then(response => {
  //       expect(response.body.response).toEqual("Unauthorized");
  //       done();
  //     })
  //     .catch(err => done(err));
  // });
});
describe('GET /orderProducts', () => {
  it('get product ordered succeeds buyer side and responds with json', (done) => {
    request(app)
      .get("/orderProducts")
      .set('Accept', 'application/json')
      .set('Authorization', `Bearer ${buyerToken3}`)
      .expect(200)
      .expect('Content-Type', /json/)
      .then(response => {
        expect(response.body.response).toBeDefined();
        done();
      })
      .catch(err => done(err));
  });
  it('get product ordered succeeds buyer side even without any order and responds with json', (done) => {
    request(app)
      .get("/orderProducts")
      .set('Accept', 'application/json')
      .set('Authorization', `Bearer ${buyerToken2}`)
      .expect(200)
      .expect('Content-Type', /json/)
      .then(response => {
        expect(response.body.response).toBeDefined();
        expect(response.body.response).toEqual([]);
        done();
      })
      .catch(err => done(err));
  });
  it('get product ordered succeeds seller side and responds with json', (done) => {
    request(app)
      .get("/orderProducts")
      .set('Accept', 'application/json')
      .set('Authorization', `Bearer ${sellerToken2}`)
      .expect(200)
      .expect('Content-Type', /json/)
      .then(response => {
        expect(response.body.response).toBeDefined();
        expect(response.body.response).toEqual([]);
        done();
      })
      .catch(err => done(err));
  });
});*/