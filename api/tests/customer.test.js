'use strict'

const test = require('ava');
const request = require('supertest');
const sinon = require('sinon');
const proxyquire = require('proxyquire');

const auth = require('../services/jwt');
const fixtures = require('./fixtures/customer');

let sandbox = null;
let server = null;
let CustomerStub = {};
let dbStub = null;
let token = null;

  test.beforeEach(async () => {
    sandbox = sinon.createSandbox();
    
    dbStub = sandbox.stub();
    dbStub.returns(Promise.resolve({
      Customer: CustomerStub
    }));

    token = auth.createToken(fixtures.single);


    CustomerStub.findById = sandbox.stub();
    CustomerStub.findById.returns(Promise.resolve(fixtures.findById));

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
  
  test.serial.cb('Validate customer with id 1', t => {
    request(server)
    .get('/api/customers/1')
    .set('Authorization', `${token}`)
    .expect(200)
    .expect('Content-Type', /json/)
    .end((err, res) => {
      t.falsy(err, 'should not return an error')
      let body = JSON.stringify(res.body)
      let expected = JSON.stringify(fixtures.single);
      t.deepEqual(body, expected, 'response body should be the expected')
      t.end()
    })
  });
  
test.serial.todo('post save new customer');