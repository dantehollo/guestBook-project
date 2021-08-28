const dotenv = require('dotenv')

dotenv.config()

const mongoose = require('mongoose');

const connectionString = process.env.MDB_CONNECT || "mongodb://localhost/db-guestBook";

mongoose.connect(connectionString, { useNewUrlParser: true, useUnifiedTopology: true})
  .then(() => {
    console.log("connected to mongo at: " + connectionString);
  });

module.exports = mongoose