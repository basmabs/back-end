const uploadLivre = require('../Models/Livre_model');
const nodemailer = require('nodemailer');
var fs = require('fs');
var pdf = require('html-pdf');
const ejs = require('ejs')
const path = require('path');
exports.createUpload = async (req, res) => {
  try {
    const Livre = await Livre.findById(req.params.id);
    const upload = await uploadLivre.create(req.body)
    const dataUpload = {
      titre: `${uploadLivre.titre}`,
      auteur: `${uploadLivre.auteur}`,
      description: `${uploadLivre.description}`,
      contenue: `${uploadLivre.contenue}`,
    }
    var html = fs.readFileSync('Upload/Upload.html', 'utf8');
    const render = ejs.render(html, { data: dataUpload })

    var options = {
      format: "A3",
      orientation: "landscape",
      border: "10mm"
    };
    pdf.create(render, options).toFile(`Upload/${upload._id}.pdf`, async function (err, res) {
      if (err) {
        console.log(err);
      } else {
        let transporter = nodemailer.createTransport({
          host: "smtp.gmail.com",
          auth: {
            user: process.env.EMAIL,
            pass: process.env.PASSWORD,
          },
        });
        await transporter.sendMail({
          from: process.env.EMAIL,
          to: req.body.email,
          subject: "uploaded Livre",
          text: "Hello, you can download your file bellow!",
          attachments: [
            {
              filename: 'Livre.pdf',
              content: fs.createReadStream(`Upload/${upload._id}.pdf`)
            }
          ]
        });
      }
    })
    res.send({ message: 'uploaded' })
  } catch (error) {
    console.log(error);
    res.status(500).send({ message: error.message || 'server error' })
  }
};