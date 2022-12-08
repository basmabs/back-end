const Category= require('../models/Category_model');

exports.createCategory = async (req, res) => {
  try {
    await Category.create(req.body)
    res.status(201).send('Category is created')
  } catch (error) {
    res.status(500).send({ message: error.message || `server error` })
  }
};
exports.getCategory = async (req, res) => {
  try {
    const Categories = await Category.find()
    res.send(Categories)
  } catch (error) {
    res.status(500).send({ message: error.message || `server error` })
  }
};
exports.getCategorybyid = async (req, res) => {
  try {
    const Categories = Category.findById()
    res.send(Categories)
  } catch (error) {
    res.status(500).send({ message: error.message || `server error` })
  }
}
exports.updateCategory = async (req, res) => {
  try {
    await Category.findByIdAndUpdate(req.params.idCategory, req.body)
    res.status(201).send({ message: `Category is updated` })
  } catch (error) {
    res.status(500).send({ message: error.message || `server error` })
  }
};
exports.deleteCategory = async (req, res) => {
  try {
    await Category.findByIdAndDelete(req.params.idCategory)
    res.status(201).send({ message: `Category is deletetd` })
  } catch (error) {
    res.status(500).send({ message: error.message || `server error` })
  }
};

