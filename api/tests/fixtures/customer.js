'use strict'

const customer = {"customer_id":1,"name":"admin","email":"admin@admin.com","password":"$2a$10$ZNf5T4MDDlD8oXS5PpZ/5e2/3rcBgb3O63zLzBe5w5sbO4m7Gyj9G","credit_card":"49857395","address_1":"testing","address_2":"NA","city":"Berlin","region":"ciudad","postal_code":"32894","country":"alemania","shipping_region_id":2,"day_phone":"1234","eve_phone":"1234","mob_phone":"1234"}

const customers = [
  customer,
  extend({  customer_id: 1,
    name: 'admin',
    email: 'admin@admin.com',
    password: 'admin',
    credit_card: '1234',
    address_1: '',
    address_2: '',
    city: 'Berlyn',
    region: '',
    postal_code: '',
    country: 'Germany',
    shipping_region_id: 2,
    day_phone: '',
    eve_phone: '',
    mob_phone: ''}),
  extend({  customer_id: 1,
    name: 'admin2',
    email: 'admin2@admin2.com',
    password: 'admin2',
    credit_card: '1234',
    address_1: '',
    address_2: '',
    city: 'Berlyn',
    region: '',
    postal_code: '',
    country: 'Germany',
    shipping_region_id: 2,
    day_phone: '',
    eve_phone: '',
    mob_phone: ''})
]

function extend(obj, values) {
  const clone = Object.assign({}, obj);
  return Object.assign(clone, values);
}

module.exports = {
  single: customer,
  all: customers,
  findById: customers.filter(a => a.id)
}