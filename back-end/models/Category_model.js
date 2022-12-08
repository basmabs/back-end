const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const Category = new Schema(
  {
    nomdecategie: { type: String, default: 'abonné' || 'Normal', required: [true, `category name is required`] },
    listedesLivres: Livre[{ type: String, required: [true, `listes des livre is required`] }],
  },
  {
    timestamps: true,
    versionKey: false,
  }
);
module.exports = mongoose.model('category', Category, 'category');