const config = require('../config');

module.exports = {
  dbhost: config.DB_HOST,
  dbport: config.DB_PORT,
  dbname: config.DB_NAME,
  options: {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true
  },
};