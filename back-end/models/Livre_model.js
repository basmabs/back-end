const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const Livre = new Schema(
  {
    titre: { type: String, required: [true, `title is required`] },
    auteur: { type: String, required: [true, `writer is required`] },
    description: { type: String, required: [true, `descipriton is required`] },
    // contenue: { type: File, required: [true, `content is required`] },
  },
  {
    timestamps: true,
    versionKey: false,
  }
);
module.exports = mongoose.model('livre', Livre, 'livre');