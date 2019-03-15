'use strict'

const config = require('./config')

// Load models
const setupDepartmentModel = require('../models/department')
const setupCategoryModel = require('../models/category')
const setupProductModel = require('../models/product')
const setupProductCategoryModel = require('../models/product_category')
const setupAttributesModel = require('../models/attribute')
const setupAttributesValueModel = require('../models/attribute_value')
const setupProductAttributesModel = require('../models/product_attribute')
const setupShippingModel = require('../models/shipping')
const setupShippingRegionModel = require('../models/shipping_region')
const setupTaxesModel = require('../models/tax')
const setupReviewModel = require('../models/review')
const setupCustomerModel = require('../models/customer')
const setupShoppingCartModel = require('../models/shopping_cart')
const setupOrderDetailModel = require('../models/order_detail')
const setupOrderModel = require('../models/orders')

// Load library's functions
const setupDepartment = require('../controllers/department')
const setupCategory = require('../controllers/category')
const setupProduct = require('../controllers/product')
const setupAttributes = require('../controllers/attributes')
const setupShipping = require('../controllers/shipping')
const setupTaxes = require('../controllers/taxes')
const setupCustomer = require('../controllers/customer')
const setupShoppingCart = require('../controllers/shopping_cart')
const setupOrder = require('../controllers/order')

// Load library of payments (No need to instantiate model)
const setupPaypal = require('../controllers/paypal')
const setupStripe = require('../controllers/stripe')

module.exports = function () {
  // Instantiate models
  const DepartmentModel = setupDepartmentModel(config)
  const CategoryModel = setupCategoryModel(config)
  const ProductModel = setupProductModel(config)
  const ProductCategoryModel = setupProductCategoryModel(config)
  const AttributesModel = setupAttributesModel(config)
  const AttributesValueModel = setupAttributesValueModel(config)
  const ProductAttributesModel = setupProductAttributesModel(config)
  const ShippingModel = setupShippingModel(config)
  const ShippingRegionModel = setupShippingRegionModel(config)
  const TaxesModel = setupTaxesModel(config)
  const ReviewModel = setupReviewModel(config)
  const CustomerModel = setupCustomerModel(config)
  const ShoppingCartModel = setupShoppingCartModel(config)
  const OrderDetailModel = setupOrderDetailModel(config)
  const OrderModel = setupOrderModel(config)

  // Set relations between models
  ProductModel.hasOne(ProductCategoryModel, { foreignKey: 'product_id' })
  ProductCategoryModel.belongsTo(ProductModel, { foreignKey: 'product_id' })

  ReviewModel.belongsTo(ProductModel, { foreignKey: 'product_id' })
  ReviewModel.belongsTo(CustomerModel, { foreignKey: 'product_id' })

  CategoryModel.hasMany(ProductCategoryModel, { foreignKey: 'category_id' })
  ProductCategoryModel.belongsTo(CategoryModel, { foreignKey: 'category_id' })
  ProductAttributesModel.belongsTo(AttributesValueModel, { foreignKey: 'attribute_value_id' })

  // DepartmentModel.hasOne(CategoryModel);
  CategoryModel.belongsTo(DepartmentModel, { foreignKey: 'department_id' })
  AttributesModel.hasMany(AttributesValueModel)
  AttributesValueModel.belongsTo(AttributesModel, { foreignKey: 'attribute_id' })
  AttributesValueModel.hasMany(ProductAttributesModel)

  // ProductModel.hasOne(ProductCategoryModel, { foreignKey: 'product_id' });
  ShippingRegionModel.hasOne(ShippingModel, { foreignKey: 'shipping_region_id' })
  ShippingModel.belongsTo(ShippingRegionModel, { foreignKey: 'shipping_region_id' })
  ShoppingCartModel.belongsTo(ProductModel, { foreignKey: 'product_id' })
  CustomerModel.belongsTo(ShippingRegionModel, { foreignKey: 'shipping_region_id' })
  OrderModel.belongsTo(CustomerModel, { foreignKey: 'customer_id' })
  OrderModel.belongsTo(ShippingModel, { foreignKey: 'shipping_id' })
  OrderModel.belongsTo(TaxesModel, { foreignKey: 'tax_id' })
  OrderDetailModel.belongsTo(OrderModel, { foreignKey: 'order_id' })
  OrderDetailModel.belongsTo(ProductModel, { foreignKey: 'product_id' })

  // Prepare to export dictonary
  const DepartmentController = setupDepartment(DepartmentModel)
  const CategoryController = setupCategory(CategoryModel, ProductCategoryModel)
  const ProductController = setupProduct(ProductModel, ProductCategoryModel,
    CategoryModel, DepartmentModel,
    ReviewModel, CustomerModel)
  const AttributesController = setupAttributes(AttributesModel, AttributesValueModel,
    ProductAttributesModel)
  const ShippingController = setupShipping(ShippingModel, ShippingRegionModel)
  const TaxesController = setupTaxes(TaxesModel)
  const CustomerController = setupCustomer(CustomerModel)
  const ShoppingCartController = setupShoppingCart(ShoppingCartModel, ProductModel)
  const OrderController = setupOrder(OrderDetailModel, OrderModel, CustomerModel)

  // Payment Gateways no need to pass on Models
  const PaypalController = setupPaypal()
  const StripeController = setupStripe()

  return {
    DepartmentController,
    CategoryController,
    ProductController,
    AttributesController,
    ShippingController,
    TaxesController,
    CustomerController,
    ShoppingCartController,
    OrderController,
    PaypalController,
    StripeController
  }
}
