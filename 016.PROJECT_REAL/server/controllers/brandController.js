const { Brand } = require('../models/models');

class BrandController {
  async create(req, res) {
    const { name } = req.body;
    const brand = await Brand.create({name});
    return res.json(brand);
  }

  async delete(req, res) {
    const { id } = req.params;
    const deletedBrand = await Brand.destroy({where: {id}})
    return res.json(deletedBrand);
  }

  async update(req, res) {
    const { id } = req.params;
    const { name } = req.body;
    const updatedBrand = await Brand.update({name}, {where: {id}})
    return res.json(updatedBrand);
  }

  async getAll(req, res) {
    const brands = await Brand.findAll();
    res.json(brands);
  }
}

module.exports = new BrandController();