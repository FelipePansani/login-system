const mongoose = require('mongoose');
require('dotenv').config();

const uri = process.env.MONGO_URI;

const dbConn = () => {
    mongoose.connect(uri, {
        useUnifiedTopology: true,
        useNewUrlParser: true,
    })
    .then(() => console.log('Mongo DB connected'))
    .catch((err) => console.log('Error' + err))
}

module.exports = dbConn;
