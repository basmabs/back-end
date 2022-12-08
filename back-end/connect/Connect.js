const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost:27017/back-end').then(() => {
  console.log('Database is running');
}).catch(error => {
  console.log(error)
});