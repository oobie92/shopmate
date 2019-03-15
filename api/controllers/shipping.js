'use strict'

module.exports = function setupShipping (ShippingModel, ShippingRegionModel) {
  async function findAll (req, res) {
    const result = await ShippingRegionModel.findAll()

    res.status(200).send(result)
  }

  async function findById (req, res) {
    const { params: { shipping_region_id } } = req

    const limit = 20
    const result = await ShippingModel.findAll({
      attributes: ['shipping_id', 'shipping_type', 'shipping_cost', 'shipping_region_id'],
      limit,
      include: [{
        attributes: [],
        model: ShippingRegionModel,
        where: {
          shipping_region_id
        }
      }],
      raw: true
    })

    res.status(200).send(result)
  }

  return {
    findAll,
    findById
  }
}
