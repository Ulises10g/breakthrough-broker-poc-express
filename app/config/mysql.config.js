const ENV = process.env;
module.exports = {
  HOST: ENV.API_MYSQL_HOST,
  USER: ENV.API_MYSQL_DATABASE_USERNAME,
  PASSWORD: ENV.API_MYSQL_DATABASE_PASSWORD,
  DB: ENV.API_MYSQL_DATABASE_NAME,
  dialect: "mysql",
  pool: {
    max: 5,
    min: 0,
    acquire: 30000,
    idle: 10000
  }
};