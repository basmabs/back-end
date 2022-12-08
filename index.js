const express = require('express');
const morgan = require('morgan');
const cors = require('cors');
const bodyParser = require('body-parser');
const port = 4000;
const passport = require('passport')
const dotenv = require('dotenv');
app = express();
dotenv.config();

require('./back-end/connect/Connect');
require('./back-end/Passport/Bearer');

app.use(bodyParser.json());
app.use(morgan('combined'));
app.use(cors());

const routeLivre = require('./back-end/routes/Livre_route')
app.use('/', routeLivre);

const routeCategory = require('./back-end/routes/Category_route')
app.use('/', routeCategory);

app.use(passport.initialize());
app.use(passport.session());
app.set('view engine', 'ejs')
const routeAuth = require('./back-end/routes/UserAuth_route')
app.use('/', routeAuth);
app.listen(port, function () { console.log(`server is listening on port ${port}`) })