const Livre = require('../models/Livre_model');
exports.createLivre = async (req, res) => {
  try {
    await Livre.create(req.body)
    res.status(201).send('livre is created')
  } catch (error) {
    res.status(500).send({ message: error.message || `server error` })
  }
};
exports.getLivre = async (req, res) => {
  try {
    const livres = await Livre.find()
    res.send(livres)
  } catch (error) {
    res.status(500).send({ message: error.message || `server error` })
  }
};
exports.getLivrebyid = async (req, res) => {
  try {
    const livres = Livre.findById()
    res.send(livres)
  } catch (error) {
    res.status(500).send({ message: error.message || `server error` })
  }
}
exports.updateLivre = async (req, res) => {
  try {
    await Livre.findByIdAndUpdate(req.params.idLivre, req.body)
    res.status(201).send({ message: `Livre is updated` })
  } catch (error) {
    res.status(500).send({ message: error.message || `server error` })
  }
};
exports.deleteLivre = async (req, res) => {
  try {
    await Livre.findByIdAndDelete(req.params.idLivre)
    res.status(201).send({ message: `Livre is deletetd` })
  } catch (error) {
    res.status(500).send({ message: error.message || `server error` })
  }
};
