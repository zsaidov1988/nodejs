const { Type } = require('../models/models');

class TypeController {
  async create(req, res) {
    const { name } = req.body;
    const type = await Type.create({name});
    return res.json(type);
  }

  async delete(req, res) {
    const { id } = req.params;
    const deletedType = await Type.destroy({where: {id}})
    return res.json(deletedType);
  }

  async update(req, res) {
    const { id } = req.params;
    const { name } = req.body;
    const updatedType = await Type.update({name}, {where: {id}})
    return res.json(updatedType);
  }

  async getAll(req, res) {
    const types = await Type.findAll();
    res.json(types);
  }

}

module.exports = new TypeController();