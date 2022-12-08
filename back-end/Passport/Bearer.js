const  Auth = require('../models/UserAuth_model');
const passport = require('passport');
const bearerStrategy = require('passport-http-bearer').Strategy;
const jwt = require('jsonwebtoken');
passport.use(new bearerStrategy((token, done) => {
  const decodeData = jwt.verify(token, process.env.JWT_SECRET);
  Category.findById(decodeData.ID_Category, function (err, user) {
    if (err) { return done(err); }
    if (!user) { return done(null, false) }
    return done(null, user, { scope: 'all' })
  })
}
));