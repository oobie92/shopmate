'use strict'

module.exports = function setupDepartment (DepartmentModel) {
  async function findById (req, res) {
    const { params: { id } } = req

    const result = await DepartmentModel.findByPk(id)

    res.status(200).send(result)
  }

  async function findAll (req, res) {
    const result = await DepartmentModel.findAll()

    res.status(200).send(result)
  }

  return {
    findById,
    findAll
  }
}
