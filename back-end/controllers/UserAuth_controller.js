const Auth = require('../models/UserAuth_model');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
// const nodemailer = require('nodemailer');


exports.Register = async (req, res) => {
  try {
    const find = await Auth.findOne({ email: req.body.email })
    console.log(req.body);
    if (find) {
      res.status(400).send({ message: `Email already exists` })
    }
    else {
      const salt = bcrypt.genSaltSync(10);
      const hash = bcrypt.hashSync(req.body.password, salt);
      req.body.password = hash;
      const USER = await Auth.create(req.body)
      res.status(201).send(USER)
    }
  } catch (error) {
    console.log(error);
    res.status(500).send({ message: error.message || `Server error` })
  }
};
exports.Login = async (req, res) => {
  try {
    const find = await Auth.findOne({ email: req.body.email })
    if (find) {
      const passwordValid = await bcrypt.compare(req.body.password, find.password);
      if (passwordValid) {
        const data = {
          EMAIL: find.email,
          ID_Auth: find._id
        }
        const token = jwt.sign(data, process.env.JWT_SECRET, { expiresIn: '1d' });
        res.send({ message: 'Welcome to dashboard', token: token })
      } else {
        res.status(400).send({ message: `Verify email or password` })
      }
    } else {
      res.status(400).send({ message: `Verify email or password` })
    }
  } catch (error) {
    res.status(500).send({ message: error.message || `Server error` })
  }
};

exports.Logout = async (req, res, next) => {
  req.logout((err) => {
    if (err) {
      return next(err)
    }
    res.json({ message: 'Disconnected successfully' })
  })
};
 