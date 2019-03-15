'use strict'

module.exports = function setupTaxes (TaxesModel) {
  async function findAll (req, res) {
    const result = await TaxesModel.findAll()

    res.status(200).send(result)
  }

  async function findById (req, res) {
    const { params: { tax_id } } = req

    const limit = 20
    const result = await TaxesModel.findAll({
      limit,
      where: {
        tax_id
      },
      raw: true
    })

    res.status(200).send(result)
  }

  return {
    findAll,
    findById
  }
}
