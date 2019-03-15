'use strict'

const test = require('ava');
const request = require('supertest');
const sinon = require('sinon');
const proxyquire = require('proxyquire');

const fixtures = require('./fixtures/product');

let sandbox = null;
let server = null;
let ProductStub = {};
let dbStub = null;

  test.beforeEach(async () => {
    sandbox = sinon.createSandbox();
    
    dbStub = sandbox.stub();
    dbStub.returns(Promise.resolve({
      Customer: ProductStub
    }));



    ProductStub.findById = sandbox.stub();
    ProductStub.findById.returns(Promise.resolve(fixtures.findById));

    const setupDatabse = proxyquire('../db/setup', {
      'setup': dbStub
    });
    
    const api = proxyquire('../app', {
      'api': setupDatabse
    });
    
    server = proxyquire('../index', {
      './app': api
    });
    
  });
  
  
  test.afterEach(() => sandbox && sandbox.restore());
  
  test.serial.cb('Validate producy with id 1', t => {
    request(server)
    .get('/api/products/2')
    .expect(200)
    .end((err, res) => {
      t.falsy(err, 'should not return an error')
      let body = JSON.stringify(res.body)
      let expected = JSON.stringify(fixtures.single);
      t.notDeepEqual(body, expected, 'response body should be the expected')
      t.end()
    })
  });
  
test.serial.todo('api/products/');